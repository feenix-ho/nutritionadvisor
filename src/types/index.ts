export interface UserData {
  age: number;
  gender: 'male' | 'female' | 'other';
  weight: number;
  height: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  healthGoal: 'weight_loss' | 'weight_gain' | 'muscle_gain' | 'maintain' | 'general_health';
  dietaryPreference: 'omnivore' | 'vegetarian' | 'vegan' | 'pescatarian' | 'keto' | 'mediterranean';
  healthConditions: string[];
  allergies: string[];
  eatingHabits: string[];
  sleepQuality: 'poor' | 'fair' | 'good' | 'excellent';
  stressLevel: 'low' | 'moderate' | 'high';
}

export interface NutritionAdvice {
  calorieRange: {
    min: number;
    max: number;
  };
  macroRatios: {
    protein: number;
    carbs: number;
    fats: number;
  };
  recommendations: string[];
  foodsToAvoid: string[];
  mealIdeas: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    snacks: string[];
  };
  supplements: string[];
  hydration: string;
  exerciseAdvice: string;
}

export interface Rule {
  id: string;
  condition: (userData: UserData) => boolean;
  action: (userData: UserData) => Partial<NutritionAdvice>;
  priority: number;
}