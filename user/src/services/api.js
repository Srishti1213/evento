// API service for event-dashboard
const API_BASE = 'http://localhost:5000/api'; // Replace with your backend URL

export const getEvents = async () => {
  try {
    const response = await fetch(`${API_BASE}/events`);
    if (!response.ok) throw new Error('Failed to fetch events');
    const events = await response.json();
    return { events };
  } catch (error) {
    return { events: [] };
  }
};

export const getEventById = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/events/${id}`);
    if (!response.ok) throw new Error('Failed to fetch event');
    const event = await response.json();
    return { event };
  } catch (error) {
    return { event: null };
  }
};

export const createEvent = async ({ title, description, date, location }) => {
  try {
    const response = await fetch(`${API_BASE}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, date, location, createdby: 1 }),
    });
    if (!response.ok) throw new Error('Failed to create event');
    const event = await response.json();
    return { event };
  } catch (error) {
    throw error;
  }
};

export const registerEvent = async (eventid) => {
  try {
    const response = await fetch(`${API_BASE}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userid: 1, eventid }),
    });
    if (!response.ok) throw new Error('Failed to register');
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

export const getMyRegistrations = async () => {
  try {
    const response = await fetch(`${API_BASE}/registrations?userid=1`);
    if (!response.ok) throw new Error('Failed to fetch registrations');
    const registrations = await response.json();
    const events = registrations.map(reg => reg.event);
    return { events };
  } catch (error) {
    return { events: [] };
  }
};
