/* eslint-disable react-hooks/exhaustive-deps */
// import { useDispatch } from "react-redux"
import { useDispatch, useSelector } from "react-redux";
import { apiKey } from "../Constants/constant";
import { addWeather } from "../Utilities/weatherSlice"
import { useEffect } from "react";

function useGetWeather() {
  const dispatch = useDispatch()
  const selector = useSelector((store) => store.input);
  const { city, country } = selector;
  console.log(city, country);

  const current = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  const foreCaste = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  

  const getWeather = async () => {
    const currentResponse = await fetch(current);
    const currentData = await currentResponse.json();
    console.log("Current Weather:", currentData);

    const forecastResponse = await fetch(foreCaste);
    const forecastData = await forecastResponse.json();
    console.log("Forecast:", forecastData);

    dispatch(addWeather({ current: currentData, forecast: forecastData }));
  };

  useEffect(() => {
      getWeather();
  }, [city,country]);
}

export default useGetWeather;
