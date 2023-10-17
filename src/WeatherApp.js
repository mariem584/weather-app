import React, { useState, useEffect } from "react";
import axios from "axios";
import "./weatherApp.css";
import { Input } from "antd";
import { SearchOutlined, CloseCircleOutlined } from "@ant-design/icons";
import clouds from "./images/cloud-computing.png";
import upleft from "./images/left-up.png";
import sunnyIcon from "./images/sunny.svg";
import clearNightIcon from "./images/moon.png";
import fewClouds from "./images/cloudsmorning.svg";
import fewCloudsNight from "./images/cloudsNight.svg";
import scatteredClouds from "./images/scatterded.svg";
import scatteredCloudsNight from "./images/scatterded.svg";
import brokenClouds from "./images/scatterded.svg";
import brokenCloudsNight from "./images/scatterded.svg";
import showerRain from "./images/rain.svg";
import showerRainNight from "./images/rain.svg";
import rain from "./images/rain.svg";
import rainNight from "./images/rain.svg";
import thunderstorm from "./images/scattered-thunderstorms.png";
import thunderstormNight from "./images/storm-night.png";
import snow from "./images/snow.png";
import snowNight from "./images/snow.png";
import mist from "./images/mist.png";
import mistNight from "./images/mist.png";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyWeatherData, setHourlyWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentWeather, setCurrentWeather] = useState(null);

  const weatherIconMapping = {
    "01d": sunnyIcon, // Clear sky (day)
    "01n": fewCloudsNight,
    "02d": fewClouds, // Few clouds (day)
    "02n": fewCloudsNight, // Few clouds (night)
    "03d": scatteredClouds, // Scattered clouds (day)
    "03n": scatteredCloudsNight, // Scattered clouds (night)
    "04d": brokenClouds, // Broken clouds (day)
    "04n": brokenCloudsNight, // Broken clouds (night)
    "09d": showerRain, // Shower rain (day)
    "09n": showerRainNight, // Shower rain (night)
    "10d": rain, // Rain (day)
    "10n": rainNight, // Rain (night)
    "11d": thunderstorm, // Thunderstorm (day)
    "11n": thunderstormNight, // Thunderstorm (night)
    "13d": snow, // Snow (day)
    "13n": snowNight, // Snow (night)
    "50d": mist, // Mist (day)
    "50n": mistNight, // Mist (night)
  };

  const API_KEY = "bb8e17f81c3620aae2b1bfc4e196197d";

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
        );
        const currentWeatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        );
        setWeatherData(forecastResponse.data);
        setHourlyWeatherData(forecastResponse.data.list.slice(0, 8));
        setCurrentWeather(currentWeatherResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (city && city.length > 3) {
      fetchWeatherData();
    } else {
      setWeatherData(null);
      setHourlyWeatherData(null);
      setCurrentWeather(null);
    }
  }, [city]);

  const getDaysOfWeek = () => {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const today = new Date().getDay();
    return days.slice(today + 1).concat(days.slice(0, today + 1));
  };

  const filterForecastByDay = (forecastList) => {
    const filteredForecast = [];
    let currentDay = null;

    forecastList.forEach((item) => {
      const date = new Date(item.dt_txt);
      const day = date.getDay();

      if (day !== currentDay) {
        filteredForecast.push(item);
        currentDay = day;
      }
    });

    return filteredForecast;
  };

  // const getWeatherIconUrl = (iconCode) => {
  //   return `https://openweathermap.org/img/w/${iconCode}.png`;
  // };

  const formatHour = (date) => {
    const options = { hour: "numeric", hour12: true };
    return date.toLocaleString("en-US", options);
  };

  const clearInput = () => {
    setCity("");
  };

  

  return (
    <div className="full-width-element">
      <div className="search-input-wrapper">
        <Input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter a Country or City or State"
          className="searchinput"
          prefix={<SearchOutlined className="site-form-item-icon" />}
          suffix={
            <CloseCircleOutlined className="clear-icon" onClick={clearInput} />
          }
          // style={{ width: "73% ", background: "#2355b1" }}
        />
      </div>

      {currentWeather && (
        <div>
          <div
            className="currentfirst"
            style={{
              marginLeft: "250px",
              marginBottom: "30px",
              marginTop: "30px",
            }}
          >
            <div className="currentIconAndTemp">
              <img
                src={weatherIconMapping[currentWeather.weather[0].icon]}
                alt="Current Weather Icon"
                className="weatherIcon"
                // style={{ width: "220px", height: "220px" }}
              />
              <div className="tempAndDescription">
                <h1>{(currentWeather.main.temp - 273.15).toFixed(0)}°</h1>
                <p>
                  {currentWeather.weather[0].description
                    .charAt(0)
                    .toUpperCase() +
                    currentWeather.weather[0].description.slice(1)}{" "}
                  , {currentWeather.name} , {currentWeather.sys.country}
                </p>
              </div>
              <div
                className="minMaxCurrent"
                
              >
                <div className="min" style={{display:"flex"}}>
                <div style={{marginTop:"35px" , marginRight:"30px"}} className="ae au gs gt gu">
                    <svg
                      color="#CBCBCB"
                      fill="currentColor"
                      className="___12fm75w f1w7gpdv fez10in fg4l7m0"
                      aria-hidden="true"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.72 13.7a1 1 0 00-1.43-1.4L13 17.67V4a1 1 0 10-2 0v13.66L5.72 12.3a1 1 0 00-1.43 1.4l6.82 6.93c.5.5 1.3.5 1.78 0l6.83-6.93z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  
                  <h4>Min <br /> <p>{(currentWeather.main.temp_min - 273.15).toFixed(0)}°</p> </h4>
            
                </div>
                <div className="max" >
                <div style={{marginTop:"35px" , marginRight:"30px"}} className="ae au gs gt gu">
                    <svg
                      color="#CBCBCB"
                      fill="currentColor"
                      className="___12fm75w f1w7gpdv fez10in fg4l7m0"
                      aria-hidden="true"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.28 10.3a1 1 0 001.43 1.4L11 6.33V20a1 1 0 102 0V6.33l5.28 5.37a1 1 0 001.43-1.4l-6.82-6.93c-.5-.5-1.3-.5-1.78 0L4.28 10.3z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  <h4>Max <br /> <p> {(currentWeather.main.temp_max - 273.15).toFixed(0)}°</p></h4>
                  
                  
                </div>
              </div>
              <div className="feel">
              <p  className="feelsLike">
            Feels Like {(currentWeather.main.feels_like - 273.15).toFixed(0)}°
          </p>
          </div>
            </div>
          </div>
          <div className="allcurent">
            <div className="firstFourCurrent">
              <div className="thecontent first1">
                <svg
                  color="#83b4cf"
                  fill="currentColor"
                  class="___12fm75w f1w7gpdv fez10in fg4l7m0"
                  aria-hidden="true"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3c3.17 0 4.97 2.1 5.23 4.63h.08a3.69 3.69 0 110 7.37h-.85a.75.75 0 01-.09.17l-1 1.5a.75.75 0 01-1.24-.84l.56-.83h-2.23a.75.75 0 01-.09.17l-1 1.5a.75.75 0 11-1.24-.84l.56-.83H8.46a.75.75 0 01-.09.17l-1 1.5a.75.75 0 01-1.24-.84l.56-.83a3.69 3.69 0 110-7.37h.08A4.95 4.95 0 0112 3zM7.13 18.83a.75.75 0 101.24.84l1-1.5a.75.75 0 10-1.24-.84l-1 1.5zm4.2 1.04a.75.75 0 01-.2-1.04l1-1.5a.75.75 0 111.24.84l-1 1.5a.75.75 0 01-1.04.2z"
                    fill="currentColor"
                  ></path>
                </svg>
                <div>
                  <h3>Chance of Rain</h3>{" "}
                  <span>{currentWeather.clouds.all}%</span>
                </div>
              </div>

              <div className="thecontent first2">
                <img
                  src={upleft}
                  alt=""
                  style={{ width: "22px", height: "22px" }}
                />
                <div>
                  <h3>Wind</h3> <span>{currentWeather.wind.speed} m/s </span>
                </div>
              </div>

              <div className="thecontent first3">
                <svg
                  color="#ffc755"
                  fill="currentColor"
                  class="___12fm75w f1w7gpdv fez10in fg4l7m0"
                  aria-hidden="true"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2c.41 0 .75.34.75.75v.5a.75.75 0 01-1.5 0v-.5c0-.41.34-.75.75-.75zM8 9a4 4 0 118 0 4 4 0 01-8 0zm4.75 5.75a.75.75 0 00-1.5 0v.5a.75.75 0 001.5 0v-.5zM5.75 8a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM17 8.75c0-.41.34-.75.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zM6.72 5.78a.75.75 0 001.06-1.06l-.5-.5a.75.75 0 00-1.06 1.06l.5.5zm1.06 6.44a.75.75 0 00-1.06 0l-.5.5a.75.75 0 101.06 1.06l.5-.5c.3-.3.3-.77 0-1.06zm9.5-6.44a.75.75 0 11-1.06-1.06l.5-.5a.75.75 0 111.06 1.06l-.5.5zm-1.06 6.44c.3-.3.77-.3 1.06 0l.5.5a.75.75 0 11-1.06 1.06l-.5-.5a.75.75 0 010-1.06zm-13 9.62c-.33.25-.8.2-1.06-.12-.4-.51.12-1.06.12-1.06h.02a3.49 3.49 0 01.18-.15l.54-.36A16.78 16.78 0 0112 17.5a16.78 16.78 0 019.7 3.15l.01.01a.75.75 0 01-.93 1.18l-.03-.03a5.63 5.63 0 00-.58-.4A15.28 15.28 0 0012 19a15.28 15.28 0 00-8.75 2.81l-.03.02z"
                    fill="currentColor"
                  ></path>
                </svg>
                <div>
                  <h3> Sunrise </h3>

                  <span>
                    {" "}
                    {new Date(
                      currentWeather.sys.sunrise * 1000
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              <div className="thecontent first4">
                <svg
                  color="#5a7ec6"
                  fill="currentColor"
                  class="___12fm75w f1w7gpdv fez10in fg4l7m0"
                  aria-hidden="true"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.75 2.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zm6.28 2.22c.3.3.3.77 0 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06l1.06-1.06c.3-.3.77-.3 1.06 0zM6.59 13a5.5 5.5 0 1110.82 0h3.84a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5h3.84zm.16 3a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H6.75zm4 3a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5zM4.97 4.97c.3-.3.77-.3 1.06 0l1.06 1.06a.75.75 0 11-1.06 1.06L4.97 6.03a.75.75 0 010-1.06z"
                    fill="currentColor"
                  ></path>
                </svg>
                <div>
                  <h3> Sunset </h3>
                  <span>
                    {" "}
                    {new Date(
                      currentWeather.sys.sunset * 1000
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="secondFourCurrent">
              <div
                className="thecontent second1"
                
              >
                <svg
                  color="#6bbbea"
                  fill="currentColor"
                  class="___12fm75w f1w7gpdv fez10in fg4l7m0"
                  aria-hidden="true"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.47 2.22c.3-.3.77-.3 1.06 0 .4.4 2 2.13 3.5 4.36C17.5 8.78 19 11.63 19 14.25c0 2.52-.75 4.48-2.04 5.8A6.78 6.78 0 0112 22a6.78 6.78 0 01-4.96-1.94C5.74 18.73 5 16.77 5 14.25c0-2.62 1.5-5.46 2.97-7.67 1.5-2.23 3.1-3.96 3.5-4.36z"
                    fill="currentColor"
                  ></path>
                </svg>
                <div>
                  <h3> Humidity</h3>{" "}
                  <span> {currentWeather.main.humidity}% </span>
                </div>
              </div>

              <div
                className="thecontent second2"  >
                <svg
                  color="#db8cea"
                  fill="currentColor"
                  class="___12fm75w f1w7gpdv fez10in fg4l7m0"
                  aria-hidden="true"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 5.5h7a1 1 0 011 .88v7.12a1 1 0 01-2 .12V8.9l-7.3 7.3a1 1 0 01-1.31.08l-.1-.08L9 13.9l-5.28 5.3a1 1 0 01-1.5-1.32l.08-.1 6-6a1 1 0 011.32-.08l.1.08L12 14.1l6.58-6.59H14a1 1 0 01-.99-.88V6.5a1 1 0 01.88-1H21h-7z"
                    fill="currentColor"
                  ></path>
                </svg>
                <div>
                  <h3>Pressure</h3>{" "}
                  <span> {currentWeather.main.pressure} hPa </span>
                </div>
              </div>

              <div
                className="thecontent second3"
                
              >
                <svg
                  color="#78e07d"
                  fill="currentColor"
                  class="___12fm75w f1w7gpdv fez10in fg4l7m0"
                  aria-hidden="true"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.75 9.5a3.25 3.25 0 01.18 6.49h-.2l-.11.01h-.8c.12.31.18.65.18 1 0 1.66-1.26 3-2.93 3-1.3 0-2.23-.63-2.69-1.63a1 1 0 011.77-.93l.1.2c.14.23.37.36.82.36.53 0 .93-.42.93-1a1 1 0 00-.9-1H3a1 1 0 01-.12-2h15.87l.13-.01a1.25 1.25 0 10-1.26-1.8l-.1.23a1 1 0 01-1.83-.8 3.25 3.25 0 013.06-2.13zm-7 2.5H3a1 1 0 01-.12-2h8.87A2.25 2.25 0 109.5 7.75a1 1 0 01-2 0 4.25 4.25 0 114.48 4.24l-.23.01H3h8.75z"
                    fill="currentColor"
                  ></path>
                </svg>
                <div>
                  <h3>Gusts</h3> <span> {currentWeather.wind.gust} m/s </span>
                </div>
              </div>

              <div
                className="thecontent second4"
                
              >
                <img
                  src={clouds}
                  alt=""
                  style={{ width: "22px", height: "22px" }}
                />

                <div>
                  <h3> Clouds </h3> <span> {currentWeather.clouds.all}% </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {hourlyWeatherData && (
        <div  className="hourContainer">
          <h3
            style={{
              color: "white",
              fontSize: "24px",
              fontWeight: "600",
              // marginLeft: "17px",
            }}
          >
            Hourly{" "}
          </h3>
          <div className="hour-container">
            {hourlyWeatherData.map((item) => {
              const date = new Date(item.dt_txt);
              const time = formatHour(date);
              // const iconUrl = getWeatherIconUrl(item.weather[0].icon);
              const iconUrl = weatherIconMapping[item.weather[0].icon];
              return (
                <div key={item.dt} className="hour">
                  <p>{time}</p>
                  <img
                    src={iconUrl}
                    alt="Weather Icon"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <h3>{(item.main.temp - 273.15).toFixed(0)}°</h3>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {loading && <p  style={{color:"white", marginLeft:"300px", marginTop:"50px" , fontSize:"40px"}}>Loading...</p>}
      {weatherData && (
        <div className="containerForday">
          {/* <div style={{display:"flex", justifyContent:"space-evenly", width:"135%"}}> */}
          <h2>
            This week
          </h2>

          <div className="week-container">
            <div className="row1">
              {filterForecastByDay(weatherData.list)
                .slice(0, 3)

                .map((item, index) => {
                  const date = new Date(item.dt_txt);
                  const month = date.toLocaleString("default", {
                    month: "short",
                  });
                  const day = date.getDate();
                  const dayOfWeek = getDaysOfWeek()[date.getDay()];
                  // const iconUrl = getWeatherIconUrl(item.weather[0].icon);
                  const iconUrl = weatherIconMapping[item.weather[0].icon];

                  return (
                    <div key={item.dt} className="day">
                      <div className="dayflex">
                        <img
                          src={iconUrl}
                          alt="Weather Icon"
                          style={{
                            width: "120px",
                            height: "120px",
                            paddingTop: "15px",
                          }}
                          
                        />
                        <div className="dayOfWeek">
                          <h4>{dayOfWeek}</h4>
                          <h5>{`${day} ${month}`}</h5>
                          <div
                            style={{ display: "flex", marginTop: "-35px" }}
                            className="temp"
                          >
                            <p>{(item.main.temp_min - 273.15).toFixed(0)}°</p>
                            <p style={{ marginLeft: "50px" }}>
                              {(item.main.temp_max - 273.15).toFixed(0)}°
                            </p>
                          </div>
                          <div
                            style={{ display: "flex", marginTop: "-45px" }}
                            className="minMax"
                          >
                            <p>min </p>
                            <p style={{ marginLeft: "75px" }}>max </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="row2">
              {filterForecastByDay(weatherData.list)
                .slice(3, 6)
                .map((item, index) => {
                  const date = new Date(item.dt_txt);
                  const month = date.toLocaleString("default", {
                    month: "short",
                  });
                  const day = date.getDate();
                  const dayOfWeek = getDaysOfWeek()[date.getDay()];
                  // const iconUrl = getWeatherIconUrl(item.weather[0].icon);
                  const iconUrl = weatherIconMapping[item.weather[0].icon];

                  return (
                    <div key={item.dt} className="day">
                      <div className="dayflex">
                        <img
                          src={iconUrl}
                          alt="Weather Icon"
                          style={{
                            width: "120px",
                            height: "120px",
                            paddingTop: "15px",
                          }}
                          // className={weatherIconMapping["01n"].className}
                        />
                        <div className="dayOfWeek">
                          <h4>{dayOfWeek}</h4>
                          <h5>{`${day} ${month}`}</h5>
                          <div
                            style={{ display: "flex", marginTop: "-35px" }}
                            className="temp"
                          >
                            <p style={{ marginLeft: "3px" }}>
                              {(item.main.temp_min - 273.15).toFixed(0)}°
                            </p>
                            <p style={{ marginLeft: "50px" }}>
                              {(item.main.temp_max - 273.15).toFixed(0)}°
                            </p>
                          </div>
                          <div
                            style={{ display: "flex", marginTop: "-45px" }}
                            className="minMax"
                          >
                            <p style={{ marginLeft: "3px" }}>min </p>
                            <p style={{ marginLeft: "75px" }}>max </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
