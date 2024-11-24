import React from 'react';
import styles from './Styles.module.css';

const Input = (props) => {
    return (
        <input
            className={styles.input}
            {...props}
        />
    );
};

export default Input;