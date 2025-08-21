import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { NutritionAdvice } from '../types';
import { 
  Apple, Zap, Heart, AlertTriangle, Coffee, Utensils, 
  Droplets, Activity, RotateCcw, Download, CheckCircle,
  Wheat, Fish, Beef, Carrot
} from 'lucide-react';

interface ResultsProps {
  advice: NutritionAdvice;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ advice, onRestart }) => {
  const macroData = [
    { 
      name: 'Protein', 
      value: advice.macroRatios.protein, 
      color: 'bg-red-500',
      icon: <Beef className="w-5 h-5" />
    },
    { 
      name: 'Carbs', 
      value: advice.macroRatios.carbs, 
      color: 'bg-yellow-500',
      icon: <Wheat className="w-5 h-5" />
    },
    { 
      name: 'Fats', 
      value: advice.macroRatios.fats, 
      color: 'bg-green-500',
      icon: <Fish className="w-5 h-5" />
    }
  ];

  const mealSections = [
    { title: 'Breakfast', icon: <Coffee className="w-5 h-5" />, items: advice.mealIdeas.breakfast, color: 'bg-orange-100 text-orange-800' },
    { title: 'Lunch', icon: <Utensils className="w-5 h-5" />, items: advice.mealIdeas.lunch, color: 'bg-blue-100 text-blue-800' },
    { title: 'Dinner', icon: <Utensils className="w-5 h-5" />, items: advice.mealIdeas.dinner, color: 'bg-purple-100 text-purple-800' },
    { title: 'Snacks', icon: <Apple className="w-5 h-5" />, items: advice.mealIdeas.snacks, color: 'bg-green-100 text-green-800' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-4 py-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Personalized Nutrition Plan</h1>
          <p className="text-lg text-gray-600">Based on your unique profile and health goals</p>
        </motion.div>

        {/* Calorie Target */}
        <motion.div variants={itemVariants} className="mb-8">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CardContent className="p-8 text-center">
              <Zap className="w-12 h-12 mx-auto mb-4 opacity-90" />
              <h2 className="text-2xl font-bold mb-2">Daily Calorie Target</h2>
              <div className="text-4xl font-bold mb-2">
                {advice.calorieRange.min} - {advice.calorieRange.max}
              </div>
              <p className="text-green-100">calories per day</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Macro Ratios */}
        <motion.div variants={itemVariants} className="mb-8">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Carrot className="w-6 h-6 text-orange-500" />
                Macronutrient Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {macroData.map((macro, index) => (
                  <div key={macro.name} className="text-center">
                    <div className="flex justify-center mb-3">
                      <div className={`w-12 h-12 ${macro.color} rounded-full flex items-center justify-center text-white`}>
                        {macro.icon}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{macro.value}%</div>
                    <div className="text-gray-600">{macro.name}</div>
                    <div className={`w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden`}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${macro.value}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className={`h-full ${macro.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recommendations */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-xl h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-6 h-6 text-red-500" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {advice.recommendations.map((recommendation, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-green-50 rounded-lg"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{recommendation}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Foods to Avoid */}
          {advice.foodsToAvoid.length > 0 && (
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-xl h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-yellow-500" />
                    Foods to Limit or Avoid
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {advice.foodsToAvoid.map((food, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg"
                      >
                        <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{food}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Meal Ideas */}
        <motion.div variants={itemVariants} className="mb-8">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="w-6 h-6 text-blue-500" />
                Meal Ideas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mealSections.map((section, sectionIndex) => (
                  <div key={section.title} className="space-y-3">
                    <div className={`flex items-center gap-2 p-3 rounded-lg ${section.color}`}>
                      {section.icon}
                      <h3 className="font-semibold">{section.title}</h3>
                    </div>
                    <div className="space-y-2">
                      {section.items.slice(0, 4).map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: (sectionIndex * 0.1) + (index * 0.05) }}
                          className="p-3 bg-white rounded-lg border border-gray-100 text-sm text-gray-700"
                        >
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Hydration & Exercise */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="w-6 h-6 text-blue-500" />
                  Hydration & Exercise
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Hydration</h4>
                  <p className="text-blue-700">{advice.hydration}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Exercise Advice
                  </h4>
                  <p className="text-green-700">{advice.exerciseAdvice}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Supplements */}
          {advice.supplements.length > 0 && (
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-6 h-6 text-purple-500" />
                    Recommended Supplements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {advice.supplements.map((supplement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 bg-purple-50 rounded-lg border border-purple-100"
                      >
                        <span className="text-purple-800 font-medium">{supplement}</span>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    * Consult with a healthcare provider before starting any supplements
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onRestart}
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Take Quiz Again
          </Button>
          
          <Button
            onClick={() => window.print()}
            size="lg"
            className="flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Save Results
          </Button>
        </motion.div>

        {/* Disclaimer */}
        <motion.div variants={itemVariants} className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800 mb-2">Important Disclaimer</h4>
              <p className="text-yellow-700 text-sm leading-relaxed">
                This nutrition advice is for educational purposes only and should not replace professional medical advice. 
                Please consult with a qualified healthcare provider or registered dietitian before making significant 
                changes to your diet, especially if you have any medical conditions or take medications.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Results;