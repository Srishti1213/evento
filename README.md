### Evento – Event Management Platform

A full-stack event management platform built during a hackathon to simplify how events are created, managed, and experienced. It brings organizers and users onto a single system with smooth workflows, real-time updates, and a clean, modern interface.


**What it does**

Evento allows:

- Organizers to create, manage, and track events  
- Users to explore events and register  
- Both sides to stay updated through a connected system  

The focus was to build something that actually feels usable, not just functional.


**Core Features**

- Authentication system for secure access  
- Organizer dashboard for event creation and management  
- User dashboard for browsing and registering  
- Registration system with basic validation  
- Notification support for important actions  
- Real-time updates for registrations and event changes  
- Dashboard view for tracking activity  
- Responsive design for different screen sizes  


**Tech Stack**

**Frontend**
- React 19 + Vite  
- Pure CSS (custom styling and layout)  
- Fetch API for data handling  

**Backend**
- Node.js  
- Express.js  
- JWT Authentication  
- Socket.IO (real-time support)  

**Database**
- MySQL  


**How it’s structured**

The project is divided into three main parts:

- Frontend → Handles UI, dashboards, and user interaction  
- Backend → Manages APIs, authentication, and business logic  
- Database → Stores users, events, registrations, and notifications  

This separation keeps the system organized and easier to scale.


**System Flow**

1. Organizer creates an event  
2. Event is stored in the database  
3. Users browse and register  
4. Registration updates reflect in real-time  
5. Notifications are triggered for key actions  


**Team Contributions**

**Srishti Yadav (Frontend and Integration)**
- Developed the organizer dashboard and event management interface  
- Implemented create, update, and display functionalities for events  
- Integrated frontend with backend APIs and managed data flow  
- Built reusable UI components for consistency  
- Designed responsive layouts for different screen sizes  
- Handled user interactions and state updates on the frontend  
- Contributed to overall application structure and usability  


**Sonam Maurya (Frontend and UI Development)**
- Worked on UI design and implemented the dark theme styling  
- Developed the user dashboard and browsing interface  
- Built responsive layouts using CSS Grid and breakpoints  
- Added basic animations and interactive UI elements  
- Created event listing and detail pages  
- Integrated frontend with APIs and handled UI states  
- Maintained consistency across frontend components  

**Komal Gautam (Database and Backend Integration)**
- Designed MySQL schema with Users, Events, Notifications, and Registrations tables  
- Implemented real-time capacity updates using SQL transactions (COMMIT/ROLLBACK)  
- Developed role-based access logic for organizers and users  
- Created an automated notification system for registration alerts  
- Ensured data security with password hashing and constraints  
- Integrated database with backend using environment variables  
- Prevented duplicate registrations using unique composite constraints  


**Tannu Kumari (Backend Development)**
- Worked on backend setup and API structure  
- Implemented CRUD APIs with MySQL queries  
- Added basic filters for event-related data  
- Assisted in handling registration-related logic  
- Contributed to request and response handling in APIs  
- Supported integration between backend and frontend  
- Helped in testing API endpoints and responses  


**Simran Singh (Authentication and Backend Support)**
- Implemented authentication and user login flow  
- Assisted in setting up database connection  
- Contributed to parts of registration functionality  
- Supported backend integration and API handling  
- Helped in validating user input and data handling  
- Assisted in testing backend features  
- Contributed to maintaining secure user access  

**What makes this project strong**

- Clear separation between frontend, backend, and database  
- Real-time behavior instead of static workflows  
- Two-sided system (organizer and user)  
- Focus on usability, not just features  
- Built and coordinated within a hackathon setting  
