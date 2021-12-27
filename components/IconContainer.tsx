import styles from "../styles/IconContainer.module.css";

const IconContainer:React.FC = ({children}) => {
    return (
        <div className={styles.iconContainer}>
          {children}  
        </div>
    )
}

export default IconContainer;
