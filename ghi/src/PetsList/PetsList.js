import { useSelector } from "react-redux";
import { useState } from "react";
import "./PetsList.css";
import NavBar from "../NavBar";
import AddPetButton from "../assets/images/add_pet_button.png";
import { Link } from "react-router-dom";

function PetsList({ pet }) {
  const pets = useSelector((state) => state.pets);
  const user = useSelector((state) => state.user);
  const userPets = pets.filter((pet) => pet.user_id === user.id);
  const [isDeleted, setIsDeleted] = useState(false);

  async function handleDelete(id) {
    const url = `${process.env.REACT_APP_API_HOST}/api/pets/${id}`;
    const data = {
      pet_id: pets.id,
      user_id: user.id,
    };
    const response = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      setIsDeleted(true);
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
              </div>
            </div>
          );
        })}
        {isDeleted === true && (
          <div className="alert alert-success" id="success-message">
            You removed a pet from your profile
          </div>
        )}
      </div>
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
    </>
  );
}
export default PetsList;
