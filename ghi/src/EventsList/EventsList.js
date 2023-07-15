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
          let locationName;
          props.locations.map((location) => {
            if (event.location_id === location.id) {
              locationName = location.name;
            }
          });

          return (
            <div className="event" key={event.id}>
              <div className="event-name">{event.name}</div>
              <img className="picture-url" src={event.picture_url}></img>
              <div className="event-date-start">date: {date}</div>
              <div className="event-date-start">start time: {time}</div>
              <div className="event-location">
                This event is happening at {locationName}
              </div>
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
