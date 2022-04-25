import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setArea } from "../../appstate";
import { AREAS } from "../../config";

export default function Area() {
  const dispatch = useDispatch();
  const { area } = useSelector(state => state.app);
  return (
    <div className="w-full">
      <select
        value={area || ""}
        onChange={(e) => dispatch(setArea(e.target.value || null))}
        className="block h-10 text-base w-full rounded-sm border-gray-300"
      >
        <option value={""}>Select Area</option>
        {AREAS.map((area) => (
          <option value={area.areaCode} key={area.areaCode}>
            {area.areaName}
          </option>
        ))}
      </select>
    </div>
  );
}
