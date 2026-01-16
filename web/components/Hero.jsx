import React from 'react';

export default function Hero() {
  return (
    <main className="hero">
      <div className="hero-top">
        <div className="badge">Nova.js</div>
        <span className="spark">✨</span>
      </div>
      <h1>
        Fast build. Playful UI. Clean Backend.
        <span>With Nova, everything is easy.</span>
      </h1>
      <p>
        This is your <code>Nova Code</code>, you can start building your application.
      </p>
      <div className="cta">
        <button type="button">Get Started</button>
        <button type="button" className="ghost">
          Read Instruction
        </button>
      </div>
      <div className="hero-tags">
        <span>React + Node</span>
        <span>Fast Response</span>
        <span>Customizeable</span>
      </div>
    </main>
  );
}
