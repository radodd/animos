import './MainPage.css';
import { useState, useEffect } from 'react';
import CreateEventButton from '../assets/images/create_event_button.png';
import CreateEvent from '../CreateEvent/createEvent'

function EventButtonModal({ users}) {
    const [activeCreateEventModal, setActiveCreateEventModal] = useState(0);
    const toggleModal = () => {
        setActiveCreateEventModal(1 === activeCreateEventModal ? null : 1);
    };
    const [locations, setLocations] = useState([]);
    const [user, setUser] = useState(null);

    async function loadLocations() {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/api/locations/`
        );
        if (response.ok) {
            const data = await response.json();
            setLocations(data.locations);
        } else {
            console.error(response);
        }
    }

    async function loadAccount() {
    const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/token`,
        {
        credentials: 'include',
        }
    );

    const data = await response.json();
    if (data.account) {
        setUser(data.account);
    }
    }

    useEffect(() => {
        loadLocations();
        loadAccount();

    }, []);


  return (
    <>
      <div className="gedf-card">
        <div className="card-body-event-btn">
          <button
            className="card-body-event-btn btn bg-transparent"
            onClick={() => toggleModal(1)}
          >
            <img
              src={CreateEventButton}
              alt=""
              width="100%"
              onClick={() => toggleModal(1)}
            />
          </button>
        </div>
        <div
          className={` ${
            activeCreateEventModal === 1
              ? 'active-modal create_event_modal'
              : 'create_event_modal'
          }`}
        >
          <div className="create_event_modal-content">
            <button
              className="create_event_modal-close-button"
              onClick={() => toggleModal(0)}
            >
              X
            </button>
            {locations && locations.length > 0 ? (
              <CreateEvent locations={locations} user={user} users={users} />
            ) : (
              <div>Loading ...</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EventButtonModal;
