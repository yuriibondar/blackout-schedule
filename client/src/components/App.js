import React, { useState, useEffect } from "react";
import useSchedule from "../hooks/useSchedule";
import "./App.css";
import SearchHouseInput from "./SearchHouseInput";
import SearchStreetInput from "./SearchStreetInput";
import { useCookies } from "react-cookie";

function App() {
  const [schedule, fetchSchedule] = useSchedule(null);
  const [queueNumber, setQueueNumber] = useState(null);
  const [houseSearchterm, setHouseSearchterm] = useState("");

  const [selectedStreet, setSelectedStreet] = useState(null);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [addressHistory, setAddressHistory] = useState([]);
  // const [favorites, setFavorites] = useState([]);
  const [cookies, setCookie] = useCookies(["favorites"]);

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

  const defaultAddress = {
    city_id: "510100000",
    street_id: "1761",
    house_id: "43820",
  };

  const addressYunosti = {
    city_id: "510100000",
    street_id: "1783",
    house_id: "48666",
    form_id: "disconnection_detailed_search_form",
  };

  const addressChornovola = {
    city_id: "510100000",
    street_id: "1761",
    house_id: "43820",
    form_id: "disconnection_detailed_search_form",
  };
  const addressAtb = {
    city_id: "510100000",
    street_id: "1334",
    house_id: "43729",
    form_id: "disconnection_detailed_search_form",
  };

  const fetchScheduleForAddress = (address = addressChornovola) => {
    fetchSchedule(address);
  };

  const onStreetSelected = (id, name) => {
    console.log("selectedId", id, "selectedName", name);
    setSelectedStreet({ id, name });
    setHouseSearchterm("");
  };
  const onHouseSelected = (id, name) => {
    console.log("selectedHouseId", id, "selectedHouseName", name);
    setSelectedHouse({ id, name });
  };

  const onAddressSelected = (address) => {
    setSelectedStreet({ id: address.street.id, name: address.street.name });
    setSelectedHouse({ id: address.house.id, name: address.house.name });
  };

  const onAddToFavorites = (street, house) => {
    // setFavorites((prev) => [
    //   ...prev,
    //   {
    //     street: { id: street.id, name: street.name },
    //     house: { id: house.id, name: house.name },
    //   },
    // ]);
    setCookie("favorites", [
      ...(cookies.favorites || []),
      {
        street: { id: street.id, name: street.name },
        house: { id: house.id, name: house.name },
      },
    ], {path: "/"});
  };

  const onRemoveFromFavorites = (street, house) => {
    // setFavorites((prev) =>
    //   prev.filter((a) => a.street.id !== street.id || a.house.id !== house.id)
    // );
    
    setCookie("favorites", cookies.favorites.filter((a) => a.street.id !== street.id || a.house.id !== house.id));
  };

  return (
    <div className="App">
      <button onClick={() => fetchScheduleForAddress(addressChornovola)}>
        Fetch Chornovola
      </button>
      <button onClick={() => fetchScheduleForAddress(addressAtb)}>
        Fetch ATB
      </button>
      <button onClick={() => fetchScheduleForAddress(addressYunosti)}>
        Fetch Yunosti
      </button>

      <div>
        <div className="page-title">
          Онлайн графік погодинних відключень м.Вінниця
        </div>
        <div className="site-main-container">
          <div style={{ display: "none" }}>
            Історія пошуку:
            {addressHistory.map((address) => (
              <div
                className="queue-number"
                onClick={() => onAddressSelected(address)}
              >
                {address.street.name + address.house.name}
              </div>
            ))}
          </div>

          <div className="favorites-container">
            Обрані адреси:
            <div className="favorites-items-container">
              {cookies.favorites && cookies.favorites.length > 0 ? (
                cookies.favorites.map((address) => (
                  <div
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
          <div className="custom-fields-wrapper">
            <div className="field-container">
              <SearchStreetInput onSelected={onStreetSelected} />
            </div>
            <div className="field-container">
              <SearchHouseInput
                streetId={selectedStreet && selectedStreet.id}
                value={houseSearchterm}
                onSelected={onHouseSelected}
              />
              {/* <input type="text" placeholder="Будинок"/> */}
            </div>
          </div>

          <div className="queue-number">
            Адреса: {selectedStreet?.name}
            {selectedHouse && (
              <>
                , {selectedHouse?.name}
                {cookies.favorites?.some(
                  (addr) =>
                    addr.street.id === selectedStreet.id &&
                    addr.house.id === selectedHouse.id
                ) ? (
                  <span
                    className="favorites-remove favorites-button"
                    onClick={() =>
                      onRemoveFromFavorites(selectedStreet, selectedHouse)
                    }
                  ></span>
                ) : (
                  <span
                    className="favorites-add favorites-button"
                    onClick={() =>
                      onAddToFavorites(selectedStreet, selectedHouse)
                    }
                  ></span>
                )}
              </>
            )}
          </div>
          <div className="queue-number">Номер черги: {queueNumber}</div>
          <div
            id="scheduleContainer"
            dangerouslySetInnerHTML={{ __html: schedule }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
