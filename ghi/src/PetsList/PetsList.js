import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import "./PetsList.css";
import NavBar from "../NavBar";
import AddPetButton from "../assets/images/add_pet_button.png";
import MyPets from '../assets/images/my_pets.png';
import { Link } from "react-router-dom";
import { fetchPets } from "../actions/petAction";

function PetsList() {
  const pets = useSelector((state) => state.pets);
  const user = useSelector((state) => state.user);
  const userPets = pets.filter((pet) => pet.user_id === user.id);
  const [isDeleted, setIsDeleted] = useState(false);

  const dispatch = useDispatch();

  async function handleDelete(id) {
    const confirmDelete = window.confirm("You sure bruh?");
    if (confirmDelete) {
      const url = `${process.env.REACT_APP_API_HOST}/api/pets/${id}`;
      const data = {
        pet_id: id,
        user_id: user.id,
      };

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
      <>
        {userPets.map((pet, index) => {
          return (
            <div className="pet-card" key={pet.id}>
              <div className="pet-card-body">
                <h4 className="pet-card-title">{pet.pet_name}</h4>
                <img
                  className="pet-card-image"
                  src={pet.pet_picture_url}
                  alt="list pets"
                  style={{ objectFit: 'cover' }}
                  height="200px"
                  width="300px"
                ></img>
                <div className="size-vibe-breed">
                  {pet.breed} | {pet.size} | {pet.vibe}
                </div>
                <div className="pet-card-birthday">
                  🎂: {pet.birth_adoption_date}
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
      </>
    );
  }

  return (
    <>
      <NavBar />
      <br />
      <div className="image-title-holder">
        <img
          className="pets-image-title"
          src={MyPets}
          alt=""
          width="500px"
          height="100px"
        />
      </div>
      <br />
      <div className="add-pet-button-holder">
        <Link className="nav-link" aria-current="page" to="create">
          <img
            className="add-pet-button"
            src={AddPetButton}
            width="200"
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
