import { useState } from "react";
import Modal from "react-modal";
import { useEffect } from "react";

export default function ProfilePage({ user, loadAccount }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    // email: user?.email || (user && user.email) || "",
    first_name: user?.first_name || (user && user.first_name) || "",
    last_name: user?.last_name || (user && user.last_name) || "",
    // password: user?.password || (user && user.password) || "",
    zipcode: user?.zipcode || (user && user.zipcode) || "",
    picture_url: user?.picture_url || (user && user.picture_url) || "",
    // friend_list: user?.friend_list || (user && user.friend_list) || [],
    // pets: user?.pets || (user && user.pets) || [],
    // hosted_events: user?.hosted_events || (user && user.hosted_events) || [],
    // attending_events:
    //   user?.attending_events || (user && user.attending_events) || [],
  });

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
      `${process.env.REACT_APP_API_HOST}/api/accounts/${user.email}`,
      requestOptions
    );
    const data = await response.json();
    console.log("data:", data);
    if (response.ok) {
      // Update the user data displayed on the ProfilePage
      loadAccount();
      // Close the modal
      setModalIsOpen(false);
    } else {
      // Handle error
      console.log(data.detail);
    }
  };

  console.log("formData.email:", formData.email);
  console.log("formData.first_name:", formData.first_name);
  console.log("formData.last_name:", formData.last_name);
  console.log("formData.password:", formData.password);
  console.log("formData.zipcode:", formData.zipcode);
  console.log("formData.zipcode:", formData.zipcode);
  console.log("formData.friend_list:", formData.friend_list);
  console.log("formData.pets:", formData.pets);
  console.log("formData.hosted_events:", formData.hosted_events);
  console.log("formData.attending_events:", formData.attending_events);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      email: user?.email || (user && user.email),
      password: user?.password || (user && user.password),
    }));
    Modal.setAppElement("#root");
  }, [user]);

  return (
    <>
      <h1>User profile</h1>
      <div className="user-profile">
        {user && (
          <div className="user" key={user.id}>
            <div className="user-first_name">{user.first_name}</div>
            <div className="user-last_name">{user.last_name}</div>
            <div className="user-email">{user.email}</div>
            <div className="user-zipcode">{user.zipcode}</div>
            <div className="user-pets">{user.pets}</div>
            <div className="user-hosted_events">{user.hosted_events}</div>
            <div className="user-attending_events">{user.attending_events}</div>
          </div>
        )}
        <button onClick={() => setModalIsOpen(true)}>Edit Profile</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
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
      </div>
    </>
  );
}
