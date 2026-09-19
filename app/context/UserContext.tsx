"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export interface UserData {
  personal: { name: string; title: string; location: string; email: string; phone: string; };
  socials: { linkedin: string; instagram: string; youtube: string; x: string; github: string; };
  experience: any[]; projects: any[]; education: any[]; certifications: any[];
}

const defaultState: UserData = {
  personal: { name: "", title: "", location: "", email: "", phone: "" },
  socials: { linkedin: "", instagram: "", youtube: "", x: "", github: "" },
  experience: [], projects: [], education: [], certifications: []
};

interface UserContextType {
  userData: UserData;
  isLoaded: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  checkOnboardingStatus: () => void;
  updatePersonal: (field: keyof UserData['personal'], value: string) => void;
  updateSocials: (field: keyof UserData['socials'], value: string) => void;
  addListItem: (section: keyof Pick<UserData, 'experience' | 'projects' | 'education' | 'certifications'>, item: any) => void;
  removeListItem: (section: keyof Pick<UserData, 'experience' | 'projects' | 'education' | 'certifications'>, index: number) => void;
  editListItem: (section: keyof Pick<UserData, 'experience' | 'projects' | 'education' | 'certifications'>, index: number, field: string, value: any) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserData>(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Bulletproof Initialization
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('growth_platform_user_data');
      const savedAuth = localStorage.getItem('growth_platform_auth');
      
      if (savedData) {
        setUserData(JSON.parse(savedData));
      }
      if (savedAuth === 'true') {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Data error, resetting context.", error);
      localStorage.removeItem('growth_platform_user_data');
      setUserData(defaultState);
    } finally {
      setIsLoaded(true); // This guarantees the UI unblocks
    }
  }, []);

  // Save changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('growth_platform_user_data', JSON.stringify(userData));
      localStorage.setItem('growth_platform_auth', isAuthenticated.toString());
    }
  }, [userData, isAuthenticated, isLoaded]);

  const isProfileComplete = () => userData.personal.name.trim() !== "" && userData.personal.title.trim() !== "";

  const checkOnboardingStatus = () => {
    if (!isProfileComplete()) {
      router.push('/profile');
    } else {
      router.push('/dashboard');
    }
  };

  const login = () => {
    setIsAuthenticated(true);
    setTimeout(() => {
      checkOnboardingStatus();
    }, 100);
  };

  const logout = () => {
    setIsAuthenticated(false);
    router.push('/login');
  };

  const updatePersonal = (field: keyof UserData['personal'], value: string) => {
    setUserData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
  };
  const updateSocials = (field: keyof UserData['socials'], value: string) => {
    setUserData(prev => ({ ...prev, socials: { ...prev.socials, [field]: value } }));
  };
  const addListItem = (section: keyof Pick<UserData, 'experience' | 'projects' | 'education' | 'certifications'>, item: any) => {
    setUserData(prev => ({ ...prev, [section]: [...prev[section], item] }));
  };
  const removeListItem = (section: keyof Pick<UserData, 'experience' | 'projects' | 'education' | 'certifications'>, index: number) => {
    setUserData(prev => { const newList = [...prev[section]]; newList.splice(index, 1); return { ...prev, [section]: newList }; });
  };
  const editListItem = (section: keyof Pick<UserData, 'experience' | 'projects' | 'education' | 'certifications'>, index: number, field: string, value: any) => {
    setUserData(prev => { const newList = [...prev[section]]; newList[index] = { ...newList[index], [field]: value }; return { ...prev, [section]: newList }; });
  };

  return (
    <UserContext.Provider value={{ 
      userData, isLoaded, isAuthenticated, login, logout, checkOnboardingStatus, 
      updatePersonal, updateSocials, addListItem, removeListItem, editListItem 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error('useUser must be used within a UserProvider');
  return context;
};