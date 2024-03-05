import TeamPage from './components/teampage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./components/homepage";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/team" element={<TeamPage />}></Route>
      </Routes>
    </Router>
  );
}