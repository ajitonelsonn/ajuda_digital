"use client";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, child, push, serverTimestamp } from 'firebase/database';
import { firebaseConfig, isFirebaseConfigured } from './firebase-config';
import type { VisitorData } from './visitorTracking';

class FirebaseService {
  private static instance: FirebaseService;
  private app: any = null;
  private database: any = null;
  private isConfigured: boolean = false;

  private constructor() {
    this.initializeFirebase();
  }

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  private initializeFirebase(): void {
    try {
      if (isFirebaseConfigured()) {
        this.app = initializeApp({
          ...firebaseConfig,
          databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
        });
        this.database = getDatabase(this.app);
        this.isConfigured = true;
        console.log('✅ Firebase initialized successfully');
      } else {
        console.warn('⚠️ Firebase not configured - using localStorage only');
      }
    } catch (error) {
      console.error('❌ Failed to initialize Firebase:', error);
      this.isConfigured = false;
    }
  }

  public isReady(): boolean {
    return this.isConfigured && this.database !== null;
  }

  // Save visitor data to Firebase
  public async saveVisitorData(data: VisitorData): Promise<boolean> {
    if (!this.isReady()) {
      return false;
    }

    try {
      const dbRef = ref(this.database);
      
      // Prepare data for Firebase (convert arrays to objects)
      const firebaseData = {
        totalVisitors: data.totalVisitors,
        lastUpdated: serverTimestamp(),
        countries: this.convertCountriesArrayToObject(data.countries),
        dailyVisits: this.convertDailyVisitsArrayToObject(data.dailyVisits)
      };

      // Save to Firebase
      await set(child(dbRef, 'visitor_data'), firebaseData);
      
      // Also save today's count to daily_stats
      const today = new Date().toISOString().split('T')[0];
      const todayVisits = data.dailyVisits.find(day => day.date === today)?.count || 0;
      if (todayVisits > 0) {
        await set(child(dbRef, `daily_stats/${today}`), todayVisits);
      }

      console.log('✅ Visitor data saved to Firebase');
      return true;
    } catch (error) {
      console.error('❌ Failed to save to Firebase:', error);
      return false;
    }
  }

  // Load visitor data from Firebase
  public async loadVisitorData(): Promise<VisitorData | null> {
    if (!this.isReady()) {
      return null;
    }

    try {
      const dbRef = ref(this.database);
      const snapshot = await get(child(dbRef, 'visitor_data'));

      if (snapshot.exists()) {
        const firebaseData = snapshot.val();
        
        // Convert Firebase objects back to arrays
        const visitorData: VisitorData = {
          totalVisitors: firebaseData.totalVisitors || 0,
          lastUpdated: firebaseData.lastUpdated || new Date().toISOString(),
          countries: this.convertCountriesObjectToArray(firebaseData.countries || {}),
          dailyVisits: this.convertDailyVisitsObjectToArray(firebaseData.dailyVisits || {})
        };

        console.log('✅ Visitor data loaded from Firebase:', visitorData.totalVisitors, 'visitors');
        return visitorData;
      } else {
        console.log('ℹ️ No visitor data found in Firebase');
        return null;
      }
    } catch (error) {
      console.error('❌ Failed to load from Firebase:', error);
      return null;
    }
  }

  // Get real-time visitor count
  public async getCurrentVisitorCount(): Promise<number> {
    if (!this.isReady()) {
      return 0;
    }

    try {
      const dbRef = ref(this.database);
      const snapshot = await get(child(dbRef, 'visitor_data/totalVisitors'));
      return snapshot.val() || 0;
    } catch (error) {
      console.error('❌ Failed to get visitor count:', error);
      return 0;
    }
  }

  // Get daily statistics
  public async getDailyStats(days: number = 30): Promise<{date: string, count: number}[]> {
    if (!this.isReady()) {
      return [];
    }

    try {
      const dbRef = ref(this.database);
      const snapshot = await get(child(dbRef, 'daily_stats'));

      if (snapshot.exists()) {
        const dailyData = snapshot.val();
        const stats = Object.entries(dailyData)
          .map(([date, count]) => ({ date, count: count as number }))
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, days);

        return stats;
      }
    } catch (error) {
      console.error('❌ Failed to get daily stats:', error);
    }

    return [];
  }

  // Increment visitor count atomically
  public async incrementVisitorCount(countryCode: string, countryName: string, countryFlag: string): Promise<boolean> {
    if (!this.isReady()) {
      return false;
    }

    try {
      const dbRef = ref(this.database);
      
      // Get current data
      const snapshot = await get(child(dbRef, 'visitor_data'));
      let currentData = snapshot.val() || {
        totalVisitors: 0,
        countries: {},
        lastUpdated: null
      };

      // Increment total
      currentData.totalVisitors += 1;
      
      // Update country data
      if (currentData.countries[countryCode]) {
        currentData.countries[countryCode].count += 1;
      } else {
        currentData.countries[countryCode] = {
          name: countryName,
          flag: countryFlag,
          count: 1
        };
      }

      // Update timestamp
      currentData.lastUpdated = serverTimestamp();

      // Save back to Firebase
      await set(child(dbRef, 'visitor_data'), currentData);

      // Update daily stats
      const today = new Date().toISOString().split('T')[0];
      const dailySnapshot = await get(child(dbRef, `daily_stats/${today}`));
      const todayCount = (dailySnapshot.val() || 0) + 1;
      await set(child(dbRef, `daily_stats/${today}`), todayCount);

      return true;
    } catch (error) {
      console.error('❌ Failed to increment visitor count:', error);
      return false;
    }
  }

  // Utility methods for data conversion
  private convertCountriesArrayToObject(countries: any[]): Record<string, any> {
    const result: Record<string, any> = {};
    countries.forEach(country => {
      result[country.code] = {
        name: country.name,
        flag: country.flag,
        count: country.count
      };
    });
    return result;
  }

  private convertCountriesObjectToArray(countries: Record<string, any>): any[] {
    return Object.entries(countries).map(([code, data]: [string, any]) => ({
      code,
      name: data.name,
      flag: data.flag,
      count: data.count
    })).sort((a, b) => b.count - a.count);
  }

  private convertDailyVisitsArrayToObject(dailyVisits: any[]): Record<string, number> {
    const result: Record<string, number> = {};
    dailyVisits.forEach(day => {
      result[day.date] = day.count;
    });
    return result;
  }

  private convertDailyVisitsObjectToArray(dailyVisits: Record<string, number>): any[] {
    return Object.entries(dailyVisits)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 30); // Keep last 30 days
  }
}

export default FirebaseService;