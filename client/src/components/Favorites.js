const Favorites = ({ favorites, onAddressSelected }) => {
  return (
    <div className="favorites-container">
      Обрані адреси:
      <div className="favorites-items-container">
        {favorites && favorites.length > 0 ? (
          favorites.map((address) => (
            <div
              key={`${address.street.id}-${address.house.id}`}
              className="favorites-item"
              onClick={() => onAddressSelected(address)}
            >
              {address.street.name}, {address.house.name}
            </div>
          ))
        ) : (
          <div className="favorites-empty">
            Для того, щоб додати адресу до обраних, натисніть{" "}
            <span className="favorites-add"></span>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
