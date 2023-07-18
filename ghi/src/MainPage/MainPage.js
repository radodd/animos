import {useState, useEffect} from 'react'
import './MainPage.css';
import AdoptionAd from '../assets/images/animal-adoption-ad.png';
import CreateEventButton from '../assets/images/create_event_button.png'
import CalendarIcon from '../assets/icons/calendar.png'
import FriendsIcon from '../assets/icons/friends.png';
import LocationsIcon from '../assets/icons/locations.png'

// Left Feed
function LeftProfileCard () {
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

    useEffect(()=>{
        loadCurrentUser();
    },[])


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
            <div className="h7">Profile Page | Edit Profile</div>
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

// Center Feed
function EventFeedCard() {
    const [events, setEvents] = useState([]);
    const [locations, setLocations] = useState([]);

    async function getEvents() {
      const response = await fetch('http://localhost:8000/api/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data.events);
      }
    }

    async function getLocations() {
        const response = await fetch('http://localhost:8000/api/locations/');
        if (response.ok){
            const data = await response.json();
            setLocations(data.locations);
        }
    }


    useEffect(()=>{
        getEvents();
        getLocations();
    }, [])


    return (
      <>
        <div class="dropdown">
          <button
            class="btn btn-secondary btn-sm dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Sort by
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#">
              Top post
            </a>
            <a class="dropdown-item" href="#">
              Upcoming
            </a>
            <a class="dropdown-item" href="#">
              Recent activity
            </a>
          </div>
        </div>
        <br/>

        {events.map((event) => {
          const start_datetime = new Date(event.date_start).toLocaleTimeString(
            [],
            {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            }
          );

        const location = locations.find((loc) => event.location_id === loc.id);
        const locationName = location ? location.name : 'Unknown Location';


          return (
            <div className="card gedf-card" key={event.id}>
              <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="mr-2">
                      <img
                        className="rounded-circle"
                        width="45"
                        src="https://picsum.photos/50/50"
                        alt=""
                      />
                    </div>
                    <div className="ml-2">
                      <div className="h5 m-0">@{event.account_id}</div>
                      <div className="h7 text-muted">FirstName LastName</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <img src={event.picture_url} width="100px" />
                <h5>{event.name}</h5>
                <h6>
                  {start_datetime}
                </h6>
                <h6>{locationName}</h6>
                <p className="card-text">{event.description}</p>
              </div>
              <div className="card-footer">
                <a href="#" className="card-link">
                  <i className="fa fa-gittip"></i>Like
                </a>
                <a href="#" className="card-link">
                  <i className="fa fa-comment"></i>Comment
                </a>
                <a href="#" className="card-link">
                  <i className="fa fa-mail-forward"></i>Share
                </a>
              </div>
            </div>
          );
        })}
      </>
    );
}

// Right Feed
function NewFriendsCard() {
    const [user, setUser] = useState(null);

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
        };
        setUser(user);
        } else {
        console.error('user not logged in');
        }
    }

    useEffect(()=> {
        loadCurrentUser();
    }, [])

    return (
      <div className="card gedf-card right-card">
        <div className="card-body">
          <h5 className="card-subtitle">Sniff out new friends</h5>
          <br />
          <img
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZW5rZDZudDk4cnQ2NjhrbTNmNmVwMzRmZXYxNzl3eXBqdDVwM3lkayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ICOgUNjpvO0PC/giphy.gif"
            alt=""
            className="rounded-circle"
            width="50"
            height="50"
          />
          <br />
          <a href="/users" className="card-link float-right">
            View more
          </a>
        </div>
      </div>
    );
}

function UpcomingEventsCard() {
    const [events, setEvents] = useState([]);

    async function getEvents() {
      const response = await fetch('http://localhost:8000/api/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data.events);
      }
    }

    useEffect(() => {
      getEvents();
    }, []);

    return (
      <>
        <div className="card gedf-card right-card">
          <div className="card-body">
            <h5 className="card-subtitle">Upcoming Events</h5>
            <p className="card-subtitle text-muted">
              Check out events near you
            </p>
            <br />
            {events.slice(0,3).map((event) => {
              return (
                <img
                  className="rounded mx-1"
                  width="auto"
                  height="75"
                  src={event.picture_url}
                  alt=""
                />
              );
            })}
            <br />

            <a href="/events" className="card-link">
              View more
            </a>
          </div>
        </div>
      </>
    );
}






function MainPage() {
  return (
    <>
      <h3>NavBar Placeholder</h3>
      <div className="container gedf-wrapper">
        <div className="row">
          {/* MAIN PAGE - LEFT SIDE: PROFILE / FRIENDS LIST / LOCATIONS */}
          <div className="col-md-3">
            <LeftProfileCard />
          </div>

          {/* MAIN PAGE - CENTER: CREATE EVENT & EVENT FEED */}
          <div className="col-md-6 gedf-main">
            <div className="gedf-card">
              <div className="card-body-event-btn">
                <a
                  href="/events/create"
                  className="create-event-btn"
                  target="_blank"
                >
                  <img src={CreateEventButton} alt="" width="100%" />
                </a>
              </div>
              <hr />
            </div>
            <EventFeedCard />
          </div>

          {/* MAIN PAGE - RIGHT SIDE: ADS / ADD USERS / EVENTS */}
          <div className="col-md-3">
            <NewFriendsCard />
            <UpcomingEventsCard />

            <div className="gedf-card">
              <div className="card-body">
                <a
                  href="https://www.humanesociety.org/"
                  className="sponsored-ad "
                  target="_blank"
                >
                  <img
                    className="rounded"
                    src={AdoptionAd}
                    alt=""
                    width="100%"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
