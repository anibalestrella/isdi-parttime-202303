import React, { useState } from 'react';

const CreateEvent = () => {
    const [formData, setFormData] = useState({
        image: '',
        text: '',
        lineUp: '',
        dates: '',
        place: '',
        priceInCents: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: Validate data and send to API or handle as needed
        console.log(formData);
    }

    return (
        <div className="create-event-container">
            <h2>Create Event</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Image URL:</label>
                    <input type="url" name="image" value={formData.image} onChange={handleChange} required />
                </div>
                <div>
                    <label>Text:</label>
                    <textarea name="text" value={formData.text} onChange={handleChange} required></textarea>
                </div>
                <div>
                    <label>Line Up (comma separated):</label>
                    <input type="text" name="lineUp" value={formData.lineUp} onChange={handleChange} placeholder="Artist1, Artist2, ..." required />
                </div>
                <div>
                    <label>Dates:</label>
                    <input type="date" name="dates" value={formData.dates} onChange={handleChange} required />
                </div>
                <div>
                    <label>Place:</label>
                    <input type="text" name="place" value={formData.place} onChange={handleChange} required />
                </div>
                <div>
                    <label>Price in Cents:</label>
                    <input type="number" name="priceInCents" value={formData.priceInCents} onChange={handleChange} required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateEvent;