import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGoal } from "../../appstate";
import { GOALS_LIST } from "../../config";

export default function Goal() {
  const dispatch = useDispatch();
  const { goal } = useSelector((state) => state.app);

  return (
    <div className="w-full">
      <select
        value={goal || ""}
        onChange={(e) => dispatch(setGoal(e.target.value || null))}
        className="block h-10 text-base w-full rounded-sm border-gray-300"
      >
        <option value={""}>Select Goal</option>
        {GOALS_LIST.map((goal) => (
          <option key={goal} value={goal}>{goal}</option>
        ))}
      </select>
    </div>
  );
}
