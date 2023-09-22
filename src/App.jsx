import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Signin from './pages/SignIn/SignIn';
import Images from './pages/Images/Images';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/image' element={<Images />} />
    </Routes>
  );
}

export default App;
