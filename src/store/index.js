import { configureStore } from "@reduxjs/toolkit";
import { eventsReducer } from "./eventsSlise";

export const makeStore = () => {
  return configureStore({
    reducer: {
      events: eventsReducer,
    },
  });
};
