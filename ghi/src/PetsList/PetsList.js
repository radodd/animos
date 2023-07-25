import { NavLink } from "react-router-dom";
import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./PetsList.css";
import { fetchPets } from "../actions/petAction";
import { removePet } from "../slices/petsSlice";

function PetsList() {
  const pets = useSelector((state) => state.pets);
  const user = useSelector((state) => state.user);
  const userPets = pets.filter((pet) => pet.user_id === user.id);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(removePet(id));
  };

  // const { token } = useToken();
  // const navigate = useNavigate();
  // if (!token) {
  //     navigate('/');
  // }
  const [activeModal, setActiveModal] = useState(null);
  const toggleModal = (index) => {
    setActiveModal(index === activeModal ? null : index);
  };

  // const fetchData = async () => {
  //     const url = 'http://localhost:8000/api/pets';
  //     const response = await fetch(url);

  //     if (response.ok) {
  //         const data = await response.json();
  //         setPet(data.pets);
  //     }
  // };
  // useEffect(() => {
  //     fetchData();
  // }, []);

  // const handleDelete = async (event) => {
  //     const petsUrl = `http://localhost:8000/api/pets/${event}/`;
  //     const fetchConfig = {
  //         method: 'delete',
  //     };
  //     const response = await fetch(petsUrl, fetchConfig);
  //     if (response.ok) {
  //         console.log(response.deleted, response.breakdown);
  //         fetchData();
  //     }
  // };
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
