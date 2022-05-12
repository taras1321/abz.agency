import { useState } from 'react';
import useValidation from './useValidation';

export default function useInput(fieldName, validations) {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  const valid = useValidation(value, validations, fieldName);

  const onChange = (event) => {
    setValue(event.target.value);
  };
  const onBlur = () => {
    setTouched(true);
  };

  const resetData = () => {
    setValue('');
    setTouched(false);
  };

  return {
    value,
    touched,
    fieldName,
    onChange,
    onBlur,
    resetData,
    ...valid,
  };
}
