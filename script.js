// ===== COMMON DATA =====
let events = JSON.parse(localStorage.getItem("events")) || [];

// ===== DASHBOARD =====
let eventList = document.getElementById("eventList");

if (eventList) {

  let totalEvents = Math.max(events.length, 0);
let totalRegistrations = Math.max(totalRegistrations, 0);

  eventList.innerHTML = "";

  events.forEach((event, index) => {

    let count = event.registrations ? event.registrations.length : 0;
    totalRegistrations += count;

    let div = document.createElement("div");
    div.className = "event-card";

    div.innerHTML = `
      <img src="https://source.unsplash.com/400x200/?${event.type || "event"}" class="event-img">

      <div class="event-content">
        <h3>${event.title}</h3>
        <p>📅 ${event.date}</p>
        <p>🎯 ${event.type || "General"}</p>
        <p>👥 ${count}/${event.max}</p>
      </div>
    `;

    eventList.appendChild(div);
  });

  animateValue("totalEvents", 0, totalEvents, 500);
  animateValue("totalRegistrations", 0, totalRegistrations, 500);
}


// ===== CREATE EVENT =====
let form = document.getElementById("eventForm");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    let event = {
      title: document.getElementById("title").value,
      date: document.getElementById("date").value,
      max: document.getElementById("max").value,
      type: document.getElementById("type").value,
      desc: document.getElementById("desc").value,
      registrations: [] // ✅ IMPORTANT
    };

    events.push(event);
    localStorage.setItem("events", JSON.stringify(events));

    alert("Event Created!");
    window.location.href = "index.html";
  });
}


// ===== MANAGE EVENTS =====
let tableBody = document.getElementById("tableBody");

if (tableBody) {

  tableBody.innerHTML = "";

  events.forEach((event, index) => {

    let count = event.registrations ? event.registrations.length : 0;

    let row = document.createElement("tr");

    row.innerHTML = `
      <td>${event.title}</td>
      <td>${event.date}</td>

      <td>
        <span class="badge ${(event.type || "general").toLowerCase()}">
          ${event.type || "General"}
        </span>
      </td>

      <td>${count}/${event.max}</td>

      <td>
        <button onclick="editEvent(${index})">Edit</button>
        <button onclick="deleteEvent(${index})">Delete</button>
        <button onclick="viewRegistrations(${index})">View</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}


// ===== DELETE =====
function deleteEvent(index) {
  if (confirm("Are you sure?")) {
    events.splice(index, 1);
    localStorage.setItem("events", JSON.stringify(events));
    location.reload();
  }
}


// ===== EDIT =====
function editEvent(index) {
  localStorage.setItem("editIndex", index);
  window.location.href = "edit.html";
}


// ===== EDIT PAGE =====
let editForm = document.getElementById("editForm");

if (editForm) {

  let editIndex = localStorage.getItem("editIndex");
  let event = events[editIndex];

  document.getElementById("title").value = event.title;
  document.getElementById("date").value = event.date;
  document.getElementById("max").value = event.max;
  document.getElementById("type").value = event.type || "";
  document.getElementById("desc").value = event.desc || "";

  editForm.addEventListener("submit", function(e) {
    e.preventDefault();

    event.title = document.getElementById("title").value;
    event.date = document.getElementById("date").value;
    event.max = document.getElementById("max").value;
    event.type = document.getElementById("type").value;
    event.desc = document.getElementById("desc").value;

    events[editIndex] = event;

    localStorage.setItem("events", JSON.stringify(events));

    alert("Updated!");
    window.location.href = "manage.html";
  });
}


// ===== VIEW REGISTRATIONS =====
function viewRegistrations(index) {
  localStorage.setItem("currentEvent", index);
  window.location.href = "registration.html";
}


// ===== REGISTRATIONS PAGE =====
let regBody = document.getElementById("regBody");

if (regBody) {

  let currentIndex = localStorage.getItem("currentEvent");
  let event = events[currentIndex];

  // fallback if no registrations
  if (!event.registrations) {
    event.registrations = [];
  }

  let searchInput = document.querySelector(".filters input");
  let filterSelect = document.querySelector(".filters select");

  function renderTable(data) {
    regBody.innerHTML = "";

    if (data.length === 0) {
      regBody.innerHTML = `<tr><td colspan="5">No registrations yet 😢</td></tr>`;
      return;
    }

    data.forEach(user => {

      let row = document.createElement("tr");

      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>

        <td>
          <span class="badge ${(event.type || "general").toLowerCase()}">
            ${event.type}
          </span>
        </td>

        <td>
          <span class="badge ${user.status.toLowerCase()}">
            ${user.status}
          </span>
        </td>

        <td>${user.date}</td>
      `;

      regBody.appendChild(row);
    });
  }

  function applyFilters() {

    let searchValue = searchInput.value.toLowerCase();
    let filterValue = filterSelect.value;

    let filtered = event.registrations.filter(user => {

      let matchesSearch =
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue);

      let matchesFilter =
        filterValue === "All Types" || event.type === filterValue;

      return matchesSearch && matchesFilter;
    });

    renderTable(filtered);
  }

  renderTable(event.registrations);

  searchInput.addEventListener("input", applyFilters);
  filterSelect.addEventListener("change", applyFilters);
}


// ===== ADD REGISTRATION (SIMULATION BUTTON) =====
function addDummyRegistration() {

  let currentIndex = localStorage.getItem("currentEvent");
  let event = events[currentIndex];

  let newUser = {
    name: "User" + Math.floor(Math.random() * 100),
    email: "user@test.com",
    status: "Confirmed",
    date: new Date().toLocaleDateString()
  };

  event.registrations.push(newUser);

  localStorage.setItem("events", JSON.stringify(events));

  alert("New Registration Added!");
  location.reload();
}


// ===== ANIMATION =====
function animateValue(id, start, end, duration) {

  let obj = document.getElementById(id);
  if (!obj) return;

  // 🛑 fix negative bug
  if (end <= 0) {
    obj.innerText = 0;
    return;
  }

  let range = end - start;
  let current = start;

  let increment = Math.ceil(range / (duration / 20)); // smoother + safe

  let timer = setInterval(() => {
    current += increment;

    if (current >= end) {
      current = end;
      clearInterval(timer);
    }

    obj.innerText = current;
  }, 20);
}
// script.js
const role = localStorage.getItem("role");

if (!role) {
    window.location.href = "login.html";
} 
else if (role === "organizer") {
    window.location.href = "manage.html";
} 
else {
    window.location.href = "user/index.html";
}