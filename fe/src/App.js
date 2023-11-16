import Camera from './components/Camera';
import Navigator from './components/Navigator';
import { Routes, Route, useLocation } from 'react-router-dom';
import FoodRecommend from './components/FoodRecommend';
import Main from './components/Main';
import './App.css';

function App() {
  const location = useLocation();
  const HideNavigator = location.pathname === "/camera";

  return (
    <div className='All-container'>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/recommend" element={<FoodRecommend />} />
      </Routes>
      {/* <Navigator /> */}
      {HideNavigator ? '' : <Navigator />}
    </div>
  );
}

export default App;