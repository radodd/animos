import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage.js';
import EventsList from './EventsList/EventsList.js';
import EventDetail from './Event Detail/eventDetail.js';
import CreateEvent from './Create Event/createEvent.js';
import LocationsListDetail from './LocationsListDetail/LocationsListDetail.js';
import './App.css';

function App() {
    const [locations, setLocations] = useState([]);
    const [events, setEvents] = useState([]);
    const [event, setEvent] = useState({});
    const [location, setLocation] = useState({});

    async function loadEvent(id) {
        const response = await fetch(`http://localhost:8000/api/events/${id}`);
        if (response.ok) {
            const data = await response.json();
            const location_data = await loadLocation(data.location_id);
            data.location = location_data;
            const user_id = 'test account';
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
        const response = await fetch(
            `http://localhost:8000/api/locations/${id}`
        );
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
                        <Route path="locations">
                            <Route
                                index
                                element={
                                    <LocationsListDetail
                                        locations={locations}
                                    />
                                }
                            />
                        </Route>
                        <Route path="events">
                            <Route
                                index
                                element={<EventsList events={events} />}
                            />
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
                    </Routes>
                </div>
                {/* <ErrorNotification error={error} />
        <Construct info={launchInfo} /> */}
            </BrowserRouter>
        </div>
    );
}

export default App;
