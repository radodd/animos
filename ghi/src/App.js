import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
// import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Landing Page/LandingPage.js";
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
            </Routes>
          </div>
          {/* <ErrorNotification error={error} />
        <Construct info={launchInfo} /> */}
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
