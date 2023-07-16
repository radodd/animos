import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage.js";
import EventsList from "./EventsList/EventsList.js";
import EventDetail from "./Event Detail/eventDetail.js";
import CreateEvent from "./Create Event/createEvent.js";
import LocationsListDetail from "./LocationsListDetail/LocationsListDetail.js";
import ProfilePage from "./user_profile/ProfilePage.js";
import UserAccounts from "./user_profile/UserAccounts.jsx";
import "./App.css";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import SignupForm from "./auth_forms/SignupForm.jsx";
import LoginForm from "./auth_forms/LoginForm.jsx";

// import Construct from "./Construct.js";
// import ErrorNotification from "./ErrorNotification";
import "./App.css";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  // const [launchInfo, setLaunchInfo] = useState([]);
  // const [error, setError] = useState(null);
  const [locations, setLocations] = useState([]);
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({});
  const [location, setLocation] = useState({});
  // const [userProfile, setUserProfile] = useState({});
  const [userDataTest, setUserDataTest] = useState([]);

  async function loadEvent(id) {
    const response = await fetch(`http://localhost:8000/api/events/${id}`);
    if (response.ok) {
      const data = await response.json();
      const location_data = await loadLocation(data.location_id);
      data.location = location_data;
      const user_id = "test account";
      if (data.account_id === user_id) {
        data.is_owner = true;
      } else {
        data.is_owner = false;
      }
      setEvent(data);
      setLocation(data.location);
    }
  }

  async function loadLocation(id) {
    const response = await fetch(`http://localhost:8000/api/locations/${id}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  }

  async function loadLocations() {
    const response = await fetch("http://localhost:8000/api/locations/");
    if (response.ok) {
      const data = await response.json();
      setLocations(data.locations);
    } else {
      console.error(response);
    }
  }

  async function getEvents() {
    const response = await fetch("http://localhost:8000/api/events");
    if (response.ok) {
      const data = await response.json();
      setEvents(data.events);
    }
  }

  // async function getUserProfile(email) {
  //   const encodedEmail = encodeURIComponent(email);
  //   const response = await fetch(
  //     `http://localhost:8000/api/accounts?email=${encodedEmail}`
  //   );
  //   if (response.ok) {
  //     const data = await response.json();
  //     if (data.length > 0) {
  //       console.log("User profile data:", data);
  //       return data;
  //     }
  //   }
  //   throw new Error("Failed to fetch user profile");
  // }

  async function getUserDataTest() {
    const url = `${process.env.REACT_APP_API_HOST}/api/accounts`;

    const response = await fetch(url, {
      credentials: "include",
      method: "get",
    });

    if (response.ok) {
      const data = await response.json();
      setUserDataTest(data);
    }
  }

  useEffect(() => {
    loadLocations();
    getEvents();
    getUserDataTest();
  }, []);

  return (
    <div>
      <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
        <BrowserRouter basename={basename}>
          {/* <Nav /> */}
          <div className="container">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route exact path="/signup" element={<SignupForm />}></Route>
              <Route exact path="/login" element={<LoginForm />}></Route>
              <Route path="/" element={<LandingPage />} />
              <Route path="locations">
                <Route
                  index
                  element={<LocationsListDetail locations={locations} />}
                />
              </Route>
              <Route path="events">
                <Route index element={<EventsList events={events} />} />
                <Route
                  path="create"
                  element={<CreateEvent locations={locations} />}
                />
                <Route
                  path=":id"
                  element={
                    <EventDetail
                      loadEvent={loadEvent}
                      event={event}
                      location={location}
                    />
                  }
                />
              </Route>
              <Route path="profile">
                <Route
                  path="all"
                  element={<UserAccounts userDataTest={userDataTest} />}
                />
                <Route path="" element={<ProfilePage />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
