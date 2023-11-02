import Camera from './components/Camera';
import Navigator from './components/Navigator';
import { Routes, Route } from 'react-router-dom';
import Calendar from './components/Calendar';
import Main from './components/Main';
import './App.css';

function App() {
  return (
    <div className='All-container'>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
      {/* <Camera /> */}
      <Navigator />
    </div>
  );
}

export default App;