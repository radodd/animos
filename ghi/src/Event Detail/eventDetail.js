import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function EventDetail({ event, loadEvent, location }) {
    const { id } = useParams();

    useEffect(() => {
        loadEvent(id);
    }, []);

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
                    {' '}
                    <button type="button" className="btn btn-success">
                        Attend Event
                    </button>
                </div>
            )}
        </>
    );
}
