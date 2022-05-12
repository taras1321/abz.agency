import Button from '../Button/Button';
import style from './Main.module.css';

const Main = () => {
  return (
    <div className={style.main}>
      <h1 className={style.heading}>
        Test assignment for front-end developer
      </h1>

      <div className={style.description}>
        What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast
        understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They
        should also be excited to learn, as the world of Front-End Development keeps evolving.
      </div>

      <Button>Sign up</Button>
    </div>
  );
};

export default Main;
