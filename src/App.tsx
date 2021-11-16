import Header from './components/Header';
import Hero from './components/Hero';
import Home from './components/Home';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<><Header /><Hero /></>} />
        <Route path='/channels' element={<Home />} />
        <Route path='/channels/:id' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
