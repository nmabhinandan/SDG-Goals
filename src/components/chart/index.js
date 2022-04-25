import * as d3 from "d3";
import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";

export default function Chart() {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const { dataSet } = useSelector((state) => state.data);
  const { year, area, goal } = useSelector((state) => state.app);

  const ref = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);


  const data = useMemo(() => {
    const name = (goal !== null) ? goal.split(':').shift().trim() : "SDG Index Score";
    if (year !== null && dataSet !== undefined) {
      if (area !== null) {
        return dataSet[year].find((stateData) => stateData.area_code === area).chartdata;
      } else {
        return dataSet[year].map((stateData) => ({
          name: stateData.area_name,
          value: stateData.chartdata.find((d) => d.name === name).value,
        }));
      }
    }
    return [];
  }, [year, area, dataSet, goal]);

  const margin = useMemo(() => ({ top: 20, right: 20, bottom: 40, left: 130 }), []);

  const innerHeight = useMemo(() => height - margin.top - margin.bottom, [height, margin]);
  const innerWidth = useMemo(() => width - margin.left - margin.right, [width, margin]);

  const yScale = useMemo(
    () =>
      d3
        .scaleBand()
        .domain(data.map((d) => d.name))
        .range([0, innerHeight])
        .paddingInner(0.05),
    [data, innerHeight]
  );

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)])
    .range([0, innerWidth]);

  const fillColor = (val) => {
    if (val === 100) {
      return "#00aeef";
    } else if (val >= 65) {
      return "#00a084";
    } else if (val >= 50) {
      return "#ffc40c";
    } else {
      return "#dd1e47";
    }
  };
  
  if (year === null) {
    return <div>Please select a year</div>;
  }

  const opacity = currentGoal => {
    if(area !== null && goal !== null && goal.split(':').shift().trim() !== currentGoal) {
      return 0.1
    }
    return 1;
  }

  return (
    <div className="h-full w-full">
      <svg className="h-full w-full" ref={ref}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {xScale.ticks().map((tickValue) => (
            <g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
              <line y2={innerHeight} stroke="#eee" />
              <text className="md:text-xs" style={{ textAnchor: "middle" }} dy=".71em" y={innerHeight + 3}>
                {tickValue}
              </text>
            </g>
          ))}
          {yScale.domain().map((tickValue) => (
            <text
              key={tickValue}
              className="md:text-xs"
              style={{ textAnchor: "end" }}
              x={-3}
              dy=".32em"
              y={yScale(tickValue) + yScale.bandwidth() / 2}
            >
              {tickValue.length > (width - innerWidth) / 10
                ? tickValue.substr(0, (width - innerWidth) / 10 - 1) + "..."
                : tickValue}
            </text>
          ))}
          {data.map((d) => (
            <rect
              ry="2"
              fill={fillColor(d.value)}
              fillOpacity={opacity(d.name)}
              key={d.name}
              x={0}
              y={yScale(d.name)}
              width={xScale(d.value)}
              height={yScale.bandwidth()}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
