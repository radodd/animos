import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage.js";
import EventsList from "./EventsList/EventsList.js";
import LocationsListDetail from "./LocationsListDetail/LocationsListDetail.js";
import UserAccounts from "./user_profile/UserAccounts.jsx";
import "./App.css";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import SignupForm from "./auth_forms/SignupForm.jsx";
import LoginForm from "./auth_forms/LoginForm.jsx";
import PetsList from "./PetsList/PetsList.js";
import CreatePet from "./CreatePet/CreatePet.js";
import MainPage from "./MainPage/MainPage.js";
import ProfilePage from "./user_profile/ProfilePage.js";
import FindFriend from "./FindFriend/FindFriend.js";
// import MyFriends from './MyFriends/MyFriends.js';
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations } from "./actions/locationActions.js";
import { fetchEvents } from "./actions/eventAction.js";
import { fetchUser, fetchUsers } from "./actions/userAction.js";
import { fetchPets } from "./actions/petAction.js";
import Modal from "react-modal";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const reduxUser = useSelector((state) => state.user);
  const [user, setUser] = useState(null);

  async function loadAccount() {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/token`, {
      credentials: "include",
      method: "get",
    });
    const data = await response.json();
    if (data.account) {
      setUser(data.account);
    }
  }

  async function updateLoadAccount() {
    try {
      if (user) {
        const response = await fetch(
          `${process.env.REACT_APP_API_HOST}/api/accounts/${user.email}`
        );
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchLocations());
    dispatch(fetchEvents());
    dispatch(fetchUsers());
    dispatch(fetchPets());
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
                element={<MainPage events={events} user={reduxUser} />}
              />
              <Route exact path="/signup" element={<SignupForm />}></Route>
              <Route exact path="/login" element={<LoginForm />}></Route>
              <Route path="locations">
                <Route index element={<LocationsListDetail />} />
              </Route>
              <Route path="pets">
                <Route index element={<PetsList />} />
                <Route path="create" element={<CreatePet />} />
              </Route>
              <Route path="events" element={<EventsList />}>
                <Route path="create" />
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
                      user={user}
                      loadAccount={loadAccount}
                      updateLoadAccount={updateLoadAccount}
                    />
                  }
                />
              </Route>
              <Route path="users">
                <Route index element={<FindFriend />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
Modal.setAppElement("#root");
export default App;
