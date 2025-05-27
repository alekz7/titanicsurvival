import React, { useState } from 'react';
import PredictionForm from './PredictionForm';
import PredictionResult from './PredictionResult';
import { PredictionInput, PredictionResult as PredictionResultType } from '../../types';
import { usePrediction } from '../../hooks/useApi';
import { Ship } from 'lucide-react';

const PredictionPage: React.FC = () => {
  const { predict, predicting, result } = usePrediction(true);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = async (input: PredictionInput) => {
    const prediction = await predict(input);
    if (prediction) {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setShowResult(false);
  };

  return (
    <div className="pt-16 pb-12 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary-800 to-secondary-600 text-white py-16 mb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                Would You Have Survived?
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-6 max-w-xl animate-slide-up">
                Enter your details as if you were a passenger on the Titanic, and our machine learning model will predict your survival probability.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Ship size={220} className="text-white/80 animate-pulse-slow" />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {!showResult ? (
            <>
              <div className="card p-8 mb-8">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">
                  Enter Your Passenger Details
                </h2>
                <PredictionForm onSubmit={handleSubmit} isLoading={predicting} />
              </div>
              
              <div className="bg-primary-50 border border-primary-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-primary-800">About this Prediction Tool</h3>
                <p className="text-gray-700 mb-4">
                  This tool uses a machine learning model trained on the Titanic dataset to predict survival outcomes.
                  The model considers multiple factors that influenced survival rates during the disaster, including:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Passenger class (1st, 2nd, or 3rd class)</li>
                  <li>Gender (female passengers had higher survival rates)</li>
                  <li>Age (children were prioritized for rescue)</li>
                  <li>Number of siblings/spouses aboard</li>
                  <li>Number of parents/children aboard</li>
                  <li>Fare paid (correlated with class and accommodations)</li>
                  <li>Port of embarkation (Southampton, Cherbourg, or Queenstown)</li>
                </ul>
              </div>
            </>
          ) : (
            <PredictionResult result={result} onReset={handleReset} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;