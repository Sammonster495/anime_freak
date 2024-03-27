import TeamPage from './components/teampage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./components/homepage";
import Background from './components/background';
import Search from './components/search';


export default function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Background />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
  );
}