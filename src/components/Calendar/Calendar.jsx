import React, { useState } from "react";
import "./Calendar.css";
import Modal from "../Modal/Modal";
import { RxCross2 } from "react-icons/rx";

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);

  const sortedEvents = events.sort((a, b) => {
    if (a.start !== b.start) {
      return a.start - b.start;
    }
    return b.duration - a.duration;
  });

  console.log(sortedEvents, "sortedEvents");

  const timeMap = {
    "8:00": 0,
    "8:30": 30,
    "9:00": 60,
    "9:30": 90,
    "10:00": 120,
    "10:30": 150,
    "11:00": 180,
    "11:30": 210,
    "12:00": 240,
    "12:30": 270,
    "13:00": 300,
    "13:30": 330,
    "14:00": 360,
    "14:30": 390,
    "15:00": 420,
    "15:30": 450,
    "16:00": 480,
    "16:30": 510,
    "17:00": 540,
  };

  console.log(events);

  const calculateEventHeight = (start, duration) => {
    return start + duration + 50;
  };

  return (
    <div className="calendar">
      <div className="time-labels" onClick={() => setOpen(true)}>
        {Object.keys(timeMap).map((item, idx) => (
          <div key={idx} className="time-label">
            {item}
          </div>
        ))}
      </div>
      <div className="event-box">
        {events
          .filter((event) =>
            Object.keys(timeMap).some(
              (item) => item >= event.start && item < event.duration
            )
          )
          .map((event, index) => (
            <div
              key={index}
              className="event"
              style={{
                height: calculateEventHeight(0, 90),
                top: "calc(90px * 2)",
              }}
            >
              <RxCross2 />
              {event.title}
            </div>
          ))}
      </div>
      {open && (
        <Modal
          open={open}
          setEvents={setEvents}
          setOpen={setOpen}
          time={timeMap}
        />
      )}
    </div>
  );
};

export default MyCalendar;
