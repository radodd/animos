import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEvents } from "../actions/eventAction.js";

export default function EventDetail({ event, location }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  async function deleteEvent(id) {
    const url = `${process.env.REACT_APP_API_HOST}/api/events/${id}`;
    const data = {
      event_id: event.id,
      user_id: user.id,
    };

    const response = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
    });
    if (response.ok) {
      dispatch(fetchEvents());
      setIsDeleted(true);
    }
  }

  return (
    <>
      <div className="event-modal-title">
        <h2>{event.name}</h2>
        <h5>at {location.name}</h5>
      </div>
      <img
        className="event-modal-image"
        style={{ objectFit: 'cover' }}
        height="300"
        width="415"
        src={event.picture_url}
        alt="event"
      ></img>
      <div className="event-modal-description"></div>
      <h6>
        Start Date: {new Date(event.date_start).toLocaleDateString()} at{' '}
        {new Date(event.date_start).toLocaleTimeString([], {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })}
      </h6>
      <h6>
        End Date: {new Date(event.date_end).toLocaleDateString()} at{' '}
        {new Date(event.date_end).toLocaleTimeString([], {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })}
      </h6>
      <p>
       Capacity: {event.capacity}
      </p>
      <p>
        Description: {event.description}
      </p>
      {user && user.id && event.account_id === user.id && (
        <div>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              deleteEvent(event.id);
            }}
          >
            Delete Event
          </button>
          {isDeleted === true && (
            <div className="alert alert-success" id="success-message">
              You've deleted your event
            </div>
          )}
        </div>
      )}
    </>
  );
}
