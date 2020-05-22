import { useState } from "react";

/**
 * Custom hook for controlled form elements
 *
 * @param {object} initialValues
 */
export const useForm = initialValues => {
  const [values, setValues] = useState(initialValues);

  return [
    values,
    e => {
      setValues({
        ...values,
        [e.target.name]: e.target.value
      });
    }
  ];
};
