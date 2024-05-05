import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TeamPage from './components/teampage';
import HomePage from "./components/homepage";
import Intro from './components/intro';
import Search from './components/search';
import Anime from './components/anime';


export default function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/anime/:id" element={<Anime />} />
        </Routes>
      </Router>
  );
}