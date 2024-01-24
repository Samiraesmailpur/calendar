import React, { useEffect, useState } from "react";
import "./Calendar.css";
import Modal from "../Modal/Modal";
import { RxCross2 } from "react-icons/rx";
import ExportFileButton from "../ExportFileButton/ExportFileButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteEventById, createEvent, getEvents } from "@/store/operations";
import { selectEvents } from "@/store/selectors";
import { setEvents } from "@/store/eventsSlise";

const MyCalendar = () => {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);
  const [open, setOpen] = useState(false);

  const deleteEvent = async (_id) => {
    await dispatch(deleteEventById(_id));
    // await dispatch(getEvents());
    fetchEventsAndUpdate(events);
  };

  const processAndSetEvents = (data) => {
    const copiedData = JSON.parse(JSON.stringify(data));

    copiedData.sort((a, b) => {
      if (a.start !== b.start) {
        return a.start - b.start;
      }
      return b.duration - a.duration;
    });

    for (let i = 0; i < copiedData.length; i++) {
      for (let j = i + 1; j < copiedData.length; j++) {
        if (
          copiedData[i].start < copiedData[j].start + copiedData[j].duration &&
          copiedData[j].start < copiedData[i].start + copiedData[i].duration
        ) {
          if (copiedData[i].order >= copiedData[j].order) {
            copiedData[j].order = copiedData[i].order + 1;
          }
        }
      }
    }
    dispatch(setEvents(copiedData || []));
  };

  const fetchEventsAndUpdate = async () => {
    const updatedEvents = await dispatch(getEvents());
    processAndSetEvents(updatedEvents.payload);
  };

  useEffect(() => {
    fetchEventsAndUpdate();
  }, []);

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

  return (
    <>
      <ExportFileButton events={events} />
      <div className="calendar">
        <div className="time-labels" onClick={() => setOpen(true)}>
          {Object.keys(timeMap).map((item, idx) => (
            <div key={idx} className="time-label">
              {item}
            </div>
          ))}
        </div>
        <div className="event-box">
          {events?.map((event, index) => (
            <div
              key={index}
              className="event"
              style={{
                height: event.duration * 2 + "px",
                top: `calc(${event.start}px * 2)`,
                left: event.order * 200 - 200 + "px",
              }}
            >
              <RxCross2 onClick={() => deleteEvent(event._id)} />
              {event.title}
            </div>
          ))}
        </div>
        {open && (
          <Modal
            open={open}
            fetchEventsAndUpdate={fetchEventsAndUpdate}
            setOpen={setOpen}
            time={timeMap}
          />
        )}
      </div>
    </>
  );
};

export default MyCalendar;
