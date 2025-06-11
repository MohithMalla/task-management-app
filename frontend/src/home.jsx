import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <button className="btn btn-primary" onClick={() => navigate("/api/login")}>
        Login
      </button>
      
    </div>
  );
}

export default Home;
