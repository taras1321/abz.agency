import { useEffect, useRef, useState } from 'react';
import useInput from '../../hooks/useInput';
import Select from './Select/Select';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import Input from './Input/Input';
import FileInput from './FileInput/FileInput';
import style from './Form.module.css';

const Form = ({ token, fetchCards }) => {
  const [loading, setLoading] = useState(false);
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoError, setPhotoError] = useState(false);
  const [showAllErrors, setShowAllErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const name = useInput('name', { minLength: 2 });
  const email = useInput('email', { isEmail: true });
  const phone = useInput('phone', { isPhone: true });

  const fileInputRef = useRef(null);

  useEffect(() => {
    async function fetchPositions() {
      setLoading(true);
      const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions');
      const data = await response.json();

      setLoading(false);
      setPositions(data.positions);
      setSelectedPosition(data.positions[0]);
    }

    fetchPositions();
  }, []);

  function fileUploadHandler(event) {
    setPhotoError(false);
    setPhoto(event.target.files[0]);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setShowAllErrors(true);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('phone', phone.value);
    formData.append('position_id', selectedPosition.id);
    formData.append('photo', photo);

    setFormLoading(true);

    const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users',
      {
        method: 'POST',
        body: formData,
        headers: {
          'Token': token,
        }
      });
    const data = await response.json();

    setFormLoading(false);
    fileInputRef.current.value = '';

    if (data.success) {
      name.resetData();
      email.resetData();
      phone.resetData();
      setPhoto(null);
      setShowAllErrors(false);
      fetchCards();
    } else {
      if (!data.fails) {
        setErrorMessage(data.message);
      }

      Object.keys(data.fails).forEach(item => {
        if (item === 'photo') {
          setPhotoError(data.fails.photo[0]);
        }

        if (item === 'email') {
          email.setError(email.fieldName, data.fails.email[0]);
        }

        if (item === 'phone') {
          phone.setError(phone.fieldName, data.fails.phone[0]);
        }

        if (item === 'name') {
          name.setError(name.fieldName, data.fails.name[0]);
        }
      });
    }
  }

  function isFormValid() {
    return name.inputValid && email.inputValid && phone.inputValid && photo;
  }

  return (
    <div className={style.wrapper}>
      <h2 className={style.heading}>Working with POST request</h2>

      <form className={style.form}>
        <Input
          inputData={name}
          label="Your name"
          showAllErrors={showAllErrors}
          disabled={formLoading}
        />

        <Input
          inputData={email}
          label="Email"
          showAllErrors={showAllErrors}
          disabled={formLoading}
        />

        <Input
          inputData={phone}
          label="Phone"
          helperText="+38 (XXX) XXX - XX - XX"
          showAllErrors={showAllErrors}
          disabled={formLoading}
        />

        <h3 className={style.selectTitle}>Select your position</h3>

        {loading ? (
          <Loader/>
        ) : (
          positions.map(item => (
            <Select
              key={item.id}
              id={item.id}
              name={item.name}
              setSelected={setSelectedPosition}
              selected={selectedPosition}
            />
          ))
        )}

        <FileInput
          photo={photo}
          error={photoError}
          onChange={fileUploadHandler}
          ref={fileInputRef}
        />

        <Button
          onClick={handleSubmit}
          disabled={!isFormValid() || formLoading}
        >
          Sign up
        </Button>

        {errorMessage && (
          <span className={style.formError}>{errorMessage}</span>
        )}
      </form>
    </div>
  );
};

export default Form;
