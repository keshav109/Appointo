# MyTurn - Hospital Management System

MyTurn is a comprehensive hospital management system built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides a platform for managing doctor appointments, patient records, and hospital administrative tasks.

## Features

- 🏥 Multi-role authentication (Admin, Doctor, Patient)
- 👨‍⚕️ Doctor profile and availability management
- 📅 Appointment scheduling system
- 📊 Analytics and reports
- 🏘️ Department management
- 👤 Patient health records
- 📝 Prescription management
- ⭐ Doctor reviews and ratings
- 🌓 Dark/Light theme support

## Tech Stack

- **Frontend:**
  - React.js with Vite
  - Redux Toolkit for state management
  - Tailwind CSS for styling
  - React Router for navigation

- **Backend:**
  - Node.js with Express
  - MongoDB for database
  - JWT for authentication
  - Multer for file uploads

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Install Backend dependencies:
   ```bash
   cd Backend
   npm install
   ```

3. Install Frontend dependencies:
   ```bash
   cd ../Frontend
   npm install
   ```

4. Create a .env file in the Backend directory with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

### Running the Application

1. Start the Backend server:
   ```bash
   cd Backend
   npm start
   ```

2. Start the Frontend development server:
   ```bash
   cd Frontend
   npm run dev
   ```

3. To seed the database with sample doctors:
   ```bash
   cd Backend
   node seedData.js
   ```

## Project Structure

```
├── Backend/
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Authentication middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   └── server.js       # Server entry point
│
├── Frontend/
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── features/   # Redux slices
│   │   └── app/        # Redux store
│   └── index.html
```

## API Endpoints

- `/api/users` - User authentication and management
- `/api/doctors` - Doctor profile management
- `/api/appointments` - Appointment scheduling
- `/api/departments` - Department management
- `/api/analytics` - System analytics
- `/api/reviews` - Doctor reviews

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.