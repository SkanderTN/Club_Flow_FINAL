# ClubFLOW

ClubFLOW is a full-stack web application that helps university club members manage requests for materials, rooms, bus transportation, and training. The platform allows users to submit requests and admins to approve or reject them.

## 🌐 Tech Stack

- **Frontend:** React.js (Next.js + Tailwind CSS)
- **Backend:** Spring Boot (Java)
- **Database:** MySQL
- **Authentication:** JWT (Spring Security)
- **Mapping:** MapStruct

## 🔧 Features

- User authentication (login, roles: USER/ADMIN)
- Submit requests (bus, room, material, training)
- Admin panel to view and manage requests
- View request history by user
- Secure REST API

## 📦 Project Structure

ClubFLOW/
├── ClubFLOW-back/ # Spring Boot backend
├── Frontend-Club-FLOW/ # React/Next.js frontend


## 🚀 Run Locally

### Backend (Spring Boot)
'''bash 
cd ClubFLOW-back
./mvnw spring-boot:run 

### Frontend (React/Next.js)
cd Frontend-Club-FLOW
npm install
npm run dev

Make sure your MySQL DB is running and the connection info is correct in application.properties.
