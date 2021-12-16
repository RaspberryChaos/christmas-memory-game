import Image from "next/image";
import styles from "../styles/Card.module.css";
import { CardType } from "../pages/game";

type Props = {
  card: CardType;
  handleCardClick: (card: CardType) => void;
  clicked: boolean;
};

const Card: React.FC<Props> = ({ card, handleCardClick, clicked }) => {
  const handleClick = () => {
    handleCardClick(card);
  };

  return (
    <div
      className={
        clicked ? `${styles.card}` : `${styles.card} ${styles.cardBack}`
      }
      onClick={handleClick}
    >
    {clicked && 
      <Image
        src={card.src}
        alt={card.name}
        width="100"
        height="100"
        layout="fixed"
        priority={true}
        className={styles.cardImg}
      />
    }
    </div>
  );
};

export default Card;
