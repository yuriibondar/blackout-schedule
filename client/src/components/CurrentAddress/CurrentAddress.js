import styles from './CurrentAddress.module.css';

const CurrentAddress = ({
  isFavorite,
  selectedStreet,
  selectedHouse,
  onAddToFavorites,
  onRemoveFromFavorites,
}) => {
  return (
    <div className={styles.container}>
      Адреса: {selectedStreet?.name || "<оберіть вулицю>"}, {selectedHouse?.name || "<оберіть будинок>"}
      {selectedStreet && selectedHouse && (
        <>          
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
