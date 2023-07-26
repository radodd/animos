import React, { useState } from "react";
import createEvent from "../assets/images/create_event_title.png";
import { useSelector, useDispatch } from "react-redux";
import { fetchEvents } from "../actions/eventAction.js";

function CreateEvent() {
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [picture, setPicture] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const locations = useSelector((state) => state.locations);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // console.log('USER RIGHT HERE', user);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const handleStartChange = (e) => {
    const value = e.target.value;
    setStart(value);
  };

  const handleEndChange = (e) => {
    const value = e.target.value;
    setEnd(value);
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
  };

  const handleCapacityChange = (e) => {
    const value = e.target.value;
    setCapacity(value);
  };

  const handlePictureChange = (e) => {
    const value = e.target.value;
    setPicture(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (location === "") {
      alert("select a location from the dropdown menu");
      return;
    }

    if (start >= end) {
      alert("End date and time must be after start date and time");
      return;
    }
    const data = {
      name: name,
      date_start: start,
      date_end: end,
      description: description,
      location_id: location,
      picture_url: picture,
      capacity: Number(capacity),
      account_id: user.id,
      attendees: [],
    };
    const url = `${process.env.REACT_APP_API_HOST}/api/events/`;
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchOptions);
    if (response.ok) {
      setName("");
      setStart("");
      setEnd("");
      setDescription("");
      setLocation("");
      setCapacity("");
      setPicture("");
      setIsSubmitted(true);
      dispatch(fetchEvents());
      // window.location.reload();
    }
  };

  return (
    <>
      <div>
        <div className="modal-content">
          <div className="modal-header">
            {" "}
            <img
              className="create-event-modal-title"
              src={createEvent}
              width="575px"
              alt=""
            ></img>
          </div>
          <div className="row no-gutters">
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  required
                  onChange={handleNameChange}
                  name="name"
                  id="name"
                  type="text"
                  className="form-control"
                  value={name}
                />
                <label htmlFor="name">Name of Event</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  required
                  onChange={handleStartChange}
                  name="start_date"
                  id="start_date"
                  type="datetime-local"
                  className="form-control"
                  value={start}
                />
                <label htmlFor="start_date">Start Date</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  required
                  onChange={handleEndChange}
                  name="end_date"
                  id="end_date"
                  type="datetime-local"
                  className="form-control"
                  value={end}
                />
                <label htmlFor="end_date">End Date</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  required
                  onChange={handleDescriptionChange}
                  name="description"
                  id="description"
                  type="text"
                  className="form-control"
                  value={description}
                />
                <label htmlFor="description">Description</label>
              </div>
              <div className="form-floating mb-3">
                {" "}
                <select
                  onChange={handleLocationChange}
                  name="location"
                  id="location"
                  className="form-select"
                  value={location}
                >
                  <option value="">Location</option>
                  {locations.map((location) => (
                    <option value={location.id} key={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input
                  required
                  onChange={handleCapacityChange}
                  name="capacity"
                  id="capacity"
                  type="number"
                  className="form-control"
                  value={capacity}
                />
                <label htmlFor="capacity">Capacity</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  required
                  onChange={handlePictureChange}
                  name="picture_url"
                  id="picture_url"
                  type="text"
                  className="form-control"
                  value={picture}
                />
                <label htmlFor="picture_url">Picture URL</label>
              </div>
              <div className="row" style={{ justifyContent: "center" }}>
                <button className="submit-btn">Create</button>
              </div>
              {isSubmitted === true && (
                <div className="alert alert-success" id="success-message">
                  You successfully created a new event!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateEvent;
