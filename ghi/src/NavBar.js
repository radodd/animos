import { useSelector } from 'react-redux';

export default function NavBar() {
    const user = useSelector((state) => state.user);
    console.log(user)
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
                        <a
                          className="nav-link"
                          aria-current="page"
                          href="/home"
                        >
                          Home
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          aria-current="page"
                          href="/events"
                        >
                          Events
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          aria-current="page"
                          href="/locations"
                        >
                          Locations
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          aria-current="page"
                            href={`/user/${user && user.id}`}
                        >
                          My Profile
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          aria-current="page"
                          href="/logout"
                        >
                          Log Out
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </header>
            </div>
          </>
        );

}
