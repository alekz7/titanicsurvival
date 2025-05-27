import React from 'react';
import { Ship, Database, FileCode, BarChart4 } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-16 pb-12 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-700 text-white py-16 mb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              About This Project
            </h1>
            <p className="text-lg md:text-xl opacity-90 animate-slide-up">
              Exploring the Titanic disaster through data visualization and machine learning
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6">
        {/* Project Overview */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Project Overview</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                This project analyzes the Titanic dataset to explore factors that influenced passenger survival rates during the tragic sinking of the RMS Titanic on April 15, 1912. Through interactive visualizations and a machine learning prediction model, we aim to provide insights into this historic disaster.
              </p>
              <p>
                The sinking of the Titanic is one of the most infamous shipwrecks in history. The disaster claimed over 1,500 lives when the "unsinkable" ship struck an iceberg during its maiden voyage from Southampton to New York City. The dataset used in this project contains information about 891 passengers, including their demographic information, ticket class, cabin location, and survival status.
              </p>
              <p>
                By analyzing this data, we can identify patterns and factors that influenced survival rates, such as socioeconomic status (represented by passenger class), gender, age, and family size. These insights not only help us understand the historical event better but also demonstrate how data analysis and machine learning can extract meaningful patterns from historical data.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-8 transition-transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-primary-50 rounded-lg mr-4">
                  <BarChart4 size={24} className="text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Interactive Visualizations</h3>
              </div>
              <p className="text-gray-600">
                Explore multiple interactive charts that break down survival rates by passenger class, gender, age groups, and port of embarkation. Each visualization offers insights into different factors that influenced survival outcomes.
              </p>
            </div>

            <div className="card p-8 transition-transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-secondary-50 rounded-lg mr-4">
                  <FileCode size={24} className="text-secondary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">ML Survival Prediction</h3>
              </div>
              <p className="text-gray-600">
                Our machine learning model analyzes multiple factors to predict survival probability. Input your own passenger details to see if you would have survived the disaster based on historical patterns.
              </p>
            </div>

            <div className="card p-8 transition-transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-accent-50 rounded-lg mr-4">
                  <Database size={24} className="text-accent-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Data Exploration</h3>
              </div>
              <p className="text-gray-600">
                Browse, search, and filter through the complete Titanic dataset. Examine individual passenger records to discover patterns and relationships between different variables.
              </p>
            </div>

            <div className="card p-8 transition-transform hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gray-100 rounded-lg mr-4">
                  <Ship size={24} className="text-gray-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Historical Context</h3>
              </div>
              <p className="text-gray-600">
                Gain a deeper understanding of the Titanic disaster through historical context and information about the social dynamics that influenced survival rates during the tragedy.
              </p>
            </div>
          </div>
        </section>

        {/* Technologies Used */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Technologies Used</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Frontend</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                    React.js for UI components
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                    TypeScript for type safety
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                    Recharts for data visualization
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                    TailwindCSS for styling
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                    React Router for navigation
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Backend</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-secondary-500 rounded-full mr-2"></span>
                    FastAPI for backend API
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-secondary-500 rounded-full mr-2"></span>
                    Python for data processing
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-secondary-500 rounded-full mr-2"></span>
                    scikit-learn for ML models
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-secondary-500 rounded-full mr-2"></span>
                    pandas for data manipulation
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-secondary-500 rounded-full mr-2"></span>
                    NumPy for numerical operations
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Resources and Further Reading */}
        <section>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Resources & Further Reading</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                If you're interested in learning more about the Titanic disaster or exploring this dataset further, here are some helpful resources:
              </p>
              <ul>
                <li>
                  <a 
                    href="https://www.kaggle.com/c/titanic" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-800"
                  >
                    Kaggle Titanic: Machine Learning from Disaster
                  </a>
                  <span> - The original competition with dataset and resources</span>
                </li>
                <li>
                  <a 
                    href="https://en.wikipedia.org/wiki/Titanic" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-800"
                  >
                    Wikipedia: RMS Titanic
                  </a>
                  <span> - Detailed historical information about the ship and disaster</span>
                </li>
                <li>
                  <a 
                    href="https://www.encyclopedia-titanica.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-800"
                  >
                    Encyclopedia Titanica
                  </a>
                  <span> - Comprehensive resource with passenger biographies and research</span>
                </li>
                <li>
                  <a 
                    href="https://scikit-learn.org/stable/tutorial/basic/tutorial.html" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-800"
                  >
                    scikit-learn Tutorials
                  </a>
                  <span> - Learn more about the machine learning techniques used</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;