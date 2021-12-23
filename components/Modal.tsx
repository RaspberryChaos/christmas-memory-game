import styles from "../styles/Modal.module.css";

type Props = {
  title: string;
};

const Modal: React.FC<Props> = ({ children, title }) => {
  return (
    <div className={styles.panel}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </div>
  );
};

export default Modal;
