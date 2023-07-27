/* eslint react-hooks/exhaustive-deps: 0 */
import { useState } from "react";
import "./ProfilePage.css";
import Modal from "react-modal";
import { useEffect } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useSelector } from "react-redux";
import EventButtonModal from "../MainPage/CreateEventButtonModal";

export default function ProfilePage({ user, updateLoadAccount, loadAccount }) {
  const pets = useSelector((state) => state.pets);
  const userPets = pets.filter((pet) => pet.user_id === user.id);
  const events = useSelector((state) => state.events);
  const userEvents = events.filter((event) => event.account_id === user.id);
  const [updateUserModalIsOpen, setUpdateUserModalIsOpen] = useState(false);
  const [createPetModalIsOpen, setCreatePetModalIsOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
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
        `${process.env.REACT_APP_API_HOST}/api/pets`,
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

  function ProfilePagePetCard() {
    return (
      <div className="pets-card align-items-center">
        {userPets.map((pet) => {
          return (
            <div
              className="user-profile-pet-card align-items-center"
              key={pet.id}
            >
              <div className="user-profile-pet-card-body d-flex flex-column align-items-center">
                <img
                  className="rounded-circle user-profile-pet-card-image"
                  src={pet.pet_picture_url}
                  alt=""
                  width="100px"
                  height="100px"
                  style={{ objectFit: "cover" }}
                ></img>
                <h5 className="user-profile-pet-card-title">
                  {pet && pet.pet_name}
                </h5>
                <div className="user-profile-pet-card-birthday">
                  🎂: {pet.birth_adoption_date}
                </div>
                <div className="size-vibe-breed">
                  {pet.breed} | {pet.size} | {pet.vibe}
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  className="card-button"
                  onClick={() => {
                    handleDeletePet(pet.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        {isDeleted === true && (
          <div
            className="alert alert-success d-flex justify-content-center"
            id="success-message"
          >
            Pet removed
          </div>
        )}
      </div>
    );
  }

  async function handleDeletePet(id) {
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

  function ProfilePageEventCard() {
    return (
      <div className="events-card align-items-center">
        {userEvents.map((event) => {
          return (
            <div
              className="user-profile-event-card align-items-center"
              key={event.id}
            >
              <div className="user-profile-event-card-body d-flex flex-column align-items-center">
                <img
                  className="rounded user-profile-event-card-image"
                  src={event.picture_url}
                  alt=""
                  height="100px"
                  style={{ objectFit: "cover" }}
                ></img>
                <h5 className="user-profile-event-card-title">
                  {event && event.name}
                </h5>
                <div className="user-profile-event-card-date">
                  {event.date_start}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

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
            <h2>My Info</h2>
            <div className="user-first_name">{user.first_name}</div>
            <div className="user-last_name">{user.last_name}</div>
            <div className="user-zipcode">{user.zipcode}</div>
            <button onClick={() => setUpdateUserModalIsOpen(true)}>
              Edit Profile
            </button>
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <h4>My Pet(s)</h4>
                  <div className="card-container">
                    <ProfilePagePetCard />
                  </div>
                  <button onClick={toggleCreatePetModal}>Add a Pet</button>
                </div>
              </div>
              <br />
              <div className="card">
                <div className="card-body">
                  <h4>My Event(s)</h4>
                  <ProfilePageEventCard />
                </div>
              </div>
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
            <label>
              Profile Picture URL:
              <input
                type="text"
                name="picture_url"
                value={formData.picture_url}
                onChange={handleInputChange}
                placeholder={user && user.picture_url}
              />
            </label>
            {formData.picture_url && (
              <img
                className="profile-picture-preview"
                src={formData.picture_url}
                alt="Profile Picture Preview"
              />
            )}
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
            {formData.pet_picture_url && (
              <img
                className="pet-picture-preview"
                src={formData.pet_picture_url}
                alt="Pet Picture Preview"
              />
            )}
            <button type="submit">Create Pet</button>
          </form>
        </Modal>
        <EventButtonModal />
      </div>
    </>
  );
}
