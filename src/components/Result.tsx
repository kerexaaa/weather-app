import { useState } from "react";
import { fetchData } from "../data/axios";
import { useMutation } from "@tanstack/react-query";
import IconComponent from "./IconComponent";
import { FaSearch } from "react-icons/fa";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { WiHumidity } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";
import { TbDirections } from "react-icons/tb";
import { TbWorldLongitude } from "react-icons/tb";
import { TbWorldLatitude } from "react-icons/tb";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import AnimatedNumber from "./AnimatedNumber";

function Result() {
  const [text, setText] = useState<string>("");
  const [unit, setUnit] = useState<string>("C");

  const {
    mutate,
    isPending,
    isError,
    error,
    data: weatherObject,
  } = useMutation({
    mutationFn: () => fetchData(text),
    mutationKey: ["weather"],
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" disabled={isPending}>
          {isPending ? (
            <IconComponent icon={BiDotsHorizontalRounded} />
          ) : (
            <IconComponent icon={FaSearch} />
          )}
        </button>
      </form>
      {weatherObject ? (
        <div className="result">
          <div className="result-info">
            <div>
              <h2>
                {weatherObject.location.name}, {weatherObject.location.country}
              </h2>
              <h3>{weatherObject.location.region}</h3>
              <h4 className="center-row">
                <span
                  className="center-row"
                  data-tooltip-content="Latitude"
                  data-tooltip-id="latitude"
                  data-tooltip-place="top"
                >
                  <IconComponent icon={TbWorldLatitude} />{" "}
                  <Tooltip id="latitude" />
                  {weatherObject.location.lat}{" "}
                </span>
                <span
                  className="center-row"
                  data-tooltip-content="Longitude"
                  data-tooltip-id="longitude"
                  data-tooltip-place="top"
                >
                  <IconComponent icon={TbWorldLongitude} />{" "}
                  <Tooltip id="longitude" />
                  {weatherObject.location.lon}
                </span>
              </h4>
            </div>
          </div>
          <div className="temperature-block">
            <div className="temperature-info">
              <div
                data-tooltip-content={weatherObject.current.condition.text}
                data-tooltip-id="condition"
                data-tooltip-place="top"
              >
                {" "}
                <Tooltip id="condition" />
                <img
                  className="image-center"
                  height={60}
                  src={weatherObject.current.condition.icon}
                  draggable="false"
                />
              </div>
              <p className="temperature-value">
                <AnimatedNumber
                  value={
                    unit === "C"
                      ? weatherObject.current.temp_c
                      : weatherObject.current.temp_f
                  }
                />
              </p>
              <span
                onClick={() => setUnit("C")}
                className={`temperature ${
                  unit === "C" ? "shown-temperature" : "hidden-temperature"
                }`}
              >
                &deg;C
              </span>
              <span className="divider">|</span>
              <span
                onClick={() => setUnit("F")}
                className={`temperature ${
                  unit === "F" ? "shown-temperature" : "hidden-temperature"
                }`}
              >
                &deg;F
              </span>
            </div>
            <div className="weather-reports">
              <p
                data-tooltip-content="Humidity"
                data-tooltip-id="humidity"
                data-tooltip-place="top"
              >
                <Tooltip id="humidity" />
                <IconComponent icon={WiHumidity} />
                {weatherObject.current.humidity} g/kg
              </p>
              <p
                data-tooltip-content="Wind Speed"
                data-tooltip-id="wind-speed"
                data-tooltip-place="top"
              >
                <Tooltip id="wind-speed" />
                <IconComponent icon={WiStrongWind} />
                {weatherObject.current.wind_kph} km/h
              </p>
              <p
                data-tooltip-content="Wind Direction"
                data-tooltip-id="wind-dir"
                data-tooltip-place="top"
              >
                <Tooltip id="wind-dir" />

                <IconComponent icon={TbDirections} />
                {weatherObject.current.wind_dir}
              </p>
            </div>
          </div>
          <div className="weather-block">
            <h3>Weather</h3>
            <h4>
              {weatherObject.location.tz_id},{" "}
              {weatherObject.location.localtime.slice(-5)}
            </h4>
            <h4>{weatherObject.current.condition.text}</h4>
          </div>
        </div>
      ) : (
        <div className={`bare-block ${isError ? "error" : ""}`}>
          {isError ? (
            <span>
              Oops, seems like you got me, I don't have this <br />{" "}
              {error.message}
            </span>
          ) : isPending ? (
            "Loading..."
          ) : (
            "Enter a city or a country name!"
          )}
        </div>
      )}
    </>
  );
}

export default Result;
