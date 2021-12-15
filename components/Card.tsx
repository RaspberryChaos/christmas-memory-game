import Image from "next/image";
import styles from "../styles/Card.module.css";
import { CardType } from "../pages/game";

type Props = {
  card: CardType;
  handleCardClick: (card: CardType) => void;
};

const Card: React.FC<Props> = ({ card, handleCardClick }) => {
  const handleClick = () => {
    handleCardClick(card);
  };

  return (
    <div
      className={
        card.clicked ? `${styles.card}` : `${styles.card} ${styles.cardBack}`
      }
      onClick={handleClick}
    >
      <Image
        src={card.src}
        alt={card.name}
        width="260"
        height="100"
        layout="fixed"
        className={styles.cardImg}
      />
    </div>
  );
};

export default Card;
