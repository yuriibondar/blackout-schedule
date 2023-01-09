import styles from './Favorites.module.css'

const Favorites = ({ favorites, onAddressSelected }) => {
  return (
    <div className={styles.container}>
      Обрані адреси:
      <div className={styles.itemsContainer}>
        {favorites && favorites.length > 0 ? (
          favorites.map((address) => (
            <div
              key={`${address.street.id}-${address.house.id}`}
              className={styles.item}
              onClick={() => onAddressSelected(address)}
            >
              {address.street.name}, {address.house.name}
            </div>
          ))
        ) : (
          <div className={styles.empty}>
            Для того, щоб додати адресу до обраних, натисніть{" "}
            <span className={styles.favoritesAdd}></span>{" "} навпроти неї
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
