import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import LandingPage from "./Landing Page/LandingPage.js";
import EventsList from "./EventsList/EventsList.js";
import CreateEvent from "./Create Event/createEvent.js";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const { id } = useParams();
  // const [launchInfo, setLaunchInfo] = useState([]);
  // const [error, setError] = useState(null);

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

  useEffect(() => {
    loadLocations();
    getEvents();
  }, []);

  return (
    <div>
      <BrowserRouter>
        {/* <Nav /> */}
        <div className="container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="events">
              <Route index element={<EventsList events={events} />} />
              <Route
                path="create"
                element={<CreateEvent locations={locations} />}
              />
              {/* <Route path=":id" element={<EventDetail id={id} />} /> */}
            </Route>
          </Routes>
        </div>
        {/* <ErrorNotification error={error} />
        <Construct info={launchInfo} /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
