import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from ".//actions/userAction";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

export default function NavBar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { logout } = useToken();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout()
      .then(() => {
        setTimeout(() => {
          dispatch(fetchUser());
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };
  return (
    <>
      <div className="container-nav">
        <header className="header">
          <nav className="navbar navbar-expand navbar-light">
            <h2> Welcome {user && user.first_name}</h2>
            <button
              className="navbar-toggler ms-auto"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/events">
                    Events
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to="/locations"
                  >
                    Locations
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to={`/profile/${user && user.email}`}
                  >
                    My Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    onClick={handleLogout}
                  >
                    Log Out
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
}
