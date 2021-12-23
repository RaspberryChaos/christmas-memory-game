import Image from "next/image";
import styles from "../styles/Card.module.css";
import { CardType } from "../levels";

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
    <div className={styles.card} onClick={handleClick}>
      <Image
        src={card.src}
        alt={card.name}
        width="100"
        height="100"
        layout="intrinsic"
        priority={true}
        className={
          clicked
            ? `${styles.cardFront} ${styles.cardFrontClicked}`
            : `${styles.cardFront}`
        }
      />

      <Image
        src={"/imgs/cardBg.jpg"}
        alt="card back"
        layout="fill"
        priority={true}
        className={
          clicked
            ? `${styles.cardBack} ${styles.cardBackClicked}`
            : `${styles.cardBack}`
        }
      />
    </div>
  );
};

export default Card;
