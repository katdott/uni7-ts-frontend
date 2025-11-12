// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Layout/Navbar/Navbar';
import './App.css';
import HomePage from './app/page';
import AvisosPage from './app/avisos/page';
import DenunciasPage from './app/denuncias/page';

function App() {
  return (
    <Router>
      <div className="appWrapper">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/avisos" element={<AvisosPage />} />
            <Route path="/denuncias" element={<DenunciasPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;