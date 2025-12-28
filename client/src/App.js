import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AssignmentList from './pages/AssignmentList';
import AssignmentAttempt from './pages/AssignmentAttempt';
import './styles/index.scss';

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={
              <div className="container">
                <AssignmentList />
              </div>
            } />
            <Route path="/assignment/:id" element={<AssignmentAttempt />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;