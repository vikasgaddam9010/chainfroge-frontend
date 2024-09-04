import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./components/Home"
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/log-in' element={<Login/>}/>
      <Route path='/sign-up' element={<Signup/>}/>
    </Routes>
  </BrowserRouter>
);

export default App;
