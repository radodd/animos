import { NavLink } from "react-router-dom";

function EventsList(props) {
  return (
    <>
      <h1>Events Happening</h1>
      <NavLink type="button" to="/events/create">
        Create Event
      </NavLink>
      <div className="events-List">
        {props.events.map((event) => {
          const date = new Date(event.date_start).toLocaleDateString();
          const time = new Date(event.date_start).toLocaleTimeString();

          return (
            <div className="event" key={event.id}>
              <div className="event-name">{event.name}</div>
              <div className="picture-url">{event.picture_url}</div>
              <div className="event-date-start">date: {date}</div>
              <div className="event-date-start">start time: {time}</div>
              <div className="event-location">location {event.location_id}</div>
              <div className="event-description">{event.description}</div>
              <NavLink type="button" to={`/events/${event.id}`}>
                Event Details
              </NavLink>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default EventsList;
