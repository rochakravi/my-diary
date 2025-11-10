
import styles from './Button.module.scss'

const Button = ({ variant, onClick, children }) => {

    const variantMap = {
        primary: styles.primary,
        secondary: styles.secondary,
        // Add more variants as needed
    };
    const buttonClass = variantMap[variant] || styles.button;

    return (
        <button className={buttonClass}>{children}</button>
    )
}

export default Button;

//const buttonClass = variant ? `button ${variant}` : 'button';
//const buttonClass = variant ? styles.primary : styles.button;