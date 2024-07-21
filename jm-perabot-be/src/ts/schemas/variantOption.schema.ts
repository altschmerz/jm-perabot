import { number, object, string } from "yup";

export const variantOptionBodySchema = object().shape({
  name: string().required(),
  stock: number().integer().positive().required(),
});
