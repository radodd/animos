export default function EventDetail({ event, location, user }) {
    const handleAttend = async (e) => {
        const url = `${process.env.REACT_APP_API_HOST}/api/events/attend/`;
        const data = {
            event_id: event.id,
            user_id: user.id,
        };

        const fetchOptions = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        await fetch(url, fetchOptions);
    };
    return (
        <>
            <h1>{event.name}</h1>
            <h2>At {location.name}</h2>
            <img
                style={{ height: 300 }}
                src={event.picture_url}
                alt="event"
            ></img>
            <h3>
                Start Date: {new Date(event.date_start).toLocaleDateString()} @{' '}
                {new Date(event.date_start).toLocaleTimeString()}
            </h3>
            <h3>
                End Date: {new Date(event.date_end).toLocaleDateString()} @{' '}
                {new Date(event.date_end).toLocaleTimeString()}
            </h3>
            <p>
                <b>Capacity:</b> {event.capacity}
            </p>
            <p>
                <b>Description:</b> {event.description}
            </p>
            {event.account_id === user.id && (
                <div>
                    <button type="button" className="btn btn-danger">
                        Delete Event
                    </button>
                    <button type="button" className="btn btn-warning">
                        Edit Event
                    </button>
                </div>
            )}
            {event.account_id != user.id && (
                <div>
                    {' '}
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
