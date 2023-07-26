import { useState } from "react";
import Modal from "react-modal";
import { useEffect } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useSelector, useDispatch } from "react-redux";
import { removePet } from "../slices/petsSlice";
import EventButtonModal from "../MainPage/CreateEventButtonModal";

export default function ProfilePage({ user, updateLoadAccount, loadAccount }) {
  const pets = useSelector((state) => state.pets);
  const userPets = pets.filter((pet) => pet.user_id === user.id);
  const dispatch = useDispatch();
  const [updateUserModalIsOpen, setUpdateUserModalIsOpen] = useState(false);
  const [createPetModalIsOpen, setCreatePetModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || (user && user.email) || "",
    first_name: user?.first_name || (user && user.first_name) || "",
    last_name: user?.last_name || (user && user.last_name) || "",
    password: user?.password || (user && user.password) || "",
    zipcode: user?.zipcode || (user && user.zipcode) || "",
    picture_url: user?.picture_url || (user && user.picture_url) || "",
    friend_list: user?.friend_list || (user && user.friend_list) || [],
    pets: user?.pets || (user && user.pets) || [],
    hosted_events: user?.hosted_events || (user && user.hosted_events) || [],
    attending_events:
      user?.attending_events || (user && user.attending_events) || [],
    pet_name: "",
    birth_adoption_date: "",
    breed: "",
    dietary_restrictions: "",
    vibe: "",
    size: "",
    pet_picture_url: "",
    user_id: user?.id || (user && user.id) || "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    Modal.setAppElement("#root");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/accounts/${user.email}`,
      requestOptions
    );
    const data = await response.json();
    if (response.ok) {
      updateLoadAccount();
      setUpdateUserModalIsOpen(false);
    } else {
      console.log(data.detail);
    }
  };

  const toggleCreatePetModal = () => {
    setCreatePetModalIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleCreatePetSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        pet_name: formData.pet_name,
        birth_adoption_date: formData.birth_adoption_date,
        breed: formData.breed,
        dietary_restrictions: formData.dietary_restrictions,
        vibe: formData.vibe,
        size: formData.size,
        pet_picture_url: formData.pet_picture_url,
        user_id: user.id,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/api/pets/`,
        requestOptions
      );
      const responseData = await response.json();
      if (response.ok) {
        updateLoadAccount();
        setCreatePetModalIsOpen(false);
      } else {
        console.log(responseData.detail);
      }
    } catch (error) {
      console.error("Error creating pet:", error);
    }
  };

  useEffect(() => {
    loadAccount();
    updateLoadAccount();
  }, []);

  return (
    <>
      <h1>User profile</h1>
      <div className="user-profile">
        {user && (
          <div className="user" key={user.id}>
            <h2>My info</h2>
            <div className="user-first_name">{user.first_name}</div>
            <div className="user-last_name">{user.last_name}</div>
            <div className="user-zipcode">{user.zipcode}</div>
            <button onClick={() => setUpdateUserModalIsOpen(true)}>
              Edit Profile
            </button>
            <h2>My pets</h2>
            <div className="pets-list">
              {userPets.map((pet) => {
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
                      <div className="card-birthday">
                        {pet.birth_adoption_date}
                      </div>
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
            <button onClick={toggleCreatePetModal}>Create Pet</button>
            <h2>My events</h2>
            <div className="user-hosted_events">
              {user.hosted_events.map((event) => {
                const date = new Date(event.date_start).toLocaleDateString();
                return (
                  <div key={event.id} className="hosted-event-card">
                    <div className="hosted-event-title">{event.name}</div>
                    <img
                      className="hosted-event-image"
                      src={event.picture_url}
                      alt="hosted-event"
                    />
                    <div className="hosted-event-date">Date: {date}</div>
                  </div>
                );
              })}
            </div>
            <div className="user-attending_events">{user.attending_events}</div>
          </div>
        )}
        <Modal
          isOpen={updateUserModalIsOpen}
          onRequestClose={() => setUpdateUserModalIsOpen(false)}
        >
          <h2>Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <label>
              First Name:
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                placeholder={user && user.first_name}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                placeholder={user && user.last_name}
              />
            </label>
            <label>
              Zipcode:
              <input
                type="text"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleInputChange}
                placeholder={user && user.zipcode}
              />
            </label>
            <button type="submit">Save Changes</button>
          </form>
        </Modal>
        <Modal
          isOpen={createPetModalIsOpen}
          onRequestClose={toggleCreatePetModal}
        >
          <h2>Create Pet</h2>
          <form onSubmit={handleCreatePetSubmit}>
            <label>
              Pet Name:
              <input
                type="text"
                name="pet_name"
                value={formData.pet_name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Birth/Adoption Date:
              <input
                type="date"
                name="birth_adoption_date"
                value={formData.birth_adoption_date}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Breed:
              <input
                type="text"
                name="breed"
                value={formData.breed}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Dietary Restrictions:
              <input
                type="text"
                name="dietary_restrictions"
                value={formData.dietary_restrictions}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Vibe:
              <input
                type="text"
                name="vibe"
                value={formData.vibe}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Size:
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Pet Picture URL:
              <input
                type="text"
                name="pet_picture_url"
                value={formData.pet_picture_url}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit">Create Pet</button>
          </form>
        </Modal>
        <EventButtonModal />
      </div>
    </>
  );
}
