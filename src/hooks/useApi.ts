import { useState, useEffect } from 'react';
import * as api from '../services/api';

// General hook for fetching data
export function useFetch<T>(
  fetchFn: () => Promise<T>,
  mockFn: () => T,
  initialData: T,
  useMock = true
) {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use mock data during development if specified
        const result = useMock ? mockFn() : await fetchFn();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFn, mockFn, useMock]);

  return { data, loading, error };
}

// Specialized hooks for each endpoint
export function usePassengers(filters = {}, useMock = true) {
  return useFetch(
    () => api.fetchPassengers(filters),
    () => api.getMockData.passengers(),
    [],
    useMock
  );
}

export function useSurvivalByClass(useMock = true) {
  return useFetch(
    api.fetchSurvivalByClass,
    api.getMockData.survivalByClass,
    [],
    useMock
  );
}

export function useSurvivalByGender(useMock = true) {
  return useFetch(
    api.fetchSurvivalByGender,
    api.getMockData.survivalByGender,
    [],
    useMock
  );
}

export function useSurvivalByAge(useMock = true) {
  return useFetch(
    api.fetchSurvivalByAge,
    api.getMockData.survivalByAge,
    [],
    useMock
  );
}

export function useSurvivalByEmbarked(useMock = true) {
  return useFetch(
    api.fetchSurvivalByEmbarked,
    api.getMockData.survivalByEmbarked,
    [],
    useMock
  );
}

// Hook for prediction
export function usePrediction(useMock = true) {
  const [predicting, setPredicting] = useState(false);
  const [result, setResult] = useState<api.PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const predict = async (input: api.PredictionInput) => {
    try {
      setPredicting(true);
      setError(null);
      
      // Use mock prediction during development if specified
      const prediction = useMock 
        ? api.getMockData.predict(input)
        : await api.predictSurvival(input);
      
      setResult(prediction);
      return prediction;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error(err);
      return null;
    } finally {
      setPredicting(false);
    }
  };

  return { predict, predicting, result, error };
}