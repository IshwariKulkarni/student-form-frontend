import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './components/Form';
import StudentTable from './components/StudentTable';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
      <Route path='' element={<Form/>} />
      <Route path='/studentData' element={<StudentTable/>} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
