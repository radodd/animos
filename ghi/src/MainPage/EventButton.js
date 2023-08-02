import './MainPage.css';
import { useState } from 'react';
import SimpleCreateEventButton from '../assets/images/simple_create_event_btn.png';
import CreateEvent from '../CreateEvent/createEvent';
import { useSelector } from 'react-redux';

function EventButtonModal() {
    const [activeCreateEventModal, setActiveCreateEventModal] = useState(0);
    const toggleModal = () => {
        setActiveCreateEventModal(1 === activeCreateEventModal ? null : 1);
    };
    const locations = useSelector((state) => state.locations);

    return (
      <>
        <div className="gedf-card">
          <div className="card-body-event-btn">
            <button
              className="card-body-event-btn btn bg-transparent"
              onClick={() => toggleModal(1)}
            >
              <img
                src={SimpleCreateEventButton}
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
                <CreateEvent />
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
