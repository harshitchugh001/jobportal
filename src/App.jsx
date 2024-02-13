import {Route,BrowserRouter as Router,Routes} from 'react-router-dom'
import JobOpenings from './pages/jobOpening';
import JobInfo from './pages/jobInfo'; // Ensure the component name starts with a capital letter

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<JobOpenings/>} />
        <Route path="/job/:jobId" element={<JobInfo/>} />
      </Routes>
    </Router>
  );
}

export default App;
