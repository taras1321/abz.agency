import React from 'react';
import style from './Input.module.css';

const Input = ({ inputData, label, helperText, showAllErrors, disabled }) => {
  const showError = !inputData.inputValid && (inputData.touched || showAllErrors);

  const inputClasses = [style.input];
  const labelClasses = [style.label];

  if (showError) {
    inputClasses.push(style.inputError);
    labelClasses.push(style.labelError);
  }

  if (inputData.value.length > 0) {
    labelClasses.push(style.active);
  }

  function handleChange(event) {
    inputData.onChange(event);
    inputData.removeError(inputData.fieldName);
  }

  return (
    <div className={style.inputWrap}>
      <input
        id={label}
        type="text"
        className={inputClasses.join(' ')}
        value={inputData.value}
        onChange={handleChange}
        onBlur={inputData.onBlur}
        disabled={disabled}
      />

      <label
        htmlFor={label}
        className={labelClasses.join(' ')}
      >{label}</label>

      {helperText && !showError && (
        <div className={style.helper}>
          {helperText}
        </div>
      )}

      {showError && (
        <div className={style.errorText}>
          {inputData?.errors[0]?.text}
        </div>
      )}
    </div>
  );
};

export default Input;
