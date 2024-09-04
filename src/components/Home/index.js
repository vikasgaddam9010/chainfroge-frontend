import React from 'react';
import {Link} from "react-router-dom"
import './index.css'

const LandingPage = () => {
    return (
        <div className="container">
      <header className="header">
        <h1>Chainforge Technologies</h1>
        <nav>
          <ul>
            <li key="home"><Link to="/">Home</Link></li>
            <li key="contact"><Link to="/sign-up">Signup</Link></li>
            <li key="about"><Link to="/log-in">Login</Link></li>
          </ul>
        </nav>
      </header>
      <main className="main-content">
        <section className="hero">
          <h2>Discover the Future of Decentralization</h2>
          <p>Explore the latest advancements in blockchain technology. Secure, transparent, and revolutionary.</p>
          <button className="cta-button">Get Started</button>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2024 Chainforge Technologiesr. All rights reserved.</p>
      </footer>
    </div>
  
    );
};

export default LandingPage;