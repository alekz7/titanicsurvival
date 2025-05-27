import axios from 'axios';
import type { 
  ApiResponse, 
  TitanicPassenger, 
  SurvivalByClassData, 
  SurvivalByGenderData,
  SurvivalByAgeData,
  SurvivalByEmbarkedData,
  PredictionInput,
  PredictionResult,
  DataFilters
} from '../types';

// Base API URL - change to your FastAPI server URL in production
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://your-deployed-api.com' 
  : 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handler
const handleError = (error: any): never => {
  const errorMessage = error.response?.data?.error || error.message || 'Unknown error';
  console.error('API Error:', errorMessage);
  throw new Error(errorMessage);
};

// API endpoints
export const fetchPassengers = async (filters?: DataFilters): Promise<TitanicPassenger[]> => {
  try {
    const { data } = await api.get<ApiResponse<TitanicPassenger[]>>('/api/passengers', { params: filters });
    if (!data.success) throw new Error(data.error);
    return data.data || [];
  } catch (error) {
    return handleError(error);
  }
};

export const fetchSurvivalByClass = async (): Promise<SurvivalByClassData[]> => {
  try {
    const { data } = await api.get<ApiResponse<SurvivalByClassData[]>>('/api/stats/class');
    if (!data.success) throw new Error(data.error);
    return data.data || [];
  } catch (error) {
    return handleError(error);
  }
};

export const fetchSurvivalByGender = async (): Promise<SurvivalByGenderData[]> => {
  try {
    const { data } = await api.get<ApiResponse<SurvivalByGenderData[]>>('/api/stats/gender');
    if (!data.success) throw new Error(data.error);
    return data.data || [];
  } catch (error) {
    return handleError(error);
  }
};

export const fetchSurvivalByAge = async (): Promise<SurvivalByAgeData[]> => {
  try {
    const { data } = await api.get<ApiResponse<SurvivalByAgeData[]>>('/api/stats/age');
    if (!data.success) throw new Error(data.error);
    return data.data || [];
  } catch (error) {
    return handleError(error);
  }
};

export const fetchSurvivalByEmbarked = async (): Promise<SurvivalByEmbarkedData[]> => {
  try {
    const { data } = await api.get<ApiResponse<SurvivalByEmbarkedData[]>>('/api/stats/embarked');
    if (!data.success) throw new Error(data.error);
    return data.data || [];
  } catch (error) {
    return handleError(error);
  }
};

export const predictSurvival = async (input: PredictionInput): Promise<PredictionResult> => {
  try {
    const { data } = await api.post<ApiResponse<PredictionResult>>('/api/predict', input);
    if (!data.success) throw new Error(data.error);
    return data.data as PredictionResult;
  } catch (error) {
    return handleError(error);
  }
};

// Mock API for development
export const getMockData = {
  passengers: (): TitanicPassenger[] => [
    {
      id: 1,
      survived: true,
      pclass: 1,
      name: 'Allison, Miss. Helen Loraine',
      sex: 'female',
      age: 2,
      sibsp: 1,
      parch: 2,
      ticket: '113781',
      fare: 151.55,
      cabin: 'C22 C26',
      embarked: 'S'
    },
    {
      id: 2,
      survived: false,
      pclass: 1,
      name: 'Allison, Mr. Hudson Joshua Creighton',
      sex: 'male',
      age: 30,
      sibsp: 1,
      parch: 2,
      ticket: '113781',
      fare: 151.55,
      cabin: 'C22 C26',
      embarked: 'S'
    },
    {
      id: 3,
      survived: false,
      pclass: 3,
      name: 'Heikkinen, Miss. Laina',
      sex: 'female',
      age: 26,
      sibsp: 0,
      parch: 0,
      ticket: 'STON/O2. 3101282',
      fare: 7.925,
      cabin: null,
      embarked: 'S'
    },
    {
      id: 4,
      survived: true,
      pclass: 1,
      name: 'Futrelle, Mrs. Jacques Heath (Lily May Peel)',
      sex: 'female',
      age: 35,
      sibsp: 1,
      parch: 0,
      ticket: '113803',
      fare: 53.1,
      cabin: 'C123',
      embarked: 'S'
    },
    {
      id: 5,
      survived: false,
      pclass: 3,
      name: 'Allen, Mr. William Henry',
      sex: 'male',
      age: 35,
      sibsp: 0,
      parch: 0,
      ticket: '373450',
      fare: 8.05,
      cabin: null,
      embarked: 'S'
    }
  ],
  survivalByClass: (): SurvivalByClassData[] => [
    { class: 'First Class', survived: 136, died: 80, total: 216, survivalRate: 62.96 },
    { class: 'Second Class', survived: 87, died: 97, total: 184, survivalRate: 47.28 },
    { class: 'Third Class', survived: 119, died: 372, total: 491, survivalRate: 24.24 }
  ],
  survivalByGender: (): SurvivalByGenderData[] => [
    { gender: 'Female', survived: 233, died: 81, total: 314, survivalRate: 74.20 },
    { gender: 'Male', survived: 109, died: 468, total: 577, survivalRate: 18.89 }
  ],
  survivalByAge: (): SurvivalByAgeData[] => [
    { ageGroup: '0-10', survived: 40, died: 17, total: 57, survivalRate: 70.18 },
    { ageGroup: '11-20', survived: 54, died: 66, total: 120, survivalRate: 45.00 },
    { ageGroup: '21-30', survived: 102, died: 177, total: 279, survivalRate: 36.56 },
    { ageGroup: '31-40', survived: 76, died: 120, total: 196, survivalRate: 38.78 },
    { ageGroup: '41-50', survived: 38, died: 77, total: 115, survivalRate: 33.04 },
    { ageGroup: '51-60', survived: 20, died: 47, total: 67, survivalRate: 29.85 },
    { ageGroup: '61+', survived: 12, died: 45, total: 57, survivalRate: 21.05 }
  ],
  survivalByEmbarked: (): SurvivalByEmbarkedData[] => [
    { port: 'S', portName: 'Southampton', survived: 127, died: 337, total: 464, survivalRate: 27.37 },
    { port: 'C', portName: 'Cherbourg', survived: 93, died: 75, total: 168, survivalRate: 55.36 },
    { port: 'Q', portName: 'Queenstown', survived: 30, died: 47, total: 77, survivalRate: 38.96 }
  ],
  predict: (input: PredictionInput): PredictionResult => {
    // Simple mock prediction logic - NOT for production
    let probability = 0.5;
    
    // Higher class increases survival chances
    if (input.pclass === 1) probability += 0.25;
    else if (input.pclass === 3) probability -= 0.15;
    
    // Being female increases survival chances
    if (input.sex === 'female') probability += 0.3;
    else probability -= 0.2;
    
    // Children had higher survival rates
    if (input.age < 10) probability += 0.15;
    else if (input.age > 60) probability -= 0.1;
    
    // Normalize probability
    probability = Math.max(0.05, Math.min(0.95, probability));
    
    return {
      survival: probability > 0.5,
      probability: Math.round(probability * 100) / 100,
      features: input
    };
  }
};