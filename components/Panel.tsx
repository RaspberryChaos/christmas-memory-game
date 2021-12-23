import styles from "../styles/Panel.module.css";

type Props = {
  title: string;
};

const Panel: React.FC<Props> = ({ children, title }) => {
  return (
    <div className={styles.panel}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </div>
  );
};

export default Panel;
