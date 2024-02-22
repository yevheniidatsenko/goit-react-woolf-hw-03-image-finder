import styles from './Button.module.css';

export const Button = ({ onLoadMore, hasMore }) => {
  return (
    <div className={styles.Wrapper}>
      <button
        className={styles.Button}
        onClick={onLoadMore}
        disabled={!hasMore}
      >
        Load more
      </button>
    </div>
  );
};
