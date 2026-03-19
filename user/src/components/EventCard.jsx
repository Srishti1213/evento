import "./EventCard.css";
import { Link } from "react-router-dom";

const EventCard = ({ event, onRegister }) => {
  return (
    <div className="card">
      <Link to={`/event/${event.id}`}>
        <h2>{event.title}</h2>
      </Link>

      <p>{event.description}</p>
      <p>Date: {event.date}</p>
      {event.location && <p>Location: {event.location}</p>}
      <p>Registrations: {event.registrations}</p>

      <button
        className="button"
        disabled={event.isRegistered}
        onClick={() => onRegister(event.id)}
      >
        {event.isRegistered ? "Registered" : "Register"}
      </button>
    </div>
  );
};

export default EventCard;