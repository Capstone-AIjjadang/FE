// App.js
import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import Camera from './components/Camera';
import Navigator from './components/Navigator';
import FoodRecommend from './components/FoodRecommend';
import Main from './components/Main';
import My from './components/My';
import Graph from './components/Graph';
import CameraAnalysis from './components/CameraAnalysis';
import TextAnalysis from './components/TextAnalysis';
import Login from './components/Login';
import Join from './components/Join';
import './App.css';

function App() {
  const location = useLocation();
  const navigate = useNavigate();  // useNavigate 추가
  const HideNavigator =
    location.pathname === '/camera' ||
    location.pathname === '/login' ||
    location.pathname === '/join' ||
    location.pathname === '/camera/analysis';

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleLogin = () => {
    // 실제 로그인 로직은 여기에 추가
    setIsUserLoggedIn(true);
    // 로그인 후 리다이렉트
    navigate('/my');
  };

  return (
    <div className='All-container'>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/recommend" element={<FoodRecommend />} />
        <Route path="/camera/analysis" element={<CameraAnalysis />} />
        <Route path="/camera/textanalysis" element={<TextAnalysis />} />
        <Route path="/Graph" element={<Graph />} />
        <Route
          path="/my"
          element={
            isUserLoggedIn ? (
              <My />
            ) : (
              <Navigate replace to='/login' />
            )
          }
        />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route path="/join" element={<Join />} />
      </Routes>

      {HideNavigator ? '' : <Navigator />}
    </div>
  );
}

export default App;
