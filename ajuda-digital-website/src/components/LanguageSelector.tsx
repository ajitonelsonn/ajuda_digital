"use client";
import { useState, useRef, useEffect } from 'react';
import { Languages, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LANGUAGES, Language } from '@/lib/i18n';

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-label="Select language"
      >
        <Languages size={16} className="text-gray-600 dark:text-gray-400" />
        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
          {language.toUpperCase()}
        </span>
        <ChevronDown
          size={14}
          className={`text-gray-600 dark:text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          {Object.entries(LANGUAGES).map(([code, name]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code as Language)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                language === code
                  ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 font-medium'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}