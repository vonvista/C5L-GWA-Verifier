import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import UserSystemPage from '../frontend/components/UserSystemPage.jsx'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserSystemPage />} />
      </Routes>
    </Router>
  );
}
