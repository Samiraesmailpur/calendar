import { Box, Button } from "@mui/material";
import { Modal as ModalMui } from "@mui/material";
import "./Modal.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createEvent } from "@/store/operations";

const Modal = ({ open, fetchEventsAndUpdate, setOpen, time }) => {
  const dispatch = useDispatch();
  const [modalEventData, setModalEventData] = useState({
    start: "8:30",
    end: "9:00",
    title: "Event",
    order: 1,
    column: 1,
  });

  const handleAddEvent = async () => {
    const convertedEventData = {
      title: modalEventData.title,
      start: time[modalEventData.start],
      duration:
        Number(time[modalEventData.end]) - Number(time[modalEventData.start]),
      order: modalEventData.order,
      column: modalEventData.column,
    };

    await dispatch(createEvent(convertedEventData));
    fetchEventsAndUpdate();
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
            value={modalEventData.start}
            onChange={(e) =>
              setModalEventData({ ...modalEventData, start: e.target.value })
            }
          >
            {Object.keys(time).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <p>to:</p>
          <select
            value={modalEventData.end}
            onChange={(e) =>
              setModalEventData({ ...modalEventData, end: e.target.value })
            }
          >
            {Object.keys(time).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <input
            className="input"
            type="text"
            value={modalEventData.title}
            onChange={(e) =>
              setModalEventData({ ...modalEventData, title: e.target.value })
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
