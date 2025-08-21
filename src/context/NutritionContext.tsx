import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserData, NutritionAdvice } from '../types';

interface NutritionContextType {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  nutritionAdvice: NutritionAdvice | null;
  setNutritionAdvice: (advice: NutritionAdvice) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  resetData: () => void;
}

const NutritionContext = createContext<NutritionContextType | undefined>(undefined);

export const NutritionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [nutritionAdvice, setNutritionAdvice] = useState<NutritionAdvice | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const resetData = () => {
    setUserData(null);
    setNutritionAdvice(null);
    setCurrentStep(0);
  };

  return (
    <NutritionContext.Provider
      value={{
        userData,
        setUserData,
        nutritionAdvice,
        setNutritionAdvice,
        currentStep,
        setCurrentStep,
        resetData,
      }}
    >
      {children}
    </NutritionContext.Provider>
  );
};

export const useNutrition = () => {
  const context = useContext(NutritionContext);
  if (context === undefined) {
    throw new Error('useNutrition must be used within a NutritionProvider');
  }
  return context;
};