import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FindLegalAid from './pages/FindLegalAid';
import TrackCourtCase from './pages/TrackCourtCase';
import KnowYourRights from './pages/KnowYourRights';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/find-legalaid">Find Legal Aid</Link></li>
            <li><Link to="/track-courtcase">Track Court Case</Link></li>
            <li><Link to="/know-your-rights">Know Your Rights</Link></li>
          </ul>
        </nav>
        
        <Routes>
          <Route path="/find-legalaid" element={<FindLegalAid />} />
          <Route path="/track-courtcase" element={<TrackCourtCase />} />
          <Route path="/know-your-rights" element={<KnowYourRights />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;