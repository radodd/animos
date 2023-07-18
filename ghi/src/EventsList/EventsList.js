import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./EventsList.css";
import EventDetail from "../Event Detail/eventDetail.js";

function EventsList(props) {
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
            });

            return (
              <div className="event-card" key={event.id}>
                <div className="card-title">{event.name}</div>
                <img className="card-image" src={event.picture_url}></img>
                <div className="card-date-start">Date: {date}</div>
                <div className="card-time-start">Start time: {time}</div>
                <div className="card-location">Where: {locationName}</div>
                <button
                  className="card-button"
                  onClick={() => toggleModal(index)}
                >
                  Event Details
                </button>
              </div>
            );
          })}
          {props.events.map((event, index) => {
            const date = new Date(event.date_start).toLocaleDateString();
            const time = new Date(event.date_start).toLocaleTimeString();
            let locationName;
            props.locations.map((location) => {
              if (event.location_id === location.id) {
                locationName = location.name;
              }
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
                <div className="modal-title">{event.name}</div>
                <img className="modal-image" src={event.picture_url}></img>
                <div className="modal-date-start">date: {date}</div>
                <div className="modal-time-start">start time: {time}</div>
                <div className="modal-location">
                  This event is happening at {locationName}
                </div>
                <p className="modal-description">{event.description}</p>
                {event.is_owner === true && (
                  <div>
                    <button type="button" className="btn btn-danger">
                      Delete Event
                    </button>
                    <button type="button" className="btn btn-warning">
                      Edit Event
                    </button>
                  </div>
                )}
                {event.is_owner === false && (
                  <div>
                    {" "}
                    <button type="button" className="btn btn-success">
                      Attend Event
                    </button>
                  </div>
                )}
                <button
                  type="button"
                  className="modal-button"
                  onClick={() => toggleModal(index)}
                >
                  Close
                </button>
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
