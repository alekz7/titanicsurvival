import React from 'react';
import DataTable from './DataTable';
import { Database, Table } from 'lucide-react';

const DataExplorationPage: React.FC = () => {
  return (
    <div className="pt-16 pb-12 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent-800 to-accent-600 text-white py-16 mb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                Explore Titanic Dataset
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-6 max-w-xl animate-slide-up">
                Browse, search, and filter through the passenger data from the Titanic to discover patterns and insights.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <Database size={220} className="text-white/80 animate-pulse-slow" />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Passenger Records</h2>
          <p className="text-gray-600 mb-6">
            The table below contains passenger information from the Titanic disaster. Use the filters to explore different subsets of the data.
          </p>
          
          {/* Dataset Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Dataset Source</p>
                  <h3 className="text-lg font-bold text-gray-800">Kaggle Competition</h3>
                </div>
                <div className="p-2 bg-primary-50 rounded-lg">
                  <Database size={24} className="text-primary-600" />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                The dataset is from the famous Kaggle Titanic: Machine Learning from Disaster competition.
              </p>
            </div>
            
            <div className="card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Fields Available</p>
                  <h3 className="text-lg font-bold text-gray-800">10+ Data Points</h3>
                </div>
                <div className="p-2 bg-secondary-50 rounded-lg">
                  <Table size={24} className="text-secondary-600" />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Including passenger class, name, gender, age, family information, fare, and more.
              </p>
            </div>
            
            <div className="card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Dataset Size</p>
                  <h3 className="text-lg font-bold text-gray-800">891 Passengers</h3>
                </div>
                <div className="p-2 bg-accent-50 rounded-lg">
                  <Table size={24} className="text-accent-600" />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                The training dataset contains information on 891 of the 2,224 passengers and crew.
              </p>
            </div>
          </div>
          
          <DataTable />
        </div>
      </div>
    </div>
  );
};

export default DataExplorationPage;