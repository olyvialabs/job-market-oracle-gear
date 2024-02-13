import styles from "./ApiLoader.module.scss";

function ApiLoader() {
  return (
    <p className={styles.loader}>
      👋 Hey! We are initializing the API. If you are stuck in this screen, it
      might be because you need a wallet in your browser
    </p>
  );
}

export { ApiLoader };
