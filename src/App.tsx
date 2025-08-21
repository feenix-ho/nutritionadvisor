import React, { useState } from 'react';
import { NutritionProvider, useNutrition } from './context/NutritionContext';
import { generateNutritionAdvice } from './utils/nutritionRules';
import { UserData } from './types';
import Landing from './components/Landing';
import Quiz from './components/Quiz';
import Results from './components/Results';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'quiz' | 'results'>('landing');
  const { userData, setUserData, nutritionAdvice, setNutritionAdvice, resetData } = useNutrition();

  const handleStartQuiz = () => {
    resetData();
    setCurrentView('quiz');
  };

  const handleQuizComplete = (data: UserData) => {
    setUserData(data);
    const advice = generateNutritionAdvice(data);
    setNutritionAdvice(advice);
    setCurrentView('results');
  };

  const handleBackToHome = () => {
    setCurrentView('landing');
  };

  const handleRestart = () => {
    resetData();
    setCurrentView('landing');
  };

  switch (currentView) {
    case 'landing':
      return <Landing onStartQuiz={handleStartQuiz} />;
    
    case 'quiz':
      return <Quiz onComplete={handleQuizComplete} onBack={handleBackToHome} />;
    
    case 'results':
      return nutritionAdvice ? (
        <Results advice={nutritionAdvice} onRestart={handleRestart} />
      ) : (
        <Landing onStartQuiz={handleStartQuiz} />
      );
    
    default:
      return <Landing onStartQuiz={handleStartQuiz} />;
  }
};

function App() {
  return (
    <NutritionProvider>
      <AppContent />
    </NutritionProvider>
  );
}

export default App;