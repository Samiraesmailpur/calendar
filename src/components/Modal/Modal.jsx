import { Box, Button } from "@mui/material";
import { Modal as ModalMui } from "@mui/material";

import "./Modal.css";
import { useState } from "react";

const Modal = ({ open, setEvents, setOpen, time }) => {
  const [eventData, setEventData] = useState({
    start: "0",
    duration: "30",
    title: "Event",
  });

  const handleAddEvent = () => {
    setEvents((prevEvents) => [...prevEvents, eventData]);
    setOpen(false);
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
            value={eventData.duration}
            onChange={(e) =>
              setEventData({ ...eventData, duration: e.target.value })
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
