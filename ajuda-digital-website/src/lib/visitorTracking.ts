export interface VisitorData {
  totalVisitors: number;
  countries: {
    code: string;
    name: string;
    flag: string;
    count: number;
  }[];
  dailyVisits: {
    date: string;
    count: number;
  }[];
  lastUpdated: string;
}

export interface GeoLocation {
  country: string;
  countryCode: string;
  query: string; // IP address
}

interface GeoApiResponse {
  country?: string;
  countryCode?: string;
  country_name?: string;
  country_code?: string;
  query?: string;
  ip?: string;
}

interface GeoApiConfig {
  name: string;
  url: string;
  transform: (data: GeoApiResponse) => GeoLocation;
}

// Multiple free APIs for geolocation (fallback chain)
const GEOLOCATION_APIS: GeoApiConfig[] = [
  {
    name: 'ip-api.com',
    url: 'http://ip-api.com/json/',
    transform: (data: GeoApiResponse) => ({
      country: data.country || 'Unknown',
      countryCode: data.countryCode || 'XX',
      query: data.query || ''
    })
  },
  {
    name: 'ipapi.co',
    url: 'https://ipapi.co/json/',
    transform: (data: GeoApiResponse) => ({
      country: data.country_name || 'Unknown',
      countryCode: data.country_code || 'XX', 
      query: data.ip || ''
    })
  },
  {
    name: 'ip.sb',
    url: 'https://api.ip.sb/geoip',
    transform: (data: GeoApiResponse) => ({
      country: data.country || 'Unknown',
      countryCode: data.country_code || 'XX',
      query: data.ip || ''
    })
  }
];

const STORAGE_KEY = 'ajuda-digital-visitors-v2';
const API_ENDPOINT = process.env.NEXT_PUBLIC_VISITOR_API_URL; // Optional external API

export class VisitorTracker {
  private static instance: VisitorTracker;
  private data: VisitorData;

  private constructor() {
    this.data = this.loadLocalData();
  }

  public static getInstance(): VisitorTracker {
    if (!VisitorTracker.instance) {
      VisitorTracker.instance = new VisitorTracker();
    }
    return VisitorTracker.instance;
  }

  private loadLocalData(): VisitorData {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load visitor data from localStorage:', error);
    }

