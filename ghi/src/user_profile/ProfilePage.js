import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./ProfilePage.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import NavBar from "../NavBar";
import Modal from "react-modal";
import EventButtonModal from "../MainPage/CreateEventButtonModal";
import PetButtonModal from "../MainPage/CreatePetButtonModal";
import { fetchUser, fetchUsers } from "../actions/userAction.js";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { userEmail } = useParams();
  const [tokenUser, setUserToken] = useState(null);
  const users = useSelector((state) => state.users);
  const userProfile = users.find((user) => user.email === userEmail);
  const pets = useSelector((state) => state.pets);
  const events = useSelector((state) => state.events);
  const [updateUserModalIsOpen, setUpdateUserModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [petIsDeleted, setPetIsDeleted] = useState(false);
  const [formData, setFormData] = useState({
    email: userProfile?.email || (userProfile && userProfile.email) || "",
    first_name:
      userProfile?.first_name || (userProfile && userProfile.first_name) || "",
    last_name:
      userProfile?.last_name || (userProfile && userProfile.last_name) || "",
    password:
      userProfile?.password || (userProfile && userProfile.password) || "",
    zipcode: userProfile?.zipcode || (userProfile && userProfile.zipcode) || "",
    picture_url:
      userProfile?.picture_url ||
      (userProfile && userProfile.picture_url) ||
      "",
    friend_list:
      userProfile?.friend_list ||
      (userProfile && userProfile.friend_list) ||
      [],
    follower_list:
      userProfile?.follower_list ||
      (userProfile && userProfile.follower_list) ||
      [],
    following_list:
      userProfile?.following_list ||
      (userProfile && userProfile.following_list) ||
      [],
    pets: userProfile?.pets || (userProfile && userProfile.pets) || [],
    hosted_events:
      userProfile?.hosted_events ||
      (userProfile && userProfile.hosted_events) ||
      [],
    attending_events:
      userProfile?.attending_events ||
      (userProfile && userProfile.attending_events) ||
      [],
  });
  const navigate = useNavigate();

  Modal.setAppElement("#root");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/accounts/${userProfile.email}`,
      requestOptions
    );
    const data = await response.json();
    if (response.ok) {
      dispatch(fetchUser());
      dispatch(fetchUsers());
      setUpdateUserModalIsOpen(false);
    } else {
      console.log(data.detail);
    }
  };

  const handleDeleteClick = () => {
    setDeleteModalIsOpen(true);
  };

  const handleDeleteConfirm = async () => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/accounts/${userProfile.email}`,
      requestOptions
    );
    if (response.ok) {
      setDeleteModalIsOpen(false);
      navigate("/");
    } else {
      console.log("Error deleting account");
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalIsOpen(false);
  };

  async function loadAccountTokenInfo() {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/token`, {
      credentials: "include",
      method: "get",
    });
    const data = await response.json();
    if (data.account) {
      setUserToken(data.account);
    }
  }

  function ProfilePagePetCard() {
    return (
      <div className="pets-card align-items-center">
        {userProfile &&
          pets
            .filter((pet) => pet.user_id === userProfile.id)
            .map((pet) => {
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
                  <br></br>
                  <div className="d-flex justify-content-center">
                    {tokenUser && tokenUser.email === userProfile?.email && (
                      <button
                        className="btn btn-danger mr-2"
                        onClick={() => {
                          handleDeletePet(pet.id);
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        {petIsDeleted === true && (
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
      user_id: userProfile.id,
    };
    const response = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      setPetIsDeleted(true);
    }
  }

  function ProfilePageEventCard() {
    return (
      <div className="events-card align-items-center">
        {userProfile &&
          events
            .filter((event) => event.account_id === userProfile.id)
            .map((event) => {
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
    loadAccountTokenInfo();
  }, [userProfile]);

  return (
    <>
      <NavBar />
      <br />
      <div className="container">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-3 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={userProfile && userProfile.picture_url}
                      alt=""
                      className="rounded"
                      width="150"
                      height="150"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="mt-3">
                      <h2>
                        {userProfile && userProfile.first_name}{" "}
                        {userProfile && userProfile.last_name}
                      </h2>
                      <p className="text-muted font-size-sm">
                        {userProfile && userProfile.zipcode}
                      </p>
                      {tokenUser && tokenUser.email === userProfile?.email && (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => setUpdateUserModalIsOpen(true)}
                        >
                          Edit Profile
                        </button>
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
                              placeholder={
                                userProfile && userProfile.first_name
                              }
                            />
                          </label>
                          <label>
                            Last Name:
                            <input
                              type="text"
                              name="last_name"
                              value={formData.last_name}
                              onChange={handleInputChange}
                              placeholder={userProfile && userProfile.last_name}
                            />
                          </label>
                          <label>
                            Zipcode:
                            <input
                              type="text"
                              name="zipcode"
                              value={formData.zipcode}
                              onChange={handleInputChange}
                              placeholder={userProfile && userProfile.zipcode}
                            />
                          </label>
                          <label>
                            Profile Picture URL:
                            <input
                              type="text"
                              name="picture_url"
                              value={formData.picture_url}
                              onChange={handleInputChange}
                              placeholder={
                                userProfile && userProfile.picture_url
                              }
                            />
                          </label>
                          {formData.picture_url && (
                            <img
                              className="profile-picture-preview"
                              src={formData.picture_url}
                              alt=""
                            />
                          )}
                          <button type="submit">Save Changes</button>
                        </form>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <h4>My Pet(s)</h4>
                  <div className="card-container">
                    <ProfilePagePetCard />
                  </div>
                  <br />
                  <div className="d-flex justify-content-center">
                    {tokenUser && tokenUser.email === userProfile?.email && (
                      <PetButtonModal />
                    )}
                  </div>
                </div>
              </div>
              <br />
              <div className="card">
                <div className="card-body">
                  <h4>My Event(s)</h4>
                  <ProfilePageEventCard />
                  <br />
                  {tokenUser && tokenUser.email === userProfile?.email && (
                    <EventButtonModal />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          {tokenUser && tokenUser.email === userProfile?.email && (
            <button
              className="btn btn-danger btn-sm"
              onClick={handleDeleteClick}
            >
              Delete Account
            </button>
          )}
          <Modal isOpen={deleteModalIsOpen} onRequestClose={handleDeleteCancel}>
            <div className="text-center">
              <h2>Confirm Account Deletion</h2>
              <p>
                Are you sure you want to delete your account? This action cannot
                be undone.
              </p>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-danger mr-2"
                  onClick={handleDeleteConfirm}
                >
                  Yes, delete my account
                </button>
                <button
                  className="btn btn-secondary ml-2"
                  onClick={handleDeleteCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}
