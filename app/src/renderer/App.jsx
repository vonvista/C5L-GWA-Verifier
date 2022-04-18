import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import StudentHistoryModal from '../frontend/components/StudentHistoryModal';

const Hello = () => {
  return (
    <div>
      <StudentHistoryModal />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
