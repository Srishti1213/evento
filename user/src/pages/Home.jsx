import { useEffect, useState } from "react";
import "./Home.css";
import EventCard from "../components/EventCard";
import Shimmer from "../components/Shimmer";
import { getEvents, registerEvent, createEvent } from "../services/api";
import { Link } from "react-router-dom";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", description: "", date: "", location: "" });

  const loadEvents = async () => {
    const data = await getEvents();
    const list = data.events || [];

    setEvents(list);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    loadEvents();
    const interval = setInterval(loadEvents, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleRegister = async (id) => {
    const res = await registerEvent(id);
    alert(res.success ? "🎉 Registered!" : "⚠️ Registration failed");
    loadEvents();
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim() || !form.date.trim() || !form.location.trim()) {
      alert("Please fill in all the event fields.");
      return;
    }

    setLoading(true);
    try {
      await createEvent(form);
      setForm({ title: "", description: "", date: "", location: "" });
      await loadEvents();
    } catch (error) {
      alert("Failed to create event. Please check your backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalRegistrationCount = events.reduce((acc, item) => acc + item.registrations, 0);

  return (
    <div className="container">
      <h1 className="header">Event Management Dashboard</h1>

      <div className="stats-row">
        <div className="stat-card">
          <h3>📅 Total Events</h3>
          <p>{events.length}</p>
        </div>
        <div className="stat-card">
          <h3>👥 Total Registrations</h3>
          <p>{totalRegistrationCount}</p>
        </div>
      </div>

      <section className="create-box">
        <h2>Create Event</h2>
        <form className="event-form" onSubmit={handleCreateEvent}>
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            placeholder="Date (YYYY-MM-DD)"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <input
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <button type="submit" className="create-button">
            Create Event
          </button>
        </form>
      </section>

      <input
        className="search"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Link className="link" to="/my-registrations">
        My Registrations
      </Link>

      {loading ? (
        <Shimmer />
      ) : (
        <div className="event-list">
          {filteredEvents.length ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} onRegister={handleRegister} />
            ))
          ) : (
            <div className="empty-state">No events found. Try another search.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;