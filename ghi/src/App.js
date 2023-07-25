import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage.js';
import EventsList from './EventsList/EventsList.js';
import CreateEvent from './CreateEvent/createEvent.js';
import LocationsListDetail from './LocationsListDetail/LocationsListDetail.js';
import UserAccounts from './user_profile/UserAccounts.jsx';
import './App.css';
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react';
import SignupForm from './auth_forms/SignupForm.jsx';
import LoginForm from './auth_forms/LoginForm.jsx';
import PetsList from './PetsList/PetsList.js';
import CreatePet from './CreatePet/CreatePet.js';
import MainPage from './MainPage/MainPage.js';
import ProfilePage from './user_profile/ProfilePage.js';
import NavBar from './NavBar.js';
// import FindFriend from './FindFriend/FindFriend.js';
// import MyFriends from './MyFriends/MyFriends.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations } from './actions/locationActions.js';
import { fetchEvents } from './actions/eventAction.js';
import { fetchUser, fetchUsers } from './actions/userAction.js';
import { fetchPets } from './actions/petAction.js';

function App() {
    const domain = /https:\/\/[^/]+/;
    const basename = process.env.PUBLIC_URL.replace(domain, '');
    const [pets, setPets] = useState({});
    const dispatch = useDispatch();
    const events = useSelector((state) => state.events);
    const user = useSelector((state) => state.user);
    const reduxPets = useSelector((state) => state.pets);
    console.log(reduxPets);

    async function getPets() {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/api/pets`
        );
        if (response.ok) {
            const data = await response.json();
            setPets(data.pets);
        }
    }

    useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchLocations());
        dispatch(fetchEvents());
        dispatch(fetchUsers());
        dispatch(fetchPets());
        getPets();
        // getUserDataTest();
    }, [dispatch]);

    return (
        <div>
            <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
                <BrowserRouter basename={basename}>
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route
                                path="home"
                                element={
                                    <MainPage events={events} user={user} />
                                }
                            />
                            <Route
                                exact
                                path="/signup"
                                element={<SignupForm />}
                            ></Route>
                            <Route
                                exact
                                path="/login"
                                element={<LoginForm />}
                            ></Route>
                            <Route path="locations">
                                <Route
                                    index
                                    element={<LocationsListDetail />}
                                />
                            </Route>
                            <Route path="pets">
                                <Route
                                    index
                                    element={<PetsList pets={pets} />}
                                />
                                <Route
                                    path="create"
                                    element={<CreatePet pets={pets} />}
                                />
                            </Route>
                            <Route path="events">
                                <Route index element={<EventsList />} />
                                <Route
                                    path="create"
                                    element={<CreateEvent />}
                                />
                            </Route>
                            <Route path="profile">
                                <Route
                                    path="all"
                                    element={
                                        <UserAccounts
                                        // userDataTest={userDataTest}
                                        />
                                    }
                                />
                                <Route
                                    path=""
                                    element={
                                        <ProfilePage
                                        // user={user}
                                        // loadAccount={loadAccount}
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
