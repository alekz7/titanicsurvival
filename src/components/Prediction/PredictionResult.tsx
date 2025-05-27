import React from 'react';
import { PredictionResult as PredictionResultType } from '../../types';
import { LifeBuoy, Skull, RefreshCw } from 'lucide-react';

interface PredictionResultProps {
  result: PredictionResultType | null;
  onReset: () => void;
}

const PredictionResult: React.FC<PredictionResultProps> = ({ result, onReset }) => {
  if (!result) return null;

  const { survival, probability, features } = result;
  const probabilityPercent = Math.round(probability * 100);

  // Determine card styles based on survival outcome
  const cardStyles = survival
    ? 'bg-gradient-to-br from-success-50 to-white border-success-500'
    : 'bg-gradient-to-br from-error-50 to-white border-error-500';

  // Determine header styles based on survival outcome
  const headerStyles = survival
    ? 'text-success-700 bg-success-50'
    : 'text-error-700 bg-error-50';

  // Get passenger class name
  const getClassName = (pclass: number): string => {
    switch (pclass) {
      case 1: return 'First Class';
      case 2: return 'Second Class';
      case 3: return 'Third Class';
      default: return `Class ${pclass}`;
    }
  };

  // Get port name
  const getPortName = (code: string): string => {
    switch (code) {
      case 'S': return 'Southampton';
      case 'C': return 'Cherbourg';
      case 'Q': return 'Queenstown';
      default: return code;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className={`card border-2 mb-8 overflow-hidden ${cardStyles}`}>
        {/* Header */}
        <div className={`p-6 ${headerStyles}`}>
          <div className="flex items-center">
            {survival ? (
              <LifeBuoy className="mr-3 h-8 w-8 text-success-600" />
            ) : (
              <Skull className="mr-3 h-8 w-8 text-error-600" />
            )}
            <h2 className="text-2xl font-bold">
              {survival ? 'You Would Have Survived!' : 'You Would Not Have Survived'}
            </h2>
          </div>
          <p className="mt-2 text-lg">
            Survival probability: <span className="font-semibold">{probabilityPercent}%</span>
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Your Passenger Profile</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Class:</span>
              <span className="font-medium">{getClassName(features.pclass)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Gender:</span>
              <span className="font-medium capitalize">{features.sex}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Age:</span>
              <span className="font-medium">{features.age} years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Fare:</span>
              <span className="font-medium">£{features.fare.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Family members:</span>
              <span className="font-medium">{features.sibsp + features.parch}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Embarked from:</span>
              <span className="font-medium">{getPortName(features.embarked)}</span>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Survival Factors</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {features.pclass === 1 && (
                <li>First class passengers had the highest survival rate (63%).</li>
              )}
              {features.pclass === 3 && (
                <li>Third class passengers had the lowest survival rate (24%).</li>
              )}
              {features.sex === 'female' && (
                <li>Women had a much higher survival rate (74%) than men (19%).</li>
              )}
              {features.age < 10 && (
                <li>Children under 10 had a high survival rate (70%).</li>
              )}
              {features.age > 60 && (
                <li>Elderly passengers had lower survival rates (21%).</li>
              )}
              {features.embarked === 'C' && (
                <li>Passengers boarding at Cherbourg had a higher survival rate (55%).</li>
              )}
              {features.fare > 100 && (
                <li>Passengers who paid higher fares generally had better survival chances.</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button 
          onClick={onReset}
          className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500 inline-flex items-center"
        >
          <RefreshCw size={16} className="mr-2" />
          Try Another Prediction
        </button>
      </div>
    </div>
  );
};

export default PredictionResult;