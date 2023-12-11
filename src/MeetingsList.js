import React from 'react';

const MeetingsList = ({ meetings }) => {
  return (
    <div className="container mt-5">
      <h2 className="text-center">Scheduled Meetings</h2>
      <div className="row">
        {meetings.map(meeting => (
          <div key={meeting.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{meeting.name}</h5>
                <p className="card-text">Email: {meeting.email}</p>
                <p className="card-text">Timing: {meeting.timing}</p>
                <p className='card-text'>Meeting link: <a href='https://meet.google.com/tzu-wrif-grn' target='_blank' rel='noopener noreferrer'>https://meet.google.com/tzu-wrif-grn</a></p>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingsList;
