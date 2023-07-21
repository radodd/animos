import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./EventsList.css";
import EventDetail from "../Event Detail/eventDetail.js";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

function EventsList(props) {
  const { token } = useToken();
  const navigate = useNavigate();
  if (!token) {
    navigate("/");
  }

  const [activeModal, setActiveModal] = useState(null);
  const toggleModal = (index) => {
    setActiveModal(index === activeModal ? null : index);
  };
  function Card() {
    return (
      <>
        <div className="events-list">
          {props.events.map((event, index) => {
            const date = new Date(event.date_start).toLocaleDateString();
            const time = new Date(event.date_start).toLocaleTimeString();
            let locationName;
            props.locations.map((location) => {
              if (event.location_id === location.id) {
                locationName = location.name;
              }
              return locationName;
            });

            return (
              <div className="event-card" key={event.id}>
                <div className="card-body">
                  <div className="card-title">{event.name}</div>
                  <img
                    className="card-image"
                    src={event.picture_url}
                    alt="event"
                  ></img>
                  <div className="card-date-start">Date: {date}</div>
                  <div className="card-time-start">Start time: {time}</div>
                  <div className="card-location">Where: {locationName}</div>
                  <div className="card-description">{event.description}</div>
                  <button
                    className="card-button"
                    onClick={() => {
                      toggleModal(index);
                    }}
                  >
                    Event Details
                  </button>
                </div>
              </div>
            );
          })}
          {props.events.map((event, index) => {
            let curLocation;
            props.locations.map((location) => {
              if (event.location_id === location.id) {
                curLocation = location;
              }
              return curLocation;
            });

            return (
              <div
                key={event.id}
                className={`${
                  activeModal === index
                    ? "active-modal event_modal"
                    : "event_modal"
                }`}
              >
                <div className="card_modal-content">
                  <EventDetail
                    event={event}
                    location={curLocation}
                    user={props.user}
                  />
                  <button
                    className="modal-button"
                    onClick={() => {
                      toggleModal(index);
                      props.getEvents();
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <>
      <h1>Events Happening</h1>
      <NavLink type="button" to="/events/create">
        Create Event
      </NavLink>
      <div className="wrapper">
        <Card />
      </div>
    </>
  );
}

export default EventsList;
