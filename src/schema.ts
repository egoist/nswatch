import { z } from "zod";

export const configSchema = z.record(
  z.string(),
  z.union([z.string(), z.array(z.string())])
);
