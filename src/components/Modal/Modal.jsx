import { Box, Button } from "@mui/material";
import { Modal as ModalMui } from "@mui/material";

import "./Modal.css";
import { useState } from "react";

const Modal = ({ open, setEvents, setOpen, time }) => {
  const [eventData, setEventData] = useState({
    start: null,
    duration: null,
    title: "",
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
          {/* <form action=""> */}
          <p>from:</p>
          <select
            name=""
            id=""
            onChange={(e) =>
              setEventData({ ...eventData, start: e.target.value })
            }
          >
            {time.map((item) => (
              <option key={item} value={eventData.start}>
                {item}
              </option>
            ))}
          </select>
          <p>to:</p>
          <select
            name=""
            id=""
            onChange={(e) =>
              setEventData({ ...eventData, duration: e.target.value })
            }
          >
            {time.map((item) => (
              <option key={item} value={eventData.duration}>
                {item}
              </option>
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
          {/* </form> */}
        </Box>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={handleAddEvent}>Add event</Button>
      </Box>
    </ModalMui>
  );
};

export default Modal;
