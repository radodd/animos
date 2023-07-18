import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage.js';
import EventsList from './EventsList/EventsList.js';
import EventDetail from './Event Detail/eventDetail.js';
import CreateEvent from './Create Event/createEvent.js';
import LocationsListDetail from './LocationsListDetail/LocationsListDetail.js';
import './App.css';
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react';
import SignupForm from './auth_forms/SignupForm.jsx';
import LoginForm from './auth_forms/LoginForm.jsx';
import PetsList from './PetsList/PetsList.js';
import CreatePet from './CreatePet/CreatePet.js';
import MainPage from './MainPage/MainPage.js'

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');
  const [locations, setLocations] = useState([]);
  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState({});
  const [location, setLocation] = useState({});
  const [pets, setPets] = useState({});
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  async function loadAccount() {
    const response = await fetch('http://localhost:8000/token', {
      credentials: 'include',
    });
    const data = await response.json();
    setUser(data.account);
  }

  async function loadAccounts() {
    const url = `${process.env.REACT_APP_API_HOST}/api/accounts`;
    const response = await fetch(url, {
      credentials: 'include',
      method: 'get',
    });
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    }
  }

  async function loadEvent(id) {
    const response = await fetch(`http://localhost:8000/api/events/${id}`);
    if (response.ok) {
      const data = await response.json();
      const location_data = await loadLocation(data.location_id);
      data.location = location_data;
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
    const response = await fetch('http://localhost:8000/api/locations/');
    if (response.ok) {
      const data = await response.json();
      setLocations(data.locations);
    } else {
      console.error(response);
    }
  }

  async function getEvents() {
    const response = await fetch('http://localhost:8000/api/events');
    if (response.ok) {
      const data = await response.json();
      setEvents(data.events);
    }
  }

  async function getPets() {
    const response = await fetch('http://localhost:8000/api/pets');
    if (response.of) {
      const data = await response.json();
      setPets(data.pets);
    }
  }

  useEffect(() => {
    loadLocations();
    getEvents();
    getPets();
    loadAccounts();
    loadAccount();
  }, []);

  return (
    <div>
      <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
        <BrowserRouter basename={basename}>
          <div className="container">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="home" element={<MainPage events={events} />} />
              <Route exact path="/signup" element={<SignupForm />}></Route>
              <Route exact path="/login" element={<LoginForm />}></Route>
              <Route path="/" element={<LandingPage />} />
              <Route path="locations">
                <Route
                  index
                  element={<LocationsListDetail locations={locations} />}
                />
              </Route>
              <Route path="pets">
                <Route index element={<PetsList pets={pets} />} />
                <Route path="create" element={<CreatePet pets={pets} />} />
              </Route>
              <Route path="events">
                <Route index element={<EventsList events={events} />} />
                <Route
                  path="create"
                  element={
                    <CreateEvent
                      locations={locations}
                      user={user}
                      users={users}
                    />
                  }
                />

                <Route
                  path=":id"
                  element={
                    <EventDetail
                      loadEvent={loadEvent}
                      event={event}
                      location={location}
                      user={user}
                    />
                  }
                />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
export default App;
