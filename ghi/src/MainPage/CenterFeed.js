import { useState, useEffect } from 'react';
import './MainPage.css';

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
    if (response.ok) {
      const data = await response.json();
      setLocations(data.locations);
    }
  }

  useEffect(() => {
    getEvents();
    getLocations();
  }, []);

  return (
    <>
      <div className="dropdown">
        <button
          className="btn btn-secondary btn-sm dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Sort by
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#">
            Top post
          </a>
          <a className="dropdown-item" href="#">
            Upcoming
          </a>
          <a className="dropdown-item" href="#">
            Recent activity
          </a>
        </div>
      </div>
      <br />

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
              <h6>{start_datetime}</h6>
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

export default EventFeedCard;
