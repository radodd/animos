import { useState, useEffect } from 'react';
import './MainPage.css';
import EventDetail from '../Event Detail/eventDetail';

function EventFeedCard({ loggedInUser }) {
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const toggleModal = (index) => {
    setActiveModal(index === activeModal ? null : index);
  };

  async function getEvents() {
    const response = await fetch('http://localhost:8000/api/events');
    if (response.ok) {
      const data = await response.json();
      setEvents(data.events);
    }
  }

  async function getLocations() {
    const response = await fetch('http://localhost:8000/api/locations/');
    if (response.ok) {
      const data = await response.json();
      setLocations(data.locations);
    }
  }

  async function loadAccounts() {
    const url = `${process.env.REACT_APP_API_HOST}/api/accounts`;
    const response = await fetch(url, {
      credentials: 'include',
      method: 'get',
    });
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    }
  }

  useEffect(() => {
    getEvents();
    getLocations();
    loadAccounts();
  }, []);

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
      <br />

      {events.map((event, index) => {
        const start_date = new Date(event.date_start).toLocaleDateString([], {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
        });
        const start_time = new Date(event.date_start).toLocaleTimeString([], {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        });

        const location = locations.find((loc) => event.location_id === loc.id);
        const locationName = location ? location.name : 'Unknown Location';
        const user = users.find((use) => event.account_id === use.id);
        const firstName = user ? user.first_name : 'Unknown User';
        const lastName = user ? user.last_name : 'Unknown User';
        const userPhoto = user
          ? user.picture_url
          : 'https://i.pinimg.com/75x75_RS/8b/6f/15/8b6f158af2606b7ed97718b983e04438.jpg';

        const eventUser = users.find((use) => event.account_id === use.id);
        const userViewer = eventUser ? eventUser : 'UnknownID';

        return (
          <div className="card gedf-card" key={event.id}>
            <div className="event-card-header">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="mr-2">
                    <img
                      className="rounded-circle"
                      width="35"
                      height="35"
                      src={userPhoto}
                      alt=""
                      style={{
                        objectFit: 'cover',
                        borderRadius: '50%',
                        borderColor: 'white',
                      }}
                    />
                  </div>
                  <div className="ml-20">
                    {/* <div className="h5 m-0">@{event.account_id}</div> */}
                    <div className="event-card-header-name">
                      {firstName} {lastName}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="event-card-body" onClick={() => toggleModal(index)}>
              <div className="event-card-container">
                <div className="row">
                  <img
                    className="col-sm event-card-image"
                    src={event.picture_url}
                    height="200px"
                    width="125px"
                    style={{ objectFit: 'cover', borderRadius: '10%' }}
                  />
                  <div className="event-details-card-body col-sm">
                    <div className="event-card-name">{event.name}</div>
                    <div className="event-card-datetime">
                      {start_date} at {start_time}
                    </div>
                    <div className="event-card-location">{locationName}</div>
                    <div className="event-card-description">
                      {event.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="event-card-footer">
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
            {activeModal === index && (
              <div
                className={`${
                  activeModal === index
                    ? 'active-modal event_modal'
                    : 'event_modal'
                }`}
                key={event.id}
              >
                <div className="event_modal-content">
                  <button
                    className="event_modal-close-button"
                    onClick={() => toggleModal(index)}
                  >
                    X
                  </button>
                  <EventDetail
                    event={event}
                    location={location}
                    user={loggedInUser}
                  />
                  {console.log(loggedInUser)}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

export default EventFeedCard;
