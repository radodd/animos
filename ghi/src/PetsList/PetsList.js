import { useSelector } from "react-redux";
import { useState } from "react";
import "./PetsList.css";
import NavBar from "../NavBar";

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
            <div className="event-card" key={pet.id}>
              <div className="card-body">
                <div className="card-title">{pet.pet_name}</div>
                <img
                  className="card-image"
                  src={pet.pet_picture_url}
                  alt="list pets"
                ></img>
                <div className="card-breed">{pet.breed}</div>
                <div className="card-vibe">{pet.vibe}</div>
                <div className="card-size">{pet.size}</div>
                <div className="card-birthday">{pet.birth_adoption_date}</div>
                <button
                  className="card-button"
                  onClick={() => {
                    handleDelete(pet.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        {isDeleted === true && (
          <div className="alert alert-success" id="success-message">
            You've deleted your event
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <br />
      <h1>Test Pet Cards</h1>
      <a className="nav-link" aria-current="page" href="pets/create">
        Add a new Pet!
      </a>
      <div className="wrapper">
        <Card />
      </div>
    </>
  );
}
export default PetsList;
