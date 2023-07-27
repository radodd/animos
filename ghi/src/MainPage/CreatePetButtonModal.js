import "./MainPage.css";
import { useState } from "react";
import CreatePetButton from "../assets/images/add_pet_button.png";
import CreatePet from "../CreatePet/CreatePet";
import { useSelector } from "react-redux";

function PetButtonModal() {
  const [activeCreatePetModal, setActiveCreatePetModal] = useState(0);
  const toggleModal = () => {
    setActiveCreatePetModal(1 === activeCreatePetModal ? null : 1);
  };
  //   const locations = useSelector((state) => state.locations);
  const user = useSelector((state) => state.user);
  return (
    <>
      <div className="gedf-card">
        <div className="card-body-event-btn">
          <button
            className="card-body-event-btn btn bg-transparent"
            onClick={() => toggleModal(1)}
          >
            <img
              src={CreatePetButton}
              alt=""
              width="100%"
              onClick={() => toggleModal(1)}
            />
          </button>
        </div>
        <div
          className={` ${
            activeCreatePetModal === 1
              ? "active-modal create_event_modal"
              : "create_event_modal"
          }`}
        >
          <div className="create_event_modal-content">
            <button
              className="create_event_modal-close-button"
              onClick={() => toggleModal(0)}
            >
              X
            </button>
            {user ? <CreatePet /> : <div>Loading ...</div>}
          </div>
        </div>
      </div>
    </>
  );
}

export default PetButtonModal;
