import "./LandingPage.css";
import LandingPageNav from "./LandingPageNav.js";
import Logo from "../assets/images/animoslogo.png";

function LandingPage() {
  return (
    <>
      <LandingPageNav />
      <div className="container">
        <h1>Test H1</h1>
        <h2>Test H2</h2>
        <img className="logo" src={Logo}></img>
        <h3>Test H3</h3>
      </div>
    </>
  );
}
export default LandingPage;
