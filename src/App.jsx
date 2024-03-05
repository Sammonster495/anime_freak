import TeamPage from './components/teampage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./components/homepage";
import Background from './components/background';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Background />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/team" element={<TeamPage />}></Route>
      </Routes>
    </Router>
  );
}