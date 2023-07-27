import { useState } from 'react';
import './EventsList.css';
import EventDetail from '../EventDetail/eventDetail.js';
// import useToken from "@galvanize-inc/jwtdown-for-react";
// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '../actions/eventAction.js';
import NavBar from '../NavBar';
import DiscoverEvents from '../../src/assets/images/discover_events.png';
import EventButtonModal from '../MainPage/CreateEventButtonModal.js';

function EventsList() {
  const events = useSelector((state) => state.events);
  const locations = useSelector((state) => state.locations);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const { token } = useToken();
  // const navigate = useNavigate();
  // if (!token) {
  //     navigate('/');
  // }

  const [activeModal, setActiveModal] = useState(null);
  const toggleModal = (index) => {
    setActiveModal(index === activeModal ? null : index);
  };
  function Card() {
    return (
      <>
        {events.map((event, index) => {
          const date = new Date(event.date_start).toLocaleDateString();
          const time = new Date(event.date_start).toLocaleTimeString();
          let locationName;
          locations.map((location) => {
            if (event.location_id === location.id) {
              locationName = location.name;
            }
            return locationName;
          });

          return (
            <div className="event-card" key={event.id}>
              <img
                className="event-card-image"
                height="200px"
                src={event.picture_url}
                style={{ objectFit: 'cover' }}
                alt="event"
              ></img>
              <div className="event-card-body">
                <h5 className="event-card-title">{event.name}</h5>
                <h6 className="event-card-location">{locationName}</h6>
                <div className="event-card-date-start">Date: {date}</div>
                <div className="event-card-time-start">Start time: {time}</div>
                <button
                  className="event-card-button"
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
        {events.map((event, index) => {
          let curLocation;
          locations.map((location) => {
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
                  ? 'active-modal event_modal'
                  : 'event_modal'
              }`}
            >
              <div className="event_modal-content">
                <EventDetail event={event} location={curLocation} user={user} />
                <button
                  className="event-modal-button create_event_modal-close-button"
                  onClick={() => {
                    toggleModal(index);
                    dispatch(fetchEvents());
                  }}
                >
                  X
                </button>
              </div>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <>
      <NavBar />
      <br />
      <br/>
      <div className="image-title-holder">
      <img src={DiscoverEvents} width="600px" alt="" />
      </div>
      <br />
      <div className="event-button-holder">
        <button
          type="button"
          className="event-list-create-btn btn bg-transparent"
        >
          {events && events.length > 0 ? (
            <EventButtonModal />
          ) : (
            <div>Loading ...</div>
          )}
        </button>
      </div>
      <div className="event-wrapper">
        <Card />
      </div>
    </>
  );
}

export default EventsList;
