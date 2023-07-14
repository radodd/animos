import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './Landing Page/LandingPage.js';
import CreateEvent from './Create Event/createEvent.js';
import PetsList from './Pets/PetsList.js';
import CreatePet from './Pets/createPet.js';
// import Construct from "./Construct.js";
// import ErrorNotification from "./ErrorNotification";
import './App.css';




function App() {
    const [locations, setLocations] = useState([]);
    const [pets, setPets] = useState([]);
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


    async function loadPets() {
        const response = await fetch('http://localhost:8000/api/pets/');
        if (response.ok) {
            const data = await response.json();
            setPets(data.pets);
        } else {
            console.error(response);
        }
    }

    useEffect(() => {
        loadPets();
    }, []);


    return (
        <div>
            <BrowserRouter>
                {/* <Nav /> */}
                <div className="container">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route
                            path="events/create"
                            element={<CreateEvent locations={locations} />}
                        />
                        <Route path="/pets"
                            element={<PetsList pets={pets} />} />
                        <Route path="/pets/create"
                            element={<CreatePet pets={pets} />} />
                    </Routes>
                </div>
                {/* <ErrorNotification error={error} />
        <Construct info={launchInfo} /> */}
            </BrowserRouter>
        </div>
    );
}

export default App;
