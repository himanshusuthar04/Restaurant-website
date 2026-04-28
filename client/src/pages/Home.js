import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

import HeroImg from "../Images/foodiesfeed.com_burger-with-melted-cheese.jpg";
import Dish1 from "../Images/foodiesfeed.com_elegant-biryani-garnished-with-edible-flowers.jpg";
import Dish2 from "../Images/foodiesfeed.com_grilled-meat-wrap-with-fresh-vegetables-and-fries.jpg";
import Dish3 from "../Images/foodiesfeed.com_spicy-corn-and-veggie-pizza-with-fresh-ingredients.jpg";

const Home = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 300);
  }, []);

  // ✅ Dynamic dishes (scalable like API)
  const dishes = [
    { img: Dish1, title: "Royal Biryani", desc: "Rich & aromatic spices" },
    { img: Dish2, title: "Grilled Wrap", desc: "Crispy & juicy combo" },
    { img: Dish3, title: "Veggie Pizza", desc: "Loaded with fresh toppings" }
  ];

  return (
    <div className="home">

      {/* HERO */}
      <section className={`hero ${visible ? "fade-in" : ""}`}>
        <img src={HeroImg} alt="hero" className="hero-img" />

        <div className="hero-overlay" />

        <div className="hero-content">
          <h1>Welcome to CozyBite 🍽️</h1>
          <p>Where taste meets comfort & creativity</p>

          <div className="hero-buttons">
            <Link to="/menu" className="btn primary">Explore Menu</Link>
            <Link to="/reservations" className="btn secondary">Reserve Table</Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about">
        <h2>Crafted for Food Lovers ❤️</h2>
        <p>
          Every dish at CozyBite is designed with passion — combining
          traditional flavors with modern creativity.
        </p>
      </section>

      {/* FEATURED */}
      <section className="featured">
        <h2>Signature Dishes 🍴</h2>

        <div className="dish-grid">
          {dishes.map((dish, i) => (
            <div className="dish-card" key={i}>
              <img src={dish.img} alt={dish.title} />
              <div className="dish-content">
                <h3>{dish.title}</h3>
                <p>{dish.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className="experience">
        <div className="exp-box">
          <h3>🍷 Premium Dining</h3>
          <p>Elegant atmosphere with curated dishes</p>
        </div>
        <div className="exp-box">
          <h3>🔥 Fresh Ingredients</h3>
          <p>Locally sourced & always fresh</p>
        </div>
        <div className="exp-box">
          <h3>🎶 Live Ambience</h3>
          <p>Music, lights & cozy vibes</p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to taste something amazing?</h2>
        <Link to="/reservations" className="btn primary">
          Book Your Table Now
        </Link>
      </section>

    </div>
  );
};

export default Home;