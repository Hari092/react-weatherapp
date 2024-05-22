/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setInput } from "../Utilities/inputSlice";
import useGetWeather from "../Hooks/useGetWeather";
import Button from "../Constants/Button";
import debounce from "lodash.debounce";
import Form from "./Forecast";
function Body() {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const debouncedSetCity = useCallback(debounce((value) => {
    setCity(value);
    value!==null && dispatch(setInput({ city: value, country }));
  }, 1000), [country, dispatch]);

  const debouncedSetCountry = useCallback(debounce((value) => {
    setCountry(value);
    value!==null && dispatch(setInput({ city, country: value }));
  }, 1000), [city, dispatch]);

  const handleCityChange = (e) => {
    debouncedSetCity(e.target.value);
  };

  const handleCountryChange = (e) => {
    debouncedSetCountry(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("City:", city);
    console.log("Country:", country);
    dispatch(setInput({ city, country }));
  };

  useGetWeather();

  return (
    <div className=" md:overflow-hidden">
      <form className="flex gap-3 justify-center p-10 overflow-hidden flex-col md:flex-row" onSubmit={handleSubmit}>
        <input
          onChange={handleCityChange}
          type="text"
          placeholder="City Name"
          required
          className="px-3 rounded-xl"
        />
        <input
          onChange={handleCountryChange}
          type="text"
          placeholder="Country Name"
          required
          className="px-3 rounded-xl"
        />
        <input
          type="text"
          placeholder="nick name"
          className="px-3 rounded-xl"
        />
        <Button type="submit" btnName={"search"} />
      </form>
      <div className=" overflow-hidden">
        <Form/>
      </div>
    </div>
  );
}

export default Body;
