import style from './Select.module.css';

const Select = ({ id, name, setSelected, selected }) => {
  return (
    <>
      <input
        type="radio"
        id={id}
        className={style.input}
        value={name}
        checked={selected?.id === id}
        onChange={() => setSelected({ id, name })}
      />
      <label
        htmlFor={id}
        className={style.label}
      >
        {name}
      </label>
    </>
  );
};

export default Select;
