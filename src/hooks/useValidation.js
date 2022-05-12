import { useEffect, useState } from 'react';

export default function useValidation(value, validations, fieldName) {
  const [errors, setErrors] = useState([]);
  const [inputValid, setInputValid] = useState(true);

  const setError = (name, text) => {
    setErrors((prevErrors) => {
      if (prevErrors.find((error) => error.name === name)) {
        return prevErrors;
      }

      return [...prevErrors, { name, text }];
    });
  };

  const removeError = (name) => {
    setErrors((prevErrors) => {
      if (!prevErrors.find((error) => error.name === name)) {
        return prevErrors;
      }

      return [...prevErrors.filter((error) => error.name !== name)];
    });
  };

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          const minLength = validations[validation];
          value.length < minLength
            ? setError(validation, `The ${fieldName} must be at least ${minLength} characters.`)
            : removeError(validation);
          break;

        case 'isEmail':
          value.match(
            /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
            ? removeError(validation)
            : setError(validation, 'The email format is invalid.');
          break;

        case 'isPhone':
          value.match(/^[0-9\-\\+]{9,15}$/)
            ? removeError(validation)
            : setError(validation, 'The phone format is invalid.');
          break;

        default:
          break;
      }
    }
  }, [value, validations, fieldName]);

  useEffect(() => {
    if (errors.length) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [errors]);

  return {
    errors,
    inputValid,
    setError,
    removeError,
  };
}
