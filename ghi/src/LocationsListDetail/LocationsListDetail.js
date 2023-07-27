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
            {locations.map((location, index) => (
              <div className="location-card" key={location.id}>
                <div className="location-card-body">
                  <img
                    className="location-card-image"
                    height="200px"
                    src={location.picture_url}
                    style={{objectFit:"cover"}}
                    alt="location"
                  />
                  <h5 className="location-card-title">{location.name}</h5>
                  <button
                    className="location-card-button"
                    onClick={() => toggleModal(index)}
                  >
                    View Details
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
                    className="location-modal-image"
                    height="300"
                    width="415"
                    src={location.picture_url}
                    alt="modal"
                    style={{ objectFit: 'cover' }}
                  />
                  <h5 className="location-modal-title">{location.name}</h5>
                  <p className="location-modal-zipcode">{location.zipcode}</p>
                  <p className="location-modal-capacity">
                    Capacity: {location.capacity}
                  </p>
                  <p className="location-modal-description">
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
        <NavBar />
        <br />
        <div className="image-title-holder">
          <img
            className="locations-image-title"
            src={LocationsTitle}
            alt=""
            width="800px"
          />
        </div>
        <div className="wrapper">
          <Card />
        </div>
      </>
    );
}

export default LocationsList;