    return {
      totalVisitors: 0,
      countries: [],
      dailyVisits: [],
      lastUpdated: new Date().toISOString()
    };
  }

  private saveLocalData(): void {
    try {
      this.data.lastUpdated = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (error) {
      console.warn('Failed to save visitor data to localStorage:', error);
    }
  }

  private async getGeolocation(): Promise<GeoLocation> {
    // Try each API in sequence until one works
    for (const api of GEOLOCATION_APIS) {
      try {
        const response = await fetch(api.url);
        if (response.ok) {
          const data = await response.json();
          return api.transform(data);
        }
      } catch (error) {
        console.warn(`${api.name} failed:`, error);
        continue;
      }
    }

    // Fallback if all APIs fail
    return {
      country: 'Timor-Leste',
      countryCode: 'TL',
      query: 'unknown'
    };
  }

  private getCountryFlag(countryCode: string): string {
    const flagMap: Record<string, string> = {
      'TL': '🇹🇱', 'US': '🇺🇸', 'ID': '🇮🇩', 'AU': '🇦🇺', 'PT': '🇵🇹',
      'BR': '🇧🇷', 'SG': '🇸🇬', 'MY': '🇲🇾', 'JP': '🇯🇵', 'KR': '🇰🇷',
      'CN': '🇨🇳', 'IN': '🇮🇳', 'GB': '🇬🇧', 'DE': '🇩🇪', 'FR': '🇫🇷',
      'NL': '🇳🇱', 'CA': '🇨🇦', 'PH': '🇵🇭', 'TH': '🇹🇭', 'VN': '🇻🇳',
      'ES': '🇪🇸', 'IT': '🇮🇹', 'RU': '🇷🇺', 'MX': '🇲🇽', 'AR': '🇦🇷'
    };
    return flagMap[countryCode] || '🌍';
  }

  private updateDailyVisits(): void {
    const today = new Date().toISOString().split('T')[0];
    const existingDay = this.data.dailyVisits.find(day => day.date === today);
    
    if (existingDay) {
      existingDay.count += 1;
    } else {
      this.data.dailyVisits.push({ date: today, count: 1 });
    }

    // Keep only last 30 days
    this.data.dailyVisits = this.data.dailyVisits
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 30);
  }

  private async syncWithFirebase(): Promise<void> {
    try {
      // Dynamic import to avoid SSR issues
      const { default: FirebaseService } = await import('./firebaseService');
      const firebaseService = FirebaseService.getInstance();
      
      if (firebaseService.isReady()) {
        await firebaseService.saveVisitorData(this.data);
      }
    } catch (error) {
      console.warn('Failed to sync with Firebase:', error);
    }
  }

  private async syncWithExternalAPI(): Promise<void> {
    if (!API_ENDPOINT) return;

    try {
      await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'update_visitor_data',
          data: this.data
        })
      });
    } catch (error) {
      console.warn('Failed to sync with external API:', error);
    }
  }

  public async trackVisitor(): Promise<VisitorData> {
    try {
      // Check if user already visited today (prevent double counting)
      const lastVisit = localStorage.getItem('ajuda-digital-last-visit');
      const today = new Date().toISOString().split('T')[0];
      
      if (lastVisit === today) {
        return this.data; // Don't count same-day visits
      }

      // Get visitor location
      const location = await this.getGeolocation();
      
      // Update visitor data
      this.data.totalVisitors += 1;
      
      // Update country data
      const existingCountry = this.data.countries.find(c => c.code === location.countryCode);
      if (existingCountry) {
        existingCountry.count += 1;
      } else {
        this.data.countries.push({
          code: location.countryCode,
          name: location.country,
          flag: this.getCountryFlag(location.countryCode),
          count: 1
        });
      }

      // Sort countries by count and keep top 20
      this.data.countries.sort((a, b) => b.count - a.count);
      this.data.countries = this.data.countries.slice(0, 20);

      // Update daily visits
      this.updateDailyVisits();

      // Save locally
      this.saveLocalData();

      // Mark today as visited
      localStorage.setItem('ajuda-digital-last-visit', today);

      // Sync with Firebase (if configured)
      this.syncWithFirebase();

      // Sync with external API (if available)
      this.syncWithExternalAPI();

      return this.data;
    } catch (error) {
      console.error('Failed to track visitor:', error);
      return this.data;
    }
  }

  public getData(): VisitorData {
    return this.data;
  }

  public async loadFromFirebase(): Promise<VisitorData> {
    try {
      // Dynamic import to avoid SSR issues
      const { default: FirebaseService } = await import('./firebaseService');
      const firebaseService = FirebaseService.getInstance();
      
      if (firebaseService.isReady()) {
        const firebaseData = await firebaseService.loadVisitorData();
        if (firebaseData && firebaseData.totalVisitors > this.data.totalVisitors) {
          this.data = firebaseData;
          this.saveLocalData();
        }
      }
    } catch (error) {
      console.warn('Failed to load from Firebase:', error);
    }

    return this.data;
  }

  public async loadFromExternalAPI(): Promise<VisitorData> {
    if (!API_ENDPOINT) return this.data;

    try {
      const response = await fetch(`${API_ENDPOINT}?action=get_visitor_data`);
      if (response.ok) {
        const externalData = await response.json();
        if (externalData.totalVisitors > this.data.totalVisitors) {
          this.data = externalData;
          this.saveLocalData();
        }
      }
    } catch (error) {
      console.warn('Failed to load from external API:', error);
    }

    return this.data;
  }
}