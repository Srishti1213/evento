import { useEffect, useState } from "react";
import "./MyRegistrations.css";
import { getMyRegistrations } from "../services/api";
import { Link } from "react-router-dom";
import Shimmer from "../components/Shimmer";

const MyRegistrations = () => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getMyRegistrations();
    setEvents(data.events || []);
  };

  if (!events) return <Shimmer />;

  return (
    <div className="reg-container">
      <h1>📋 My Registrations</h1>
      <Link to="/">⬅ Back</Link>

      {events.length === 0 ? (
        <p>No registrations</p>
      ) : (
        events.map((e) => (
          <div key={e.id} className="reg-item">
            <h3>{e.title}</h3>
            <p>{e.date}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyRegistrations;