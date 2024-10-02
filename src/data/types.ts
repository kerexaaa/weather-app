import { z } from "zod";

export const weatherSchema = z.object({
  location: z.object({
    name: z.string(),
    region: z.string(),
    country: z.string(),
    lat: z.number(),
    lon: z.number(),
    tz_id: z.string(),
    localtime: z.string(),
  }),
  current: z.object({
    temp_c: z.number(),
    temp_f: z.number(),
    wind_mph: z.number(),
    wind_kph: z.number(),
    wind_dir: z.string(),
    humidity: z.number(),
    cloud: z.number(),
    condition: z.object({
      text: z.string(),
      icon: z.string(),
    }),
  }),
});

export type Weather = z.infer<typeof weatherSchema>;
