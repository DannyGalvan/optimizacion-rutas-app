import { useEffect, useState } from "react";
import { Alert } from "react-native";

export interface ErrorObject {
  [key: string]: string | undefined;
}

export const useForm = <T>(
  initialForm: T,
  validateForm: (form: T) => ErrorObject,
  peticion: (form: T) => any
) => {
  const [form, setForm] = useState<T>(initialForm);
  const [errors, setErrors] = useState<ErrorObject>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<any>(null);

  useEffect(() => {
    setForm(initialForm);
  }, [initialForm]);

  const handleChange = (text: any, campo: string) => {
    const newForm: T = {
      ...form,
      [campo]: text,
    };
    setForm(newForm);
    setErrors(validateForm(newForm));
  };

  const handleBlur = (text: any, campo: string) => {
    handleChange(text, campo);
  };

  const handleSubmit = async () => {
    setResponse(null);
    const errorsValidate = validateForm(form);
    setErrors(errorsValidate);
    setLoading(true);
    if (Object.keys(errorsValidate).length === 0) {
      try {
        const response = await peticion(form);

        if (response.exito) {
          
          setForm(initialForm);
        }

        setResponse(response);

      } catch (ex: any) {
        Alert.alert("Error", ex.toString());
      }
    } else {
      setResponse(null);
    }
    setLoading(false);
  };

  return {
    form,
    errors,
    loading,
    response,
    handleBlur,
    handleChange,
    handleSubmit,
  };
};
