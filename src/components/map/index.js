import * as d3 from "d3";
// import { } from 'd3'
import * as d3Geo from "d3-geo";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as topojson from "topojson";

export default function Map() {
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

  const fillColor = useCallback(
    (state) => {
      const name = goal !== null ? goal.split(":").shift().trim() : "SDG Index Score";
      if (year !== null) {
        const data = dataSet[year].find((stateData) => stateData.area_code === state).chartdata;
        const val = data.find((d) => d.name === name).value;
        if(area !== null && state !== area) {
          return '#ccc';
        }
        if (val === 100) {
          return "#00aeef";
        } else if (val >= 65) {
          return "#00a084";
        } else if (val >= 50) {
          return "#ffc40c";
        } else {
          return "#dd1e47";
        }
      }
      return "#ccc";
    },
    [dataSet, goal, year, area]
  );


  useEffect(() => {
    (async () => {
      const svg = d3.select(".map");
      const path = d3Geo.geoPath().projection(null);

      const obj = await d3.json("https://www.covid19india.org/mini_maps/india.json");
      svg
        .append("g")
        .selectAll("path")
        .data(topojson.feature(obj, obj.objects.states).features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", (d) => {
          console.log({
            code: d?.properties?.st_code,
            name: d?.properties?.st_nm,
          });
          return fillColor(`IND0${d?.properties?.st_code}`);
        })
        .attr("class", "state");
    })().catch((err) => {
      console.error(err);
    });
  }, [width, height, fillColor]);

  if (year === null) {
    return <div>Please select a year</div>;
  }

  return (
    <div className="bg-slate-100 w-full h-full">
      <svg className="map w-full h-full" ref={ref} width={width} height={height}></svg>
    </div>
  );
}
