import { useState, useEffect } from 'react';
import './MainPage.css';
import CalendarIcon from '../assets/icons/calendar.png';
import FriendsIcon from '../assets/icons/friends.png';
import LocationsIcon from '../assets/icons/locations.png';

function LeftProfileCard() {
  const [user, setUser] = useState();

  async function loadCurrentUser() {
    const response = await fetch('http://localhost:8000/api/protected', {
      credentials: 'include',
    });
    if (response.ok) {
      const data = await response.json();
      const user = {
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        pictureUrl: data.picture_url,
      };
      setUser(user);
    } else {
      console.error('user not logged in');
    }
  }

  useEffect(() => {
    loadCurrentUser();
  }, []);

  return (
    <>
      <div className="card">
        <div className="card-body">
          {user && (
            <img
              src={user.pictureUrl}
              alt=""
              className="rounded-circle"
              width="150"
              height="150"
              style={{ objectFit: 'cover', borderRadius: '50%' }}
            />
          )}
          {user && (
            <div className="h5">
              {user.firstName} {user.lastName}
            </div>
          )}
          <div className="h6 text-muted">Username : @</div>
          <div className="h7">
            <a>Profile Page</a> | <a>Edit Profile</a>
          </div>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <div className="h6 text-muted">My pets</div>
            <img
              src="https://cdn.dribbble.com/userupload/3983353/file/original-3766d806df4ef69750d471f6fef25184.gif"
              alt=""
              className="rounded-circle"
              width="100"
              height="100"
            />
          </li>
        </ul>
      </div>
      <br />

      <div className="card">
        <div className="card-body">
          <ul className="list-group events-friends list-group-flush">
            <li className="list-group-item">
              <a href="/events">
                <img
                  className="left-main-icon"
                  src={CalendarIcon}
                  width="35px"
                  alt="calendar icon"
                />
                My Events
              </a>
            </li>
            <li className="list-group-item">
              <a href="/friends">
                <img
                  className="left-main-icon"
                  src={FriendsIcon}
                  width="35px"
                  alt="friends icon"
                />
                Friends
              </a>
            </li>
            <li className="list-group-item">
              <a href="/locations">
                <img
                  className="left-main-icon"
                  src={LocationsIcon}
                  width="35px"
                  alt="location map icon"
                />
                Locations
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default LeftProfileCard;
