import { createAsyncThunk } from "@reduxjs/toolkit";

export const getEvents = createAsyncThunk(
  "events/getEvents",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("/api/events");

      if (response.ok) {
        const events = await response.json();
        return events;
      } else {
        return thunkAPI.rejectWithValue("Error fetching events");
      }
    } catch (error) {
      console.error("Error fetching events", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteEventById = createAsyncThunk(
  "events/deleteEventById",
  async (eventId, thunkAPI) => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        console.log("Event deleted successfully");
      } else {
        return thunkAPI.rejectWithValue("Error deleting event");
      }
    } catch (error) {
      console.error("Error deleting event", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (convertedEventData, thunkAPI) => {
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(convertedEventData),
      });

      if (response.status === 201) {
        const responseData = await response.json();
        return responseData;
      } else {
        return thunkAPI.rejectWithValue("Error creating event");
      }
    } catch (error) {
      console.error("Error creating event", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
