import React, { useState, useEffect } from "react";
import useSchedule from "../hooks/useSchedule";
import styles from "./App.module.css";
import SearchHouseInput from "./SearchInput/SearchHouseInput";
import SearchStreetInput from "./SearchInput/SearchStreetInput";
import { useCookies } from "react-cookie";
import FadeLoader from "react-spinners/FadeLoader";
import Favorites from "./Favorites/Favorites";
import CurrentAddress from "./CurrentAddress/CurrentAddress";
import ExternalScheduleTable from "./ExternalScheduleTable/ExternalScheduleTable";
import { Analytics } from "@vercel/analytics/react"

const spinnerCssOverride = {
  display: "block",
  margin: "0 auto",
  left: "25px",
};

function App() {
  const [schedule, fetchSchedule, resetSchedule, isLoading] = useSchedule(null);
  const [queueNumber, setQueueNumber] = useState(null);
  const [selectedStreet, setSelectedStreet] = useState(null);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [addressHistory, setAddressHistory] = useState([]);
  const [cookies, setCookie] = useCookies(["favorites"]);
  const maxCookiesExpirationDate = new Date(2147483647 * 1000);

  useEffect(() => {
    setQueueNumber(document.querySelector('[title^="Номер черги"]')?.innerText);
  }, [schedule]);

  useEffect(() => {
    if (selectedHouse && selectedHouse.id) {
      fetchSchedule(selectedStreet.id, selectedHouse.id);

      setAddressHistory((prev) => [
        ...prev,
        {
          street: { id: selectedStreet.id, name: selectedStreet.name },
          house: { id: selectedHouse.id, name: selectedHouse.name },
        },
      ]);
    }
  }, [selectedHouse]);

  const onStreetSelected = (id, name) => {
    setSelectedStreet({ id, name });
    setSelectedHouse(null);
    resetSchedule();
  };
  const onHouseSelected = (id, name) => {
    setSelectedHouse({ id, name });
  };

  const onAddressSelected = (address) => {
    setSelectedStreet({ id: address.street.id, name: address.street.name });
    setSelectedHouse({ id: address.house.id, name: address.house.name });
  };

  const onAddToFavorites = (street, house) => {
    setCookie(
      "favorites",
      [
        ...(cookies.favorites || []),
        {
          street: { id: street.id, name: street.name },
          house: { id: house.id, name: house.name },
        },
      ],
      { path: "/", expires: maxCookiesExpirationDate }
    );
  };

  const onRemoveFromFavorites = (street, house) => {
    setCookie(
      "favorites",
      cookies.favorites.filter(
        (a) => a.street.id !== street.id || a.house.id !== house.id
      ),
      { path: "/", expires: maxCookiesExpirationDate }
    );
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.title}>
        Онлайн графік погодинних відключень м.Вінниця
      </div>
      <div className={styles.mainContentContainer}>
        <div style={{ display: "none" }}>
          Історія пошуку:
          {addressHistory.map((address, index) => (
            <div
              key={`${index}-${address.street.id}-${address.house.id}`}
              className={styles.queueNumber}
              onClick={() => onAddressSelected(address)}
            >
              {address.street.name + address.house.name}
            </div>
          ))}
        </div>
        <Favorites
          favorites={cookies.favorites}
          onAddressSelected={onAddressSelected}
        />
        <div className={styles.fieldsWrapper}>
          <div className={styles.fieldContainer}>
            <SearchStreetInput
              value={selectedStreet ? selectedStreet.name : ""}
              onSelected={onStreetSelected}
            />
          </div>
          <div className={styles.fieldContainer}>
            <SearchHouseInput
              streetId={selectedStreet && selectedStreet.id}
              value={selectedHouse ? selectedHouse.name : ""}
              onSelected={onHouseSelected}
            />
          </div>
        </div>
        <FadeLoader
          loading={isLoading}
          color="#F25E1D"
          cssOverride={spinnerCssOverride}
        />
        {schedule && !isLoading && (
          <>
            <CurrentAddress
              isFavorite={cookies.favorites?.some(
                (addr) =>
                  selectedStreet &&
                  selectedHouse &&
                  addr.street.id === selectedStreet.id &&
                  addr.house.id === selectedHouse.id
              )}
              selectedStreet={selectedStreet}
              selectedHouse={selectedHouse}
              onAddToFavorites={onAddToFavorites}
              onRemoveFromFavorites={onRemoveFromFavorites}
            />
            <div className={styles.queueNumber}>Номер черги: {queueNumber}</div>
            <ExternalScheduleTable schedule={schedule} />
          </>
        )}
      </div>
      <Analytics mode="development"/>
    </div>
  );
}

export default App;
