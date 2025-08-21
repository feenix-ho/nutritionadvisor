import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { UserData } from '../types';
import { ChevronRight, ChevronLeft, User, Activity, Target, Utensils, Heart, Clock, Bed, Zap } from 'lucide-react';

interface QuizProps {
  onComplete: (userData: UserData) => void;
  onBack: () => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<Partial<UserData>>({
    healthConditions: [],
    allergies: [],
    eatingHabits: []
  });

  const totalSteps = 9;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const updateUserData = (field: keyof UserData, value: any) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayField = (field: keyof UserData, value: string) => {
    setUserData(prev => {
      const currentArray = (prev[field] as string[]) || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [field]: newArray };
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onComplete(userData as UserData);
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 0: return userData.age && userData.gender;
      case 1: return userData.weight && userData.height;
      case 2: return userData.activityLevel;
      case 3: return userData.healthGoal;
      case 4: return userData.dietaryPreference;
      case 5: return true; // Health conditions are optional
      case 6: return true; // Allergies are optional
      case 7: return true; // Eating habits are optional
      case 8: return userData.sleepQuality && userData.stressLevel;
      default: return false;
    }
  };

  const stepVariants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 }
  };

  const stepIcons = [
    <User className="w-6 h-6" />,
    <Activity className="w-6 h-6" />,
    <Zap className="w-6 h-6" />,
    <Target className="w-6 h-6" />,
    <Utensils className="w-6 h-6" />,
    <Heart className="w-6 h-6" />,
    <Activity className="w-6 h-6" />,
    <Clock className="w-6 h-6" />,
    <Bed className="w-6 h-6" />
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
              <p className="text-gray-600">Tell us about yourself to get started</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  placeholder="Enter your age"
                  value={userData.age || ''}
                  onChange={(e) => updateUserData('age', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <div className="grid grid-cols-3 gap-3">
                  {['male', 'female', 'other'].map((gender) => (
                    <button
                      key={gender}
                      onClick={() => updateUserData('gender', gender)}
                      className={`p-3 rounded-lg border-2 transition-all capitalize ${
                        userData.gender === gender
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Physical Stats</h2>
              <p className="text-gray-600">Help us calculate your nutritional needs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  placeholder="Enter weight"
                  value={userData.weight || ''}
                  onChange={(e) => updateUserData('weight', parseFloat(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                <input
                  type="number"
                  placeholder="Enter height"
                  value={userData.height || ''}
                  onChange={(e) => updateUserData('height', parseFloat(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Activity Level</h2>
              <p className="text-gray-600">How active are you on a typical day?</p>
            </div>
            
            <div className="space-y-3">
              {[
                { value: 'sedentary', label: 'Sedentary', desc: 'Little to no exercise, desk job' },
                { value: 'light', label: 'Lightly Active', desc: 'Light exercise 1-3 days/week' },
                { value: 'moderate', label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week' },
                { value: 'active', label: 'Very Active', desc: 'Hard exercise 6-7 days/week' },
                { value: 'very_active', label: 'Extra Active', desc: 'Very hard exercise, physical job' }
              ].map((activity) => (
                <button
                  key={activity.value}
                  onClick={() => updateUserData('activityLevel', activity.value)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    userData.activityLevel === activity.value
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="font-medium">{activity.label}</div>
                  <div className="text-sm text-gray-500">{activity.desc}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Health Goals</h2>
              <p className="text-gray-600">What's your primary health objective?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { value: 'weight_loss', label: 'Weight Loss', icon: '⬇️' },
                { value: 'weight_gain', label: 'Weight Gain', icon: '⬆️' },
                { value: 'muscle_gain', label: 'Muscle Gain', icon: '💪' },
                { value: 'maintain', label: 'Maintain Weight', icon: '⚖️' },
                { value: 'general_health', label: 'General Health', icon: '❤️' }
              ].map((goal) => (
                <button
                  key={goal.value}
                  onClick={() => updateUserData('healthGoal', goal.value)}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    userData.healthGoal === goal.value
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{goal.icon}</div>
                  <div className="font-medium">{goal.label}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Dietary Preference</h2>
              <p className="text-gray-600">What type of diet do you follow?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { value: 'omnivore', label: 'Omnivore', icon: '🍽️' },
                { value: 'vegetarian', label: 'Vegetarian', icon: '🥬' },
                { value: 'vegan', label: 'Vegan', icon: '🌱' },
                { value: 'pescatarian', label: 'Pescatarian', icon: '🐟' },
                { value: 'keto', label: 'Keto', icon: '🥑' },
                { value: 'mediterranean', label: 'Mediterranean', icon: '🫒' }
              ].map((diet) => (
                <button
                  key={diet.value}
                  onClick={() => updateUserData('dietaryPreference', diet.value)}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    userData.dietaryPreference === diet.value
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{diet.icon}</div>
                  <div className="font-medium">{diet.label}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Health Conditions</h2>
              <p className="text-gray-600">Select any that apply (optional)</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                'diabetes', 'hypertension', 'heart_disease', 'high_cholesterol', 
                'thyroid_issues', 'digestive_issues', 'arthritis', 'osteoporosis'
              ].map((condition) => (
                <button
                  key={condition}
                  onClick={() => toggleArrayField('healthConditions', condition)}
                  className={`p-3 rounded-lg border-2 text-left transition-all capitalize ${
                    userData.healthConditions?.includes(condition)
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  {condition.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Allergies</h2>
              <p className="text-gray-600">Select any allergies you have (optional)</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                'nuts', 'dairy', 'eggs', 'soy', 'gluten', 'shellfish', 
                'fish', 'sesame', 'peanuts'
              ].map((allergy) => (
                <button
                  key={allergy}
                  onClick={() => toggleArrayField('allergies', allergy)}
                  className={`p-3 rounded-lg border-2 text-center transition-all capitalize ${
                    userData.allergies?.includes(allergy)
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  {allergy}
                </button>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Eating Habits</h2>
              <p className="text-gray-600">Select any that describe your eating patterns</p>
            </div>
            
            <div className="space-y-3">
              {[
                { value: 'skips_breakfast', label: 'Often skips breakfast' },
                { value: 'eats_late_at_night', label: 'Eats late at night' },
                { value: 'frequent_snacking', label: 'Frequent snacking' },
                { value: 'emotional_eating', label: 'Emotional eating' },
                { value: 'irregular_meals', label: 'Irregular meal times' },
                { value: 'fast_food_frequent', label: 'Frequent fast food consumption' }
              ].map((habit) => (
                <button
                  key={habit.value}
                  onClick={() => toggleArrayField('eatingHabits', habit.value)}
                  className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                    userData.eatingHabits?.includes(habit.value)
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  {habit.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Lifestyle Factors</h2>
              <p className="text-gray-600">Help us understand your sleep and stress levels</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Sleep Quality</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['poor', 'fair', 'good', 'excellent'].map((quality) => (
                    <button
                      key={quality}
                      onClick={() => updateUserData('sleepQuality', quality)}
                      className={`p-3 rounded-lg border-2 text-center transition-all capitalize ${
                        userData.sleepQuality === quality
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      {quality}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Stress Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {['low', 'moderate', 'high'].map((level) => (
                    <button
                      key={level}
                      onClick={() => updateUserData('stressLevel', level)}
                      className={`p-3 rounded-lg border-2 text-center transition-all capitalize ${
                        userData.stressLevel === level
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Nutrition Assessment</h1>
            <p className="text-gray-600">Step {currentStep + 1} of {totalSteps}</p>
          </motion.div>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.5 }}
          >
            <Progress value={progress} className="h-3 mb-2" />
          </motion.div>
          
          {/* Step indicators */}
          <div className="flex justify-between items-center mt-4">
            {Array.from({ length: totalSteps }, (_, index) => (
              <div
                key={index}
                className={`flex items-center justify-center w-8 h-8 rounded-full text-xs transition-all ${
                  index <= currentStep
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {index < currentStep ? '✓' : stepIcons[index]}
              </div>
            ))}
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-8 min-h-[400px] border-0 shadow-xl">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={currentStep === 0 ? onBack : prevStep}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            {currentStep === 0 ? 'Back to Home' : 'Previous'}
          </Button>

          {currentStep === totalSteps - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={!isStepComplete()}
              className="flex items-center gap-2 px-8"
            >
              Get My Nutrition Plan
              <Target className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              disabled={!isStepComplete()}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;