import Card from '../Card/Card';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import style from './Cards.module.css';

const Cards = ({ cards, loading, currentPage, totalPages, showMore }) => {
  return (
    <div className={style.wrapper}>
      <h2 className={style.heading}>
        Working with GET request
      </h2>

      {cards.length > 0 && (
        <div className={style.cards}>
          {cards.map(card => (
            <Card key={card.id} card={card}/>
          ))}
        </div>
      )}

      {loading && <Loader/>}

      {currentPage < totalPages && !loading && (
        <Button onClick={showMore}>
          Show more
        </Button>
      )}
    </div>
  );
};

export default Cards;