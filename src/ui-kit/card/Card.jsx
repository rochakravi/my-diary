
import card from './Card.module.css';

const Card = ({ title, content }) => {
    return (
        <div className={card.card}>
            <h2 className={card.title}>{title}</h2>
            <p className={card.content}>{content}</p>
        </div>
    );
};

export default Card;