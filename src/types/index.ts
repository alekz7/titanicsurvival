// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Titanic dataset types
export interface TitanicPassenger {
  id: number;
  survived: boolean;
  pclass: number;
  name: string;
  sex: string;
  age: number | null;
  sibsp: number;
  parch: number;
  ticket: string;
  fare: number;
  cabin: string | null;
  embarked: string | null;
}

export interface AggregatedData {
  category: string;
  survived: number;
  died: number;
  total: number;
  survivalRate: number;
}

// Dashboard chart data types
export interface SurvivalByClassData {
  class: string;
  survived: number;
  died: number;
  total: number;
  survivalRate: number;
}

export interface SurvivalByGenderData {
  gender: string;
  survived: number;
  died: number;
  total: number;
  survivalRate: number;
}

export interface SurvivalByAgeData {
  ageGroup: string;
  survived: number;
  died: number;
  total: number;
  survivalRate: number;
}

export interface SurvivalByEmbarkedData {
  port: string;
  portName: string;
  survived: number;
  died: number;
  total: number;
  survivalRate: number;
}

export interface SurvivalByFamilyData {
  familySize: string;
  survived: number;
  died: number;
  total: number;
  survivalRate: number;
}

// Prediction types
export interface PredictionInput {
  pclass: number;
  sex: string;
  age: number;
  sibsp: number;
  parch: number;
  fare: number;
  embarked: string;
}

export interface PredictionResult {
  survival: boolean;
  probability: number;
  features: PredictionInput;
}

// Filter types
export interface DataFilters {
  survived?: boolean | null;
  pclass?: number | null;
  sex?: string | null;
  ageMin?: number | null;
  ageMax?: number | null;
  embarked?: string | null;
}