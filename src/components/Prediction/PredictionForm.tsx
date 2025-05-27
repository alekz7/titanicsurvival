import React, { useState } from 'react';
import { PredictionInput } from '../../types';
import LoadingSpinner from '../common/LoadingSpinner';

interface PredictionFormProps {
  onSubmit: (input: PredictionInput) => void;
  isLoading: boolean;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<PredictionInput>({
    pclass: 2, // Default to 2nd class
    sex: 'male',
    age: 30,
    sibsp: 0,
    parch: 0,
    fare: 30,
    embarked: 'S'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number(value) : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Passenger Class */}
      <div>
        <label htmlFor="pclass" className="label">Passenger Class</label>
        <select
          id="pclass"
          name="pclass"
          value={formData.pclass}
          onChange={handleChange}
          className="input"
          required
        >
          <option value={1}>First Class</option>
          <option value={2}>Second Class</option>
          <option value={3}>Third Class</option>
        </select>
        <p className="mt-1 text-xs text-gray-500">First class had the highest survival rate at 63%.</p>
      </div>

      {/* Gender */}
      <div>
        <label className="label">Gender</label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="sex"
              value="male"
              checked={formData.sex === 'male'}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-gray-700">Male</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="sex"
              value="female"
              checked={formData.sex === 'female'}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-gray-700">Female</span>
          </label>
        </div>
        <p className="mt-1 text-xs text-gray-500">Women had a significantly higher survival rate (74%) than men (19%).</p>
      </div>

      {/* Age */}
      <div>
        <label htmlFor="age" className="label">Age</label>
        <div className="flex items-center space-x-2">
          <input
            type="range"
            id="age"
            name="age"
            min="1"
            max="80"
            value={formData.age}
            onChange={handleChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm font-medium w-8 text-center">{formData.age}</span>
        </div>
        <p className="mt-1 text-xs text-gray-500">Children had higher survival rates. Those under 10 had a 70% survival rate.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Number of Siblings/Spouses */}
        <div>
          <label htmlFor="sibsp" className="label">Siblings/Spouses Aboard</label>
          <input
            type="number"
            id="sibsp"
            name="sibsp"
            min="0"
            max="8"
            value={formData.sibsp}
            onChange={handleChange}
            className="input"
            required
          />
          <p className="mt-1 text-xs text-gray-500">Number of siblings or spouses traveling with you.</p>
        </div>

        {/* Number of Parents/Children */}
        <div>
          <label htmlFor="parch" className="label">Parents/Children Aboard</label>
          <input
            type="number"
            id="parch"
            name="parch"
            min="0"
            max="6"
            value={formData.parch}
            onChange={handleChange}
            className="input"
            required
          />
          <p className="mt-1 text-xs text-gray-500">Number of parents or children traveling with you.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fare */}
        <div>
          <label htmlFor="fare" className="label">Fare (£)</label>
          <input
            type="number"
            id="fare"
            name="fare"
            min="0"
            max="500"
            step="0.01"
            value={formData.fare}
            onChange={handleChange}
            className="input"
            required
          />
          <p className="mt-1 text-xs text-gray-500">Higher fares correlated with better survival chances.</p>
        </div>

        {/* Port of Embarkation */}
        <div>
          <label htmlFor="embarked" className="label">Port of Embarkation</label>
          <select
            id="embarked"
            name="embarked"
            value={formData.embarked}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="S">Southampton</option>
            <option value="C">Cherbourg</option>
            <option value="Q">Queenstown</option>
          </select>
          <p className="mt-1 text-xs text-gray-500">Cherbourg passengers had the highest survival rate (55%).</p>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="btn-primary w-full py-3 flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm\" className="mr-2" />
              Predicting...
            </>
          ) : (
            'Predict Survival'
          )}
        </button>
      </div>
    </form>
  );
};

export default PredictionForm;