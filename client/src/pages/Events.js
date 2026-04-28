import React, { useState } from "react";
import "./Events.css";

const Events = () => {
  const [filter, setFilter] = useState("All");

  const events = [
    {
      id: 1,
      date: "May 5",
      title: "Live Music Night",
      category: "Music",
      desc: "Enjoy live performances from local bands.",
      status: "Upcoming",
    },
    {
      id: 2,
      date: "May 10",
      title: "Wine Tasting Event",
      category: "Wine",
      desc: "Taste premium wines with experts.",
      status: "Upcoming",
    },
    {
      id: 3,
      date: "May 15",
      title: "BBQ Special Night",
      category: "Food",
      desc: "Unlimited BBQ with special discounts.",
      status: "Upcoming",
    },
    {
      id: 4,
      date: "Today",
      title: "DJ Night Party",
      category: "Music",
      desc: "Dance all night with top DJs.",
      status: "Today",
    },
  ];

  const categories = ["All", "Music", "Food", "Wine"];

  const filteredEvents =
    filter === "All"
      ? events
      : events.filter((event) => event.category === filter);

  return (
    <div className="events-page">
      <h2 className="events-title">✨ Events & Specials</h2>

      {/* Filter Buttons */}
      <div className="filter-container">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? "active" : ""}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="events-grid">
        {filteredEvents.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-header">
              <span className="event-date">{event.date}</span>
              <span className={`status ${event.status.toLowerCase()}`}>
                {event.status}
              </span>
            </div>

            <h3 className="event-title">{event.title}</h3>
            <p className="event-desc">{event.desc}</p>

            <span className="event-category">{event.category}</span>

            <button className="book-btn">Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;