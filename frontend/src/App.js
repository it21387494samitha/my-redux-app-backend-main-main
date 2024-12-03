import React  from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import the provider
import Register from '../src/Pages/Login/RegisterPage';
import Login from '../src/Pages/Login/Login';
import CustomerDash from './Pages/Home/CustomerDash';
import AdminDash from './Pages/Home/AdminDash';
import SeatBooking from './Pages/SeatBooking/SeatBooking';
import AdminSeatManagement from './Admin/SeatAdd';
import ManageEvents from './Admin/ManageEvents';
import EventForm from './Admin/EventForm';
import EventList from './Pages/Event/EventList';
import Header from './Component/Header'; // Adjusted import
import './app.css';
import Sidebar from './Component/SideBar';
import Profile from './User/UserProfile';
import ProfileImageUpload from './User/ProfileImageUpload';
import BookingHistory from './Pages/History/BookingHistory';
import UserSettings from './Pages/Setting/Setting';
import AdminSeatBooking from './Admin/AdminSeatBooking';
import ManageUsers from './Admin/ManageUsers';
import QR from './Admin/QRCodeDisplay';
import Service from './Pages/Service/Service';
import GoogleSuccess from './Pages/Login/GoogleSuccess';
import EditEvent from './Admin/EventEdit';
import Contact from './Pages/Contact/Contact';
import AboutUs from './Pages/AboutUs/AboutUs';

function App() {

  


  

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
       
        <Header />

        <Sidebar /> 
        <div className={`main-content `}>
          <Routes>
            {/* Admin Routes */}
            <Route path="/event" element={<EventForm />} />
            <Route path="/admin" element={<AdminDash />} />
            <Route path="/ad" element={<AdminSeatManagement />} />
            <Route path="/allseat" element={<AdminSeatBooking />} />
            <Route path="/manage-users" element={<ManageUsers />} />
            <Route path="/QR" element={<QR />} />
            <Route path='/admin/edit-event/:eventId' element={<EditEvent/>} />

            {/* Customer Routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth/google/success" element={<GoogleSuccess/>} />
            <Route path="/" element={<CustomerDash />} />
            <Route path="/mevent" element={<ManageEvents />} />
            <Route path="/list" element={<EventList />} />
            <Route path='/services' element={<Service />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/about' element={<AboutUs/>}/>
            <Route path='/settings' element={<UserSettings/>} />

            {/* Booking Route */}
            <Route path="/booking/:eventId" element={<SeatBooking />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/p' element={<ProfileImageUpload />} />
            <Route path='/history' element={<BookingHistory />} />
            
        
           
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider> 
  );
}

export default App;
