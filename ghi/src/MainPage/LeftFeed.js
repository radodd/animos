import "./MainPage.css";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import CalendarIcon from "../assets/icons/calendar.png";
import FriendsIcon from "../assets/icons/friends.png";
import LocationsIcon from "../assets/icons/locations.png";

function LeftFeed() {
    const user = useSelector((state) => state.user);
    const pets = useSelector((state) => state.pets);
    const userPets = pets.filter((pet) => pet.user_id === user.id);

  function ProfileCard() {
    return (
      <>
        <div className="card home-profile-card">
          <div className="card-body">
            <img
              src={user.picture_url}
              alt=""
              className="rounded-circle profile-card-image"
              width="150"
              height="150"
              style={{ objectFit: 'cover', borderRadius: '50%' }}
            />

            {user && (
              <div className="h5" key={user.id}>
                {user.first_name} {user.last_name}
              </div>
            )}

            <div className="h7 home-profile-card-links">
              <Link to={`/users/${user.id}`}>Profile Page</Link> |{' '}
              <Link to="/profile">Edit Profile</Link>
            </div>
          </div>
        </div>
        <br/>
        <div className="card home-pets-card">
          <h5 className="my-pets-title">
            <Link to="/pets" className="card-my-pets-title">
              My Pets
            </Link>
          </h5>
          <div className="card-body row row-cols-3">
            <br />
            {userPets.map((pets) => {
              return (
                <>
                  <div
                    className="card align-items-center"
                    style={{ width: 'fit', border: 'none' }}
                  >
                    <img
                      className="rounded-circle "
                      src={pets.pet_picture_url}
                      alt=""
                      width="50"
                      height="50"
                      key={pets.id}
                      style={{ objectFit: 'cover' }}
                    />
                    <p className="card-text">{pets.pet_name}</p>
                  </div>
                </>
              );
            })}

            <br />
          </div>
        </div>
      </>
    );
    }

    function MyLinksCard() {
        return (
            <div className="card">
                <div className="card-body">
                    <ul className="list-group events-friends list-group-flush">
                        <li className="list-group-item" key="events">
                            <Link to="/events">
                                <img
                                    className="left-main-icon"
                                    src={CalendarIcon}
                                    width="35px"
                                    alt="calendar"
                                />
                                My Events
                            </Link>
                        </li>
                        <li className="list-group-item" key="friends">
                            <Link to="/friends">
                                <img
                                    className="left-main-icon"
                                    src={FriendsIcon}
                                    width="35px"
                                    alt="friends icon"
                                />
                                Friends
                            </Link>
                        </li>
                        <li className="list-group-item" key="location">
                            <Link to="/locations">
                                <img
                                    className="left-main-icon"
                                    src={LocationsIcon}
                                    width="35px"
                                    alt="Location icon"
                                />
                                Locations
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

    return (
      <>
        <ProfileCard />
        <br />
        <MyLinksCard />
      </>
    );
}

export default LeftFeed;
