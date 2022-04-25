import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setYear } from "../../appstate";
import { YEARS } from "../../config";

export default function Year() {
  const dispatch = useDispatch();
  const { year } = useSelector((state) => state.app);
  return (
    <div className="w-full">
      <select
        value={year || ""}
        onChange={(e) => dispatch(setYear(e.target.value || null))}
        className="block h-10 text-base w-full rounded-sm border-gray-300"
      >
        <option value={""}>Select Year</option>
        {YEARS.map((goal) => (
          <option key={goal} value={goal}>
            {goal}
          </option>
        ))}
      </select>
    </div>
  );
}
