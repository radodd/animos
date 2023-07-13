import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './Landing Page/LandingPage.js';
import CreateEvent from './Create Event/createEvent.js';
import LocationsList from './Locations List/LocationsList.js';
// import Construct from "./Construct.js";
// import ErrorNotification from "./ErrorNotification";
import './App.css';

function App() {
    const [locations, setLocations] = useState([]);
    // const [launchInfo, setLaunchInfo] = useState([]);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //   async function getData() {
    //     let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
    //     console.log("fastapi url: ", url);
    //     let response = await fetch(url);
    //     console.log("------- hello? -------");
    //     let data = await response.json();

    //     if (response.ok) {
    //       console.log("got launch data!");
    //       setLaunchInfo(data.launch_details);
    //     } else {
    //       console.log("drat! something happened");
    //       setError(data.message);
    //     }
    //   }
    //   getData();
    // }, []);

    async function loadLocations() {
        const response = await fetch('http://localhost:8000/api/locations/');
        if (response.ok) {
            const data = await response.json();
            setLocations(data.locations);
        } else {
            console.error(response);
        }
    }

    useEffect(() => {
        loadLocations();
    }, []);
    return (
        <div>
            <BrowserRouter>
                {/* <Nav /> */}
                <div className="container">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="events/create" element={<CreateEvent locations={locations} />}/>
                        <Route path="locations">
                          <Route index element={<LocationsList locations={locations}/>}/>
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
