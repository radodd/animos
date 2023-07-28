import React, { useState } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPets } from "../actions/petAction";

function CreatePet() {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [breed, setBreed] = useState("");
  const [diet, setDiet] = useState("");
  const [vibe, setVibe] = useState("");
  const [size, setSize] = useState("");
  const [picture, setPicture] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };
  const handleBirthdayChange = (event) => {
    const value = event.target.value;
    setBirthday(value);
  };
  const handleBreedChange = (event) => {
    const value = event.target.value;
    setBreed(value);
  };
  const handleDietChange = (event) => {
    const value = event.target.value;
    setDiet(value);
  };
  const handleVibeChange = (event) => {
    const value = event.target.value;
    setVibe(value);
  };
  const handleSizeChange = (event) => {
    const value = event.target.value;
    setSize(value);
  };
  const handlePictureChange = (event) => {
    const value = event.target.value;
    setPicture(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      pet_name: name,
      birth_adoption_date: birthday,
      breed: breed,
      dietary_restrictions: diet,
      vibe: vibe,
      size: size,
      pet_picture_url: picture,
      user_id: user.id,
    };

    const postUrl = `${process.env.REACT_APP_API_HOST}/api/pets`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
    };
    const response = await fetch(postUrl, fetchConfig);
    if (response.ok) {
      setName("");
      setBirthday("");
      setBreed("");
      setDiet("");
      setVibe("");
      setSize("");
      setPicture("");
      setIsSubmitted(true);
      dispatch(fetchPets());
    }
    navigate(`/profile/${user && user.email}`);
  };

  function covertToBase64(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setPicture(reader.result);
    };
    reader.onerror = (error) => {};
  }

  return (
    <div className="row">
      <div className="shadow p-4 mt-4">
        <h1>Add a Furiend!</h1>
        <form onSubmit={handleSubmit} id="create-pet-form">
          <div className="form-floating mb-3">
            <input
              onChange={handleNameChange}
              placeholder="Pet Name"
              value={name}
              required
              type="text"
              name="name"
              id="name"
              className="form-control"
            />
            <label htmlFor="name">Pet Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handleBirthdayChange}
              placeholder="Pet Birthday"
              value={birthday}
              required
              type="date"
              name="birthday"
              id="birthday"
              className="form-control"
            />
            <label htmlFor="birthday">Pet Birthday / Adoption Day</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handleBreedChange}
              placeholder="Breed"
              value={breed}
              required
              type="text"
              name="breed"
              id="breed"
              className="form-control"
            />
            <label htmlFor="breed">Breed</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handleDietChange}
              placeholder="Diet"
              value={diet}
              required
              type="text"
              name="diet"
              id="diet"
              className="form-control"
            />
            <label htmlFor="diet">Dietary Restrictions</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handleVibeChange}
              placeholder="Vibe"
              value={vibe}
              required
              type="text"
              name="vibe"
              id="vibe"
              className="form-control"
            />
            <label htmlFor="vibe">Your pet's vibe</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handleSizeChange}
              placeholder="Size"
              value={size}
              required
              type="text"
              name="size"
              id="size"
              className="form-control"
            />
            <label htmlFor="size">Size</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handlePictureChange}
              placeholder="Picture"
              value={picture}
              required
              name="picture"
              id="picture"
              className="form-control"
            />
            <label htmlFor="picture">Upload a picture of your pet</label>
            <input accept="image/*" type="file" onChange={covertToBase64} />
            {picture === "" || picture === null ? (
              ""
            ) : (
              <img width={140} height={100} src={picture} alt="preview" />
            )}
          </div>
          <div className="row" style={{ justifyContent: "center" }}>
            <button className="submit-btn">Add my pet!</button>
          </div>
          {isSubmitted === true && (
            <div className="alert alert-success" id="success-message">
              You successfully created a new pet!
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
export default CreatePet;
