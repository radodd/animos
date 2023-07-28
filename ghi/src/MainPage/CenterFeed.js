import { useState } from 'react';
import './MainPage.css';
import EventDetail from '../EventDetail/eventDetail';
import { useSelector } from 'react-redux';

function EventFeedCard() {
    const events = useSelector((state) => state.events);
    const locations = useSelector((state) => state.locations);
    const users = useSelector((state) => state.users);
    const loggedInUser = useSelector((state) => state.user);

    const [activeModal, setActiveModal] = useState(null);
    const toggleModal = (index) => {
        setActiveModal(index === activeModal ? null : index);
    };

    return (
        <>
            <br />

            {events.map((event, index) => {
                const start_date = new Date(
                    event.date_start
                ).toLocaleDateString([], {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                });
                const start_time = new Date(
                    event.date_start
                ).toLocaleTimeString([], {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                });

                const location = locations.find(
                    (loc) => event.location_id === loc.id
                );
                const locationName = location
                    ? location.name
                    : 'Unknown Location';
                const user = users.find((use) => event.account_id === use.id);
                const firstName = user ? user.first_name : 'Unknown User';
                const lastName = user ? user.last_name : 'Unknown User';
                const userPhoto = user
                    ? user.picture_url
                    : 'https://i.pinimg.com/75x75_RS/8b/6f/15/8b6f158af2606b7ed97718b983e04438.jpg';

                return (
                    <div className="card gedf-card" key={event.id}>
                        <div className="event-card-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="mr-2">
                                        <img
                                            className="rounded-circle"
                                            width="35"
                                            height="35"
                                            src={userPhoto}
                                            alt=""
                                            style={{
                                                objectFit: 'cover',
                                                borderRadius: '50%',
                                                borderColor: 'white',
                                            }}
                                        />
                                    </div>
                                    <div className="ml-20">
                                        <div className="event-card-header-name">
                                            {firstName} {lastName}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="event-card-body"
                            onClick={() => toggleModal(index)}
                        >
                            <div className="event-card-container">
                                <div className="row">
                                    <img
                                        className="col-sm event-card-image"
                                        src={event.picture_url}
                                        height="200px"
                                        width="125px"
                                        alt=""
                                        style={{
                                            objectFit: 'cover',
                                            borderRadius: '10%',
                                        }}
                                    />
                                    <div className="event-details-card-body col-sm">
                                        <div className="event-card-name">
                                            {event.name}
                                        </div>
                                        <div className="event-card-datetime">
                                            {start_date} at {start_time}
                                        </div>
                                        <div className="event-card-location">
                                            {locationName}
                                        </div>
                                        <div className="event-card-description">
                                            {event.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {activeModal === index && (
                            <div
                                className={`${
                                    activeModal === index
                                        ? 'active-modal event_modal'
                                        : 'event_modal'
                                }`}
                                key={event.id}
                            >
                                <div className="event_modal-content">
                                    <button
                                        className="event_modal-close-button"
                                        onClick={() => toggleModal(index)}
                                    >
                                        X
                                    </button>
                                    <EventDetail
                                        event={event}
                                        location={location}
                                        user={loggedInUser}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </>
    );
}

export default EventFeedCard;
