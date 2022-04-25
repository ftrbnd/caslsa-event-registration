import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import LoginPage from "./pages/Login/LoginPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import EventsPage from "./pages/Events/EventsPage";
import EditProfilePage from "./pages/EditProfile/EditProfilePage";
import CreateEventPage from "./pages/CreateEvent/CreateEventPage";
import UsersPage from "./pages/Users/UsersPage";
import EventDetailsPage from "./pages/EventDetails/EventDetailsPage";
import EditEventPage from "./pages/EditEvent/EditEventPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/editProfile" element={<EditProfilePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/event" element={<EventDetailsPage />} />
        <Route path="/edit-event" element={<EditEventPage />} />
        <Route path="/createEvent" element={<CreateEventPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
