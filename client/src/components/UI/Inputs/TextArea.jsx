import React from 'react';
import styles from './Styles.module.css';

const TextArea = (props) => {
    return (
        <textarea class={styles.textArea}
            className={styles.textArea}
            {...props}
        />
    );
};

export default TextArea;