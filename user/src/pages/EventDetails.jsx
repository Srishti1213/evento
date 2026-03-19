import { useEffect, useState } from "react";
import "./EventDetails.css";
import { useParams } from "react-router-dom";
import { getEventById, registerEvent } from "../services/api";
import Shimmer from "../components/Shimmer";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  const loadEvent = async () => {
    const data = await getEventById(id);
    setEvent(data.event);
  };

  useEffect(() => {
    loadEvent();
  }, []);

  const handleRegister = async () => {
    const res = await registerEvent(id);
    alert(res.success ? "Registered!" : "Failed!");
    loadEvent();
  };

  if (!event) return <Shimmer />;

  return (
    <div className="details-container">
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>Date: {event.date}</p>
      {event.location && <p>Location: {event.location}</p>}

      <button
        className="details-btn"
        disabled={event.isRegistered}
        onClick={handleRegister}
      >
        {event.isRegistered ? "Registered" : "Register"}
      </button>
    </div>
  );
};

export default EventDetails;