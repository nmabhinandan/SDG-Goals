import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./app.css";
import Chart from "./components/chart";
import Area from "./components/controls/area";
import Goal from "./components/controls/goal";
import Year from "./components/controls/year";
import Map from "./components/map";

function App() {
  const dispatch = useDispatch();
  const { year, area, goal } = useSelector((state) => state.app);

  useEffect(() => {
    const url = new URL(window.location);
    if (year !== null) {
      url.searchParams.set("year", year);
    } else if (year === null) {
      url.searchParams.delete("year");
    }
    if (area !== null) {
      url.searchParams.set("area", area);
    } else if (area === null) {
      url.searchParams.delete("area");
    }
    if (goal !== null) {
      url.searchParams.set("goal", goal);
    } else if (goal === null) {
      url.searchParams.delete("goal");
    }
    window.history.pushState(null, "", url.toString());
  }, [year, area, goal]);

  // const onYearChange = (year) => {

  // };

  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2">
      <div className="w-full h-screen flex flex-col">
        <div className="flex space-x-2 p-4 bg-slate-300">
          <Goal />
          <Area />
          <Year />
        </div>
        <Chart />
      </div>
      <div className="w-full h-screen flex">
        <Map />
      </div>
    </div>
  );
}

export default App;
