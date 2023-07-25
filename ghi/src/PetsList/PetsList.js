import { useSelector, useDispatch } from "react-redux";
import "./PetsList.css";
import { removePet } from "../slices/petsSlice";

function PetsList() {
  const pets = useSelector((state) => state.pets);
  const user = useSelector((state) => state.user);
  const userPets = pets.filter((pet) => pet.user_id === user.id);
  const dispatch = useDispatch();


  function Card() {
    return (
      <div className="pets-list">
        {userPets.map((pet, index) => {
          console.log("MY PET INFO", pet.id);
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
                    dispatch(removePet(pet.id));
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <h1>Test Pet Cards</h1>
      <div className="wrapper">
        <Card />
      </div>
    </>
  );
}
export default PetsList;
