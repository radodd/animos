import { useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { fetchLocations } from "./actions/locationActions.js";
import { fetchEvents } from "./actions/eventAction.js";
import { fetchUser, fetchUsers } from "./actions/userAction.js";
import { fetchPets } from "./actions/petAction.js";
import Modal from "react-modal";
import UsersProfilePage from "./UsersProfilePage/UsersProfilePage.js";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  const dispatch = useDispatch();

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
              <Route path="home" element={<MainPage />} />
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
              <Route path="profile/:userEmail">
                <Route index element={<ProfilePage />} />
                <Route path="all" element={<UserAccounts />} />
              </Route>
              <Route path="users">
                <Route index element={<FindFriend />} />
                <Route path=":userId" element={<UsersProfilePage />} />
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
