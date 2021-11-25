import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Main from './Main';
import Login from './Login';
import StudentSignup from './StudentSignup';
import ClubSignup from './ClubSignup';
import FacultySignup from './FacultySignup';
import Createpost from './Createpost';
import Profile from './Profile';
import Settings from './Settings';

function App() {
  
  return (
      <div>
        
        <Router>
          <div>
            <Routes>
              
              <Route exact path="/" element={<Main/>} />
              <Route exact path="/:section" element={<Main/>} />
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/student-signup" element={<StudentSignup/>} />
              <Route exact path="/club-signup" element={<ClubSignup/>} />
              <Route exact path="/faculty-signup" element={<FacultySignup/>} />
              <Route exact path="/post-to/:section" element={<Createpost/>} />
              <Route exact path="/profile/:profileusername" element={<Profile/>} />
              <Route exact path="/settings" element={<Settings/>} />
              
            </Routes>
            
          </div>
			</Router>
      </div>
  );
}
export default App;

