import { getEvents, deleteEventById, createEvent } from "./operations";
import { createSlice } from "@reduxjs/toolkit";

const handlePending = (state) => {
  state.events = [];
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const initialState = {
  events: [],
  isLoading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents(state, action) {
      return {
        ...state,
        events: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, handlePending)
      .addCase(getEvents.fulfilled, (state, action) => {
        return {
          ...state,
          events: action.payload,
          isLoading: false,
          error: null,
        };
      })
      .addCase(getEvents.rejected, handleRejected)

      .addCase(createEvent.pending, handlePending)
      .addCase(createEvent.fulfilled, (state, action) => {
        return {
          ...state,
          events: action.payload,
          isLoading: false,
          error: null,
        };
      })
      .addCase(deleteEventById.pending, handlePending)
      .addCase(deleteEventById.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: null,
          events: action.payload,
        };
      })
      .addCase(deleteEventById.rejected, handleRejected);
  },
});

export const { setEvents } = eventsSlice.actions;
export const eventsReducer = eventsSlice.reducer;
