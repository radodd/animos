import React, { useState } from 'react';

function CreateEvent({ locations }) {
    const [name, setName] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [capacity, setCapacity] = useState(0);
    const [picture, setPicture] = useState('');

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
        const data = {
            name: name,
            date_start: start,
            date_end: end,
            description: description,
            location_id: location,
            picture_url: picture,
            capacity: Number(capacity),
            account_id: 'test account',
            attendees: [],
        };
        const url = 'http://localhost:8000/api/events/';
        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        console.log(fetchOptions.body);
        const response = await fetch(url, fetchOptions);
        if (response.ok) {
            console.log('response is good');
            setName('');
            setStart('');
            setEnd('');
            setDescription('');
            setLocation('');
            setCapacity('');
            setPicture('');
        }
    };

    return (
        <>
            <div>
                <h1>Create a New Event</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <label htmlFor="name">Name of Event</label>
                        <input
                            onChange={handleNameChange}
                            name="name"
                            id="name"
                            type="text"
                            className="form-control"
                            value={name}
                        />
                    </div>
                    <div className="form-floating mb-3">
                        <label htmlFor="start_date">Start Date</label>
                        <input
                            onChange={handleStartChange}
                            name="start_date"
                            id="start_date"
                            type="datetime-local"
                            className="form-control"
                            value={start}
                        />
                    </div>
                    <div className="form-floating mb-3">
                        <label htmlFor="end_date">End Date</label>
                        <input
                            onChange={handleEndChange}
                            name="end_date"
                            id="end_date"
                            type="datetime-local"
                            className="form-control"
                            value={end}
                        />
                    </div>
                    <div className="form-floating mb-3">
                        <label htmlFor="description">Description</label>
                        <input
                            onChange={handleDescriptionChange}
                            name="description"
                            id="description"
                            type="text"
                            className="form-control"
                            value={description}
                        />
                    </div>
                    <div className="form-floating mb-3">
                        {' '}
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
                        <label htmlFor="capacity">Capacity</label>
                        <input
                            onChange={handleCapacityChange}
                            name="capacity"
                            id="capacity"
                            type="number"
                            className="form-control"
                            value={capacity}
                        />
                    </div>
                    <div className="form-floating mb-3">
                        <label htmlFor="picture_url">Picture URL</label>
                        <input
                            onChange={handlePictureChange}
                            name="picture_url"
                            id="picture_url"
                            type="text"
                            className="form-control"
                            value={picture}
                        />
                    </div>

                    <button>Submit</button>
                </form>
            </div>
        </>
    );
}
export default CreateEvent;
