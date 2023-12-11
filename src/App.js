// App.js
import React, { useState, useEffect } from 'react';
import MeetingsList from './MeetingsList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedTiming, setSelectedTiming] = useState('');
  const [meetings, setMeetings] = useState([]);
  const [slotsFullAlert, setSlotsFullAlert] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSlotsFullAlert(false);

    try {
      const response = await fetch('http://localhost:3001/schedule-meeting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, timing: selectedTiming }),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.message);
      } else {
        console.error(response);
        if (response.status === 400) {
          setSlotsFullAlert(true);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }

    fetchMeetings();
    fetchAvailableSlots();
  };

  const fetchMeetings = () => {
    fetch('http://localhost:3001/meetings')
      .then(response => response.json())
      .then(data => setMeetings(data))
      .catch(error => console.error('Error fetching meetings:', error));
  };

  const fetchAvailableSlots = () => {
    fetch('http://localhost:3001/slots')
      .then(response => response.json())
      .then(data => {
      
        setAvailableSlots(data);
      })
      .catch(error => console.error('Error fetching available slots:', error));
  };

  useEffect(() => {
    fetchMeetings();
    fetchAvailableSlots();
    
  }, []);
  
  return (
    <div>
      <div className="container mt-5">
        <h1 className="text-center">Meeting Form</h1>
        <form className="needs-validation mt-4" noValidate onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <div className="invalid-feedback">
              Please enter your name.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="invalid-feedback">
              Please enter a valid email address.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="options" className="form-label">Choose Timings</label>
            <select
              className="form-select"
              id="options"
              value={selectedTiming}
              onChange={(e) => setSelectedTiming(e.target.value)}
              required
            >
              <option value="">Select a timing</option>
              {availableSlots.map(slot => (
                <option key={slot.timing} value={slot.timing} disabled={slot.count === 0}>
                  {slot.timing} ({slot.count} slots left)
                </option>
              ))}
            </select>
            <div className="invalid-feedback">
              Please select a timing.
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          {slotsFullAlert && (
            <div className="alert alert-danger mt-3" role="alert">
              Slots are full at this timing. Please choose another timing.
            </div>
          )}
        </form>
      </div>

      {meetings.length > 0 ? <MeetingsList meetings={meetings} /> : (
        <div className="alert alert-danger mt-3" role="alert">
          No Meetings Scheduled!!
        </div>
      )}
    </div>
  );
}

export default App;
