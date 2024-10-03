import axios from "axios";
import { Weather, weatherSchema } from "./types";

export const fetchData = async (city: string): Promise<Weather> => {
  const url = `https://api.weatherapi.com/v1/current.json?key=40c3b4a710554f71865185229240110&q=${city}&aqi=no`;
  const response = await axios.get<Weather>(url);
  const result = weatherSchema.safeParse(response.data);
  if (!result.success) {
    console.log(result.error.message);
    throw new Error(`An error occured, ${response.status}`);
  }
  return result.data;
};
