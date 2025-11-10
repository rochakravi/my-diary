import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Activity from './components/activity/Activity';
import Finance from './components/finance/Finance';
import Layout from './components/layout/Layout';
import Home from './components/Home';
import Learning from './components/learning/Learning';
import Java from './components/learning/java/Java';
import Microservices from './components/learning/microservices/Microservices';

function App() {
  const [activity, setActivity] = useState({
    id: "love",
    name: "love",
    status: "inc"

  })

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="activity" element={<Activity />} />
          <Route path="finance" element={<Finance />} />
          <Route path="learning" element={<Learning />}>
            <Route path="/learning/java" element={<Java />} />
            <Route path="/learning/microservices" element={<Microservices />} />
          </Route>
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;