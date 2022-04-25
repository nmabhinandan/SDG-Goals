import { configureStore, createSlice } from "@reduxjs/toolkit";
import data2018 from "./data/2018.json";
import data2019 from "./data/2019.json";
import data2020 from "./data/2020.json";

const params = new URLSearchParams(window.location.search);

const dataSlice = createSlice({
  name: "data",
  initialState: {
    dataSet: {
      2018: data2018,
      2019: data2019,
      2020: data2020,
    },
  },
  reducers: {},
});

const appStateSlice = createSlice({
  name: "data",
  initialState: {
    year: params.has("year") ? params.get("year") : null,
    area: params.has("area") ? params.get("area") : null,
    goal: params.has("goal") ? params.get("goal") : null,
  },
  reducers: {
    setYear: (state, action) => {
      state.year = action.payload;
    },
    setArea: (state, action) => {
      state.area = action.payload;
    },
    setGoal: (state, action) => {
      state.goal = action.payload;
    },
  },
});

export const { setYear, setArea, setGoal } = appStateSlice.actions;

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    app: appStateSlice.reducer,
  },
});

export default store;
