import { array, object, string } from "yup";
import { variantOptionBodySchema } from "./variantOption.schema";

export const variantBodySchema = object().shape({
  name: string().required(),
  options: array().of(variantOptionBodySchema).min(1).required(),
});
