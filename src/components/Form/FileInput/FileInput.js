import { forwardRef } from 'react';
import style from './FileInput.module.css';

const FileInput = ({ photo, onChange, error }, ref) => {
  return (
    <div className={style.wrapper}>
      <label
        htmlFor="file"
        className={style.label}
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

      <div className={style.text}>
        {photo?.name || <span>Upload your photo</span>}
      </div>

      {error && (
        <div className={style.error}>{error}</div>
      )}
    </div>
  );
};

export default forwardRef(FileInput);
