import React, { useState } from "react";
import "./Calendar.css";
import Modal from "../Modal/Modal";

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const time = [
    "8:00",
    "8:30",
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
  ];
  console.log(events);

  console.log(time);

  return (
    <div className="calendar">
      <div className="time-labels" onClick={() => setOpen(true)}>
        {time.map((item, idx) => (
          <div key={idx} className="time-label">
            {item}
            {events
              .filter((event) => item >= event.start && item < event.duration)
              .map((event, index) => (
                <div key={index} className="event">
                  {event.title}
                </div>
              ))}
          </div>
        ))}
      </div>
      {open && (
        <Modal
          open={open}
          setEvents={setEvents}
          setOpen={setOpen}
          time={time}
        />
      )}
    </div>
  );
};

export default MyCalendar;
