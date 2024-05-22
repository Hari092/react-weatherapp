import { useSelector } from "react-redux";
import { imgURL } from "../Constants/constant";

function WeeklyForeCast() {
  const selector = useSelector((store) => store.weather);
  const current = selector.weatherCointainer[0]?.forecast;
  const { list } = current;

  return (
    <div className=" overflow-x-hidden">
      <h1 className="text-2xl font-bold text-red-500">Hourly forecast</h1>
      <div className="flex flex-col md:flex-row md:flex-wrap md:gap-2 justify-between overflow-x-hidden">
      {list && list.map((item) => (
          <div key={item.dt}>
            <h1 className="text-sm text-red-900 font-bold">{item.dt_txt}</h1>
            <div className="md:w-56 ">
              {item.weather && item.weather.map((weatherItem) => (
                <div key={weatherItem.id}>
                  <div className="bg-slate-700 text-white p-2 flex md:rounded-t-lg">
                    <img src={`${imgURL}${weatherItem.icon}@2x.png`} className="h-6 w-6"/>
                    <p>{weatherItem.description}</p>
                  </div>
                </div>
              ))}
              <div className="bg-slate-700 text-white p-2 md:rounded-b-lg">
                <p>Temperature: {item.main.temp}C</p>
                <p>Feels like: {item.main.feels_like}C</p>
                <p>Min Temperature: {item.main.temp_min}C</p>
                <p>Max Temperature: {item.main.temp_max}C</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklyForeCast;
