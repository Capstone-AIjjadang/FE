import Camera from './components/Camera';
import Navigator from './components/Navigator';
import { Routes, Route, useLocation } from 'react-router-dom';
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
  const HideNavigator = location.pathname === "/camera" || location.pathname === "/Login" || location.pathname === "/camera/analysis";


  return (
    <div className='All-container'>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/recommend" element={<FoodRecommend />} />
        <Route path="/camera/analysis" element={<CameraAnalysis />} />
        <Route path="/camera/textanalysis" element={<TextAnalysis />} />
        <Route path="/Graph" element={<Graph />} />
        <Route path="/My" element={<My />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Join" element={<Join />} />
      </Routes>

      {HideNavigator ? '' : <Navigator />}
    </div>
  );
}

export default App;