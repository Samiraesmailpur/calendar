import { Box, Button } from "@mui/material";
import { Modal as ModalMui } from "@mui/material";
import "./Modal.css";
import { useState } from "react";

const Modal = ({ open, setEvents, setOpen, time }) => {
  const [eventData, setEventData] = useState({
    start: "8:30",
    end: "9:00",
    title: "Event",
    order: 1,
  });

  const handleAddEvent = async () => {
    const convertedEventData = {
      title: eventData.title,
      start: time[eventData.start],
      duration: Number(time[eventData.end]) - Number(time[eventData.start]),
      order: eventData.order,
      column: 1,
    };
    setOpen(false);
    setEvents((prevEvents) => {
      let resultData = [...prevEvents, convertedEventData];
      resultData.sort((a, b) => {
        if (a.start !== b.start) {
          return a.start - b.start;
        }
        return b.duration - a.duration;
      });
      for (let i = 0; i < resultData.length; i++) {
        for (let j = i + 1; j < resultData.length; j++) {
          if (
            resultData[i].start <
              resultData[j].start + resultData[j].duration &&
            resultData[j].start < resultData[i].start + resultData[i].duration
          ) {
            if (resultData[i].order >= resultData[j].order) {
              resultData[j].order = resultData[i].order + 1;
            }
          }
        }
      }

      return resultData;
    });

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(convertedEventData),
      });
      if (response.status === 201) {
        console.log("create");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 500) {
        return;
      }
    }
  };

  return (
    <ModalMui
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box className="modal-box">
        <Box className="select-box">
          <p>from:</p>
          <select
            value={eventData.start}
            onChange={(e) =>
              setEventData({ ...eventData, start: e.target.value })
            }
          >
            {Object.keys(time).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <p>to:</p>
          <select
            value={eventData.end}
            onChange={(e) =>
              setEventData({ ...eventData, end: e.target.value })
            }
          >
            {Object.keys(time).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <input
            className="input"
            type="text"
            value={eventData.title}
            onChange={(e) =>
              setEventData({ ...eventData, title: e.target.value })
            }
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddEvent}>Add event</Button>
        </Box>
      </Box>
    </ModalMui>
  );
};

export default Modal;
