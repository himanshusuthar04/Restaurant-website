import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About CozyBite</h1>
        <p>Where passion meets flavor & unforgettable dining experiences</p>
      </section>

      <section className="about-section">
        <h2>Our Story</h2>
        <p>
          CozyBite was born from a simple idea - to create a place where food is
          not just eaten, but experienced. Every recipe is crafted with fresh
          ingredients, inspired by tradition, and elevated with modern
          creativity.
        </p>
      </section>

      <section className="about-section highlight">
        <h2>Our Mission</h2>
        <p>
          To deliver delicious vegetarian cuisine that satisfies both the heart
          and soul, while maintaining the highest standards of quality and
          hospitality.
        </p>
      </section>

      <section className="features">
        <div className="feature-box">
          <h3>100% Fresh</h3>
          <p>We use only fresh, locally sourced ingredients.</p>
        </div>

        <div className="feature-box">
          <h3>Expert Chefs</h3>
          <p>Crafted by passionate and skilled chefs.</p>
        </div>

        <div className="feature-box">
          <h3>Cozy Ambience</h3>
          <p>Warm and welcoming dining environment.</p>
        </div>

        <div className="feature-box">
          <h3>Premium Quality</h3>
          <p>Every dish meets our high quality standards.</p>
        </div>
      </section>

      <section className="stats">
        <div className="stat-box">
          <h2>5+</h2>
          <p>Years Experience</p>
        </div>

        <div className="stat-box">
          <h2>10K+</h2>
          <p>Happy Customers</p>
        </div>

        <div className="stat-box">
          <h2>50+</h2>
          <p>Menu Items</p>
        </div>

        <div className="stat-box">
          <h2>100%</h2>
          <p>Vegetarian</p>
        </div>
      </section>

      <section className="about-cta">
        <h2>Come & Experience the Taste</h2>
        <p>We're not just serving food - we're creating memories.</p>
      </section>
    </div>
  );
};

export default About;
