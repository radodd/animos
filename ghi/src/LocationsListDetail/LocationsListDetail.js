import { useState } from 'react';
import './LocationListDetail.css';
// import useToken from '@galvanize-inc/jwtdown-for-react';
// import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import LocationsTitle from '../../src/assets/images/locations.png'
import NavBar from '../NavBar';

function LocationsList() {
    const locations = useSelector((state) => state.locations);
    const [activeModal, setActiveModal] = useState(null);
    const toggleModal = (index) => {
        setActiveModal(index === activeModal ? null : index);
    };

    function Card() {
        return (
          <>
            <NavBar />
            {locations.map((location, index) => (
              <div className="location-card" key={location.id}>
                <div className="card-body">
                  <img
                    className="card-image"
                    width="100%"
                    src={location.picture_url}
                    alt="location"
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
                    alt="modal"
                  />
                  <h5 className="modal-title">{location.name}</h5>
                  <p className="modal-zipcode">{location.zipcode}</p>
                  <p className="modal-capacity">
                    Capacity: {location.capacity}
                  </p>
                  <p className="modal-description">{location.description}</p>
                </div>
              </div>
            ))}
          </>
        );
    }

    return (
        <>
            <br />
            <img
                className="locations-image-title"
                src={LocationsTitle}
                alt=""
                width="800px"/>
            <div className="wrapper">
                <Card />
            </div>
        </>
    );
}

export default LocationsList;
