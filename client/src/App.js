import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './componets/LandingPage';
import Home from './componets/Home';
import Detail from './componets/Detail.jsx';
import PokemonCreate from './componets/PokemonCreate';


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route exact path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<PokemonCreate />} />
        <Route exact path="/home" element={<Home />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
