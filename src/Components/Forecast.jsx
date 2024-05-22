import { useSelector } from "react-redux";
import { WiSunrise } from "react-icons/wi";
import { BsFillSunsetFill } from "react-icons/bs";
import { CiTempHigh } from "react-icons/ci";
import { imgURL } from "../Constants/constant";
import WeeklyForeCast from "./WeeklyForeCast";

function Forecast() {
  const selector = useSelector((store) => store.weather);
  console.log(selector);

  if (!selector || selector.length === 0) {
    return (
      <h1 className="text-center text-4xl font-bold text-red-500">
        Add to see weather
      </h1>
    );
  }

  const current = selector.weatherCointainer[0]?.current;
  console.log(current);

  if (!current || !current.main) {
    return (
      <h1 className="text-center text-4xl font-bold text-red-500">
        No weather data available
      </h1>
    );
  }

  let date = new Date(current?.sys?.sunrise * 1000).toString();
  let data2 = new Date(current?.sys?.sunset * 1000).toString();
  let sunset = data2.slice(16, 24);
  let sunrise = date.slice(16, 24);
  console.log(sunrise);
  return (
    <div className="md:mx-40 flex flex-col gap-3 overflow-x-hidden w-11/12 md:w-auto translate-x-5 md:translate-x-0">
      <div className="bg-blue-50 p-10 rounded-xl overflow-x-hidden">
        <h1 className="font-bold text-2xl text-red-500 flex overflow-hidden">
          {current?.name}-{current?.sys?.country}-
          <CiTempHigh size={25} className=" mt-1" />
          {current?.main?.temp}C
        </h1>
        <div className="flex gap-5 overflow-hidden">
          <h1 className="flex">
            <WiSunrise size={25} /> :{sunrise}AM
          </h1>
          <h1 className="flex">
            <BsFillSunsetFill size={25} /> :{sunset}PM
          </h1>
        </div>
        <div className="flex gap-2 font-bold">
          {current?.weather?.map((weather) => (
            <div key={weather.id} className="flex items-center gap-0">
              <img
                src={`${imgURL}${weather.icon}@2x.png`}
                alt={weather.main}
                className="w-8 h-8"
              />
              <h1>{weather.main}</h1>
            </div>
          ))}
          <h1 className="mt-1 flex gap-1">
            cloudiness:{current?.clouds?.all}%
          </h1>
        </div>
        <div>
          <h1 className="font-bold text-2xl text-red-500 flex flex-row flex-wrap">Weather</h1>
          <ul className="gap-2 text-sm  lg:flex md:flex md:flex-col">
            {Object?.entries(current?.main).map(([key, value]) => (
              <li key={key} className="lg:bg-gray-300 rounded text-black lg:px-2">
                <strong>{key}</strong>: {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-blue-50 p-10 rounded-xl">
        <WeeklyForeCast/>
      </div>
    </div>
  );
}

export default Forecast;
