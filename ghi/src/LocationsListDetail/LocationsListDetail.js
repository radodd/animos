import { useState } from 'react';
import './LocationListDetail.css';

function LocationsList({ locations }) {
    const [activeModal, setActiveModal] = useState(null);
    const toggleModal = (index) => {
        setActiveModal(index === activeModal ? null : index);
    };

    function Card() {
        return (
            <>
                {locations.map((location, index) => (
                    <div className="location-card" key={location.id}>
                        <div className="card-body">
                            <img
                                className="card-image"
                                width="100%"
                                src={location.picture_url}
                            />
                            <h5 className="card-title">{location.name}</h5>
                            <button
                                className="card-button"
                                onClick={() => toggleModal(index)}
                            >
                                View details
                            </button>
                        </div>
                    </div>
                ))}
                {locations.map((location, index) => (
                    <div
                        className={` ${
                            activeModal === index
                                ? 'active-modal location_modal'
                                : 'location_modal'
                        }`}
                        key={location.id}
                    >
                        <div className="location_modal-content">
                            <button
                                className="location_modal-close-button"
                                onClick={() => toggleModal(index)}
                            >
                                X
                            </button>
                            <img
                                className="modal-image"
                                width="100%"
                                src={location.picture_url}
                            />
                            <h5 className="modal-title">{location.name}</h5>
                            <p className="modal-zipcode">{location.zipcode}</p>
                            <p className="modal-capacity">
                                Capacity: {location.capacity}
                            </p>
                            <p className="modal-description">
                                {location.description}
                            </p>
                        </div>
                    </div>
                ))}
            </>
        );
    }

    return (
        <>
            <h1>Placeholder for NavBar</h1>
            <h1> Pet Furiendly Locations 🐾</h1>
            <div className="wrapper">
                <Card />
            </div>
        </>
    );
}

export default LocationsList;
