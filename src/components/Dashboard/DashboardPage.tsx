import React from 'react';
import { Ship, Users, TrendingUp, Info, Anchor } from 'lucide-react';
import SurvivalByClassChart from './ChartComponents/SurvivalByClassChart';
import SurvivalByGenderChart from './ChartComponents/SurvivalByGenderChart';
import SurvivalByAgeChart from './ChartComponents/SurvivalByAgeChart';
import SurvivalByEmbarkedChart from './ChartComponents/SurvivalByEmbarkedChart';
import LoadingSpinner from '../common/LoadingSpinner';
import { 
  useSurvivalByClass, 
  useSurvivalByGender, 
  useSurvivalByAge,
  useSurvivalByEmbarked
} from '../../hooks/useApi';

const DashboardPage: React.FC = () => {
  // Using hooks to fetch data (with mock data for now)
  const { 
    data: classSurvivalData, 
    loading: classLoading 
  } = useSurvivalByClass(true);
  
  const { 
    data: genderSurvivalData, 
    loading: genderLoading 
  } = useSurvivalByGender(true);
  
  const { 
    data: ageSurvivalData, 
    loading: ageLoading 
  } = useSurvivalByAge(true);
  
  const { 
    data: embarkedSurvivalData, 
    loading: embarkedLoading 
  } = useSurvivalByEmbarked(true);

  // Calculate overall survival rate for display
  const totalSurvived = classSurvivalData.reduce((acc, curr) => acc + curr.survived, 0);
  const totalPassengers = classSurvivalData.reduce((acc, curr) => acc + curr.total, 0);
  const survivalRate = totalPassengers ? (totalSurvived / totalPassengers * 100).toFixed(1) : '0';

  return (
    <div className="pt-16 pb-12 bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-800 to-primary-600 text-white py-16 mb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                Titanic Survival Analysis
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-6 max-w-xl animate-slide-up">
                Explore interactive visualizations of passenger data and survival rates from the historic Titanic disaster.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#charts" 
                  className="btn bg-white text-primary-700 hover:bg-gray-100 focus:ring-white"
                >
                  View Charts
                </a>
                <a 
                  href="/predict" 
                  className="btn bg-transparent border border-white text-white hover:bg-white/10 focus:ring-white"
                >
                  Try Prediction
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Ship size={240} className="text-white/80 animate-pulse-slow" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="container mx-auto px-4 md:px-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Survival Rate */}
          <div className="card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Overall Survival Rate</p>
                <h3 className="text-3xl font-bold text-primary-700">{survivalRate}%</h3>
              </div>
              <div className="p-2 bg-primary-50 rounded-lg">
                <TrendingUp size={24} className="text-primary-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Of the {totalPassengers} passengers, {totalSurvived} survived the disaster.
            </p>
          </div>

          {/* Total Passengers */}
          <div className="card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Passengers</p>
                <h3 className="text-3xl font-bold text-secondary-700">{totalPassengers}</h3>
              </div>
              <div className="p-2 bg-secondary-50 rounded-lg">
                <Users size={24} className="text-secondary-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Passengers and crew included in the dataset analysis.
            </p>
          </div>

          {/* Classes */}
          <div className="card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Passenger Classes</p>
                <h3 className="text-3xl font-bold text-accent-700">3</h3>
              </div>
              <div className="p-2 bg-accent-50 rounded-lg">
                <Anchor size={24} className="text-accent-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              First, second, and third class passengers with varying survival rates.
            </p>
          </div>

          {/* Titanic Facts */}
          <div className="card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Disaster Date</p>
                <h3 className="text-3xl font-bold text-gray-700">April 15, 1912</h3>
              </div>
              <div className="p-2 bg-gray-100 rounded-lg">
                <Info size={24} className="text-gray-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              The Titanic sank after hitting an iceberg in the North Atlantic Ocean.
            </p>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section id="charts" className="container mx-auto px-4 md:px-6 mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Survival Analysis Charts</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart 1: Survival by Class */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Survival Rate by Passenger Class</h3>
            {classLoading ? (
              <LoadingSpinner className="py-16" />
            ) : (
              <SurvivalByClassChart data={classSurvivalData} />
            )}
            <p className="text-sm text-gray-500 mt-4">
              First-class passengers had the highest survival rate at around 63%, compared to 47% for second class and only 24% for third class.
            </p>
          </div>

          {/* Chart 2: Survival by Gender */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Survival Rate by Gender</h3>
            {genderLoading ? (
              <LoadingSpinner className="py-16" />
            ) : (
              <SurvivalByGenderChart data={genderSurvivalData} />
            )}
            <p className="text-sm text-gray-500 mt-4">
              Women had a significantly higher survival rate (74%) compared to men (19%), reflecting the "women and children first" evacuation policy.
            </p>
          </div>

          {/* Chart 3: Survival by Age Group */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Survival Rate by Age Group</h3>
            {ageLoading ? (
              <LoadingSpinner className="py-16" />
            ) : (
              <SurvivalByAgeChart data={ageSurvivalData} />
            )}
            <p className="text-sm text-gray-500 mt-4">
              Children under 10 had the highest survival rate at 70%, while survival rates generally decreased with age.
            </p>
          </div>

          {/* Chart 4: Survival by Port of Embarkation */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Survival by Port of Embarkation</h3>
            {embarkedLoading ? (
              <LoadingSpinner className="py-16" />
            ) : (
              <SurvivalByEmbarkedChart data={embarkedSurvivalData} />
            )}
            <p className="text-sm text-gray-500 mt-4">
              Passengers who embarked at Cherbourg had the highest survival rate at 55%, compared to Southampton (27%) and Queenstown (39%).
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary-700 text-white py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Would You Have Survived?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Use our machine learning model to predict whether you would have survived based on passenger characteristics.
          </p>
          <a 
            href="/predict" 
            className="btn bg-white text-secondary-700 hover:bg-gray-100 focus:ring-white inline-flex items-center"
          >
            Try the Prediction Tool <span className="ml-2">→</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;