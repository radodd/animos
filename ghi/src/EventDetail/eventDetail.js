import { useState } from 'react';

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
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                credentials: 'include',
            },
        });
        if (response.ok) {
            setIsDeleted(true);
        }
    }

    const handleAttend = async (e) => {
        const url = `${process.env.REACT_APP_API_HOST}/api/events/attend`;
        const data = {
            event_id: event.id,
            user_id: user.id,
        };

        const fetchOptions = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                credentials: 'include',
            },
        };
        await fetch(url, fetchOptions);
    };
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
            <h5>
                Start Date: {new Date(event.date_start).toLocaleDateString()} @{' '}
                {new Date(event.date_start).toLocaleTimeString()}
            </h5>
            <h5>
                End Date: {new Date(event.date_end).toLocaleDateString()} @{' '}
                {new Date(event.date_end).toLocaleTimeString()}
            </h5>
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
                        <div
                            className="alert alert-success"
                            id="success-message"
                        >
                            You've deleted your event
                        </div>
                    )}
                </div>
            )}
            {event.account_id !== user.id && (
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
