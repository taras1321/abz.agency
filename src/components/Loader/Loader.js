import loader from '../../assets/preloader.svg';
import style from './Loader.module.css';

const Loader = () => {
  return (
    <div className={style.wrapper}>
      <img src={loader} alt="logo" className={style.loader}/>
    </div>
  );
};

export default Loader;
