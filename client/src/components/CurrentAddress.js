const CurrentAddress = ({
  isFavorite,
  selectedStreet,
  selectedHouse,
  onAddToFavorites,
  onRemoveFromFavorites,
}) => {
  return (
    <div className="selected-address">
      Адреса: {selectedStreet?.name}
      {selectedHouse && (
        <>
          , {selectedHouse?.name}
          {isFavorite ? (
            <span
              className="favorites-remove favorites-button"
              onClick={() =>
                onRemoveFromFavorites(selectedStreet, selectedHouse)
              }
            ></span>
          ) : (
            <span
              className="favorites-add favorites-button"
              onClick={() => onAddToFavorites(selectedStreet, selectedHouse)}
            ></span>
          )}
        </>
      )}
    </div>
  );
};

export default CurrentAddress;
