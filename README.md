# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Eclipse Villas Hotel Booking System

A web-based hotel booking system with advanced features, improved UI, and additional functionalities. 

---

## Demo

[Watch Demo on YouTube](https://youtu.be/5wwsdfWxGfo)

---



## Some Key Features
1. **Refresh Token Authentication**
   - Extended user sessions with refresh tokens.
   - Alert notifications for token expiration.
  
2. **Redis Caching for Room Information**
   - Integrated Redis to cache room data, reducing database query load.
   - Improved system performance by serving frequently accessed data from the cache.

3. **UI Improvements**
   - Redesigned booking page layout.
   - Added responsive design.

4. **About Us Page**
   - A new page introducing the business.

---

## System Design

### Architecture Diagram
Below is the high-level architecture of the system:

![HotelBookingSystem drawio](https://github.com/user-attachments/assets/570f4b64-f008-4dbb-8f56-220697c2192f)



1. **Front-End**: Built with React and Vite, interacting with the back-end using Axios.
2. **Back-End**: A RESTful API implemented using Spring Boot, handling business logic and interacting with the database.
3. **Redis Cache**: Caches query results to avoid frequent database access. Redis stores the room data, and the cache key is based on the room ID.
4. **Database**: MySQL stores user, booking, and room data.
5. **Authentication**: Uses JWT for secure user authentication and session management.

---

### Technology Stack
| Layer         | Technology         |
| ------------- | ------------------ |
| **Front-End** | React, Vite        |
| **Back-End**  | Spring Boot, JWT   |
| **Database**  | MySQL              |
| **Others**    | Axios, Redis       |

---

### Core Components
1. **Authentication**: Handles user login, registration, and token validation.
2. **Room Management**: Manages CRUD operations for rooms.
3. **Booking System**: Handles room booking, cancellation, and availability checks.
4. **Notification**: Alerts users about token expiration or booking status.


