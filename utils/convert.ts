import { ErrorObject } from "@/hooks/useForm";
import { ZodError } from "zod";

export const handleOneLevelZodError = ({ issues }: ZodError<unknown>) => {
    const formData: ErrorObject = {};
  
    issues.forEach(({ path, message }) => {
      formData[path.join("-")] = message;
    });
  
    return formData;
  };