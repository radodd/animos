import { useState } from "react";

export default function EventDetail({ event, location, user }) {
  const [isDeleted, setIsDeleted] = useState(false);
  //  comment for change for push
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
      },
    });
    if (response.ok) {
      setIsDeleted(true);
    }
  }

  const handleAttend = async (e) => {
    const url = `${process.env.REACT_APP_API_HOST}/api/events/attend/`;
    const data = {
      event_id: event.id,
      user_id: user.id,
    };

    const fetchOptions = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch(url, fetchOptions);
  };
  return (
    <>
      <h1>{event.name}</h1>
      <h2>At {location.name}</h2>
      <img style={{ height: 300 }} src={event.picture_url} alt="event"></img>
      <h3>
        Start Date: {new Date(event.date_start).toLocaleDateString()} @{" "}
        {new Date(event.date_start).toLocaleTimeString()}
      </h3>
      <h3>
        End Date: {new Date(event.date_end).toLocaleDateString()} @{" "}
        {new Date(event.date_end).toLocaleTimeString()}
      </h3>
      <p>
        <b>Capacity:</b> {event.capacity}
      </p>
      <p>
        <b>Description:</b> {event.description}
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
          <button type="button" className="btn btn-warning">
            Edit Event
          </button>
          {isDeleted === true && (
            <div className="alert alert-success" id="success-message">
              You've deleted your event
            </div>
          )}
        </div>
      )}
      {event.account_id != user.id && (
        <div>
          {" "}
          <button
            type="button"
            className="btn btn-success"
            onClick={handleAttend}
          >
            Attend Event
          </button>
        </div>
      )}
    </>
  );
}
