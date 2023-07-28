import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import "./PetsList.css";
import NavBar from "../NavBar";
import AddPetButton from "../assets/images/add_pet_button.png";
import { Link } from "react-router-dom";
import { fetchPets } from "../actions/petAction";
import Modal from "react-modal";

function PetsList() {
  const pets = useSelector((state) => state.pets);
  const user = useSelector((state) => state.user);
  const userPets = pets.filter((pet) => pet.user_id === user.id);
  const [isDeleted, setIsDeleted] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [formData, setFormData] = useState({});
  console.log("user in pets list:", user);
  console.log("pets in pet list", pets);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    Modal.setAppElement("#root");
  };

  async function handleEdit(id) {
    const url = `${process.env.REACT_APP_API_HOST}/api/pets/${id}`;
    const data = {
      pet_id: id,
      user_id: user.id,
      pet_name: formData.pet_name,
    };
    console.log("pet id", data);
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
    });
    console.log("the response", response);
    if (response.ok) {
      setEditModalOpen(false);
      dispatch(fetchPets());
    }
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("You sure bruh?");
    if (confirmDelete) {
      const url = `${process.env.REACT_APP_API_HOST}/api/pets/${id}`;
      const data = {
        pet_id: id,
        user_id: user.id,
      };
      console.log("pet id", id);
      const response = await fetch(url, {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
      });
      if (response.ok) {
        setIsDeleted(true);
        dispatch(fetchPets());
      }
    }
  }

  function Card() {
    return (
      <div className="pets-list">
        {userPets.map((pet, index) => {
          return (
            <div className="pet-card" key={pet.id}>
              <div className="pet-card-body">
                <h5 className="pet-card-title">{pet.pet_name}</h5>
                <img
                  className="pet-card-image"
                  src={pet.pet_picture_url}
                  alt="list pets"
                  style={{ objectFit: "cover" }}
                  height="200px"
                  width="300px"
                ></img>
                <div className="pet-card-breed">{pet.breed}</div>
                <div className="pet-card-vibe">{pet.vibe}</div>
                <div className="pet-card-size">{pet.size}</div>
                <div className="pet-card-birthday">
                  {pet.birth_adoption_date}
                </div>
                <button
                  className="pet-card-button"
                  onClick={() => {
                    handleDelete(pet.id);
                  }}
                >
                  Remove
                </button>

                <button
                  className="pet-card-button"
                  onClick={() => {
                    setEditModalOpen(true);
                    setSelectedPet(pet);
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })}

        {isDeleted === true && userPets.length > 0 && (
          <div className="alert alert-success" id="success-message">
            You removed a pet :(
          </div>
        )}
        {isDeleted === true && userPets.length === 0 && (
          <div className="alert alert-success" id="success-message">
            Zero pets are in your profile :(((
          </div>
        )}
      </div>
    );
  }

  function EditModal() {
    if (!selectedPet) {
      return null;
    }
    return (
      <>
        <Modal
          isOpen={editModalOpen}
          onRequestClose={() => setEditModalOpen(false)}
        >
          <h2>Edit Pet</h2>

          <form onSubmit={handleEdit}>
            <label>
              Pet Name:
              <input
                type="text"
                name="pet_name"
                value={selectedPet.pet_name}
                onChange={handleInputChange}
                placeholder={selectedPet.pet_name}
              />
            </label>
            <button type="submit">Save Your Changes</button>
          </form>
        </Modal>
      </>
    );
  }
  return (
    <>
      <NavBar />
      <br />
      <h1>My Pets</h1>
      <br />
      <div className="add-pet-button-holder">
        <Link className="nav-link" aria-current="page" to="create">
          <img
            className="add-pet-button"
            src={AddPetButton}
            width="300"
            alt=""
          />
        </Link>
      </div>
      <div className="wrapper">
        <Card />
      </div>
      <div>
        <EditModal />
      </div>
    </>
  );
}
export default PetsList;
