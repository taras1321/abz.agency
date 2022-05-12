import WithTooltip from '../WithTooltip/WithTooltip';
import style from './Card.module.css';

const Card = ({ card }) => {
  return (
    <div className={style.card}>
      <img src={card.photo} alt="avatar" className={style.img}/>

      <WithTooltip text={card.name}>
        <span className={style.name}>{card.name}</span>
      </WithTooltip>

      <WithTooltip text={card.position}>
        <span className={style.info}>{card.position}</span>
      </WithTooltip>

      <WithTooltip text={card.email}>
        <span className={style.info}>{card.email}</span>
      </WithTooltip>

      <WithTooltip text={card.phone}>
        <span className={style.info}>{card.phone}</span>
      </WithTooltip>
    </div>
  );
};

export default Card;
