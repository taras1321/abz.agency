import { forwardRef } from 'react';
import style from './FileInput.module.css';

const FileInput = ({ photo, onChange, error }, ref) => {
  const labelClasses = [style.label]
  const textClasses = [style.text]

  if (error) {
    labelClasses.push(style.labelError)
    textClasses.push(style.textError)
  }

  return (
    <div className={style.wrapper}>
      <label
        htmlFor="file"
        className={labelClasses.join(' ')}
      >
        Upload
      </label>

      <input
        type="file"
        id="file"
        className={style.file}
        onChange={onChange}
        ref={ref}
      />

      <div className={textClasses.join(' ')}>
        {photo?.name || <span>Upload your photo</span>}
      </div>

      {error && (
        <div className={style.error}>{error}</div>
      )}
    </div>
  );
};

export default forwardRef(FileInput);
