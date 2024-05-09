import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TeamPage from './components/teampage';
import HomePage from "./components/homepage";
import Intro from './components/intro';
import Search from './components/search';
import Anime from './components/anime';
import Login from './components/login';
import SignUp from './components/signup';

export default function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/anime/:id" element={<Anime />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
  );
}