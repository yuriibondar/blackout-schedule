import styles from './CurrentAddress.module.css';

const CurrentAddress = ({
  isFavorite,
  selectedStreet,
  selectedHouse,
  onAddToFavorites,
  onRemoveFromFavorites,
}) => {
  return (
    <div className={styles.currentAddress}>
      Адреса: {selectedStreet?.name}
      {selectedHouse && (
        <>
          , {selectedHouse?.name}
          {isFavorite ? (
            <span
              className={`${styles.favoritesRemove} ${styles.favoritesButton}`}
              onClick={() =>
                onRemoveFromFavorites(selectedStreet, selectedHouse)
              }
            ></span>
          ) : (
            <span
              className={`${styles.favoritesAdd} ${styles.favoritesButton}`}
              onClick={() => onAddToFavorites(selectedStreet, selectedHouse)}
            ></span>
          )}
        </>
      )}
    </div>
  );
};

export default CurrentAddress;
