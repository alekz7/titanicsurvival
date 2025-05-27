# Titanic Survival Analysis & Prediction App

A fullstack web application for visualizing and analyzing the Titanic dataset, with a machine learning model to predict survival outcomes.

## Features

- Interactive dashboard with multiple visualizations of Titanic survival data
- Machine learning-powered survival prediction based on passenger details
- Data exploration interface to browse and filter the Titanic dataset
- Responsive design optimized for all device sizes

## Tech Stack

### Frontend
- React with TypeScript
- Recharts for data visualization
- TailwindCSS for styling
- React Router for navigation

### Backend
- FastAPI (Python)
- scikit-learn for machine learning
- pandas for data processing

## Getting Started

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)

### Installation & Setup

1. Clone the repository
   ```
   git clone https://github.com/yourusername/titanic-survival-app.git
   cd titanic-survival-app
   ```

2. Install frontend dependencies
   ```
   npm install
   ```

3. Set up the Python backend
   ```
   cd backend
   pip install -r requirements.txt
   ```

4. Start the backend server
   ```
   cd backend
   uvicorn app:app --reload
   ```

5. Start the frontend development server (in a new terminal)
   ```
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
titanic-survival-app/
├── src/                    # Frontend React code
│   ├── components/         # React components
│   │   ├── Dashboard/      # Dashboard visualizations
│   │   ├── Prediction/     # Prediction form and results
│   │   ├── DataExploration/# Data exploration components
│   │   ├── About/          # About page components
│   │   └── common/         # Common UI components
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API service functions
│   ├── types/              # TypeScript type definitions
│   └── assets/             # Static assets
├── backend/                # Python FastAPI backend
│   ├── app.py              # Main FastAPI application
│   ├── data/               # Data files
│   ├── models/             # ML model files
│   └── requirements.txt    # Python dependencies
└── public/                 # Static files
```

## API Endpoints

- `/api/passengers` - Get passenger data with filtering options
- `/api/stats/class` - Get survival statistics by passenger class
- `/api/stats/gender` - Get survival statistics by gender
- `/api/stats/age` - Get survival statistics by age group
- `/api/stats/embarked` - Get survival statistics by port of embarkation
- `/api/predict` - Predict survival based on passenger details

## License

MIT