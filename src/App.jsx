import { useEffect, useState } from "react";
import styles from "./App.module.css";
import Filters from "./Filters";
import MissionCard from "./MissionCard";

const serialize = (obj) => {
  let str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p) && obj[p] !== null) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p] === false ? "false" : obj[p]));
    }
  return str.join("&");
};

const getMissions = (successfulLaunch, successfulLand, launchYear) => {
  let queryParam = serialize({
    land_success: successfulLand,
    launch_success: successfulLaunch,
    launch_year: launchYear,
  });

  window.history.pushState("", document.title, `/spacex${queryParam ? "?" + queryParam : ""}`);

  return fetch(`https://api.spacexdata.com/v3/launches?limit=100${queryParam ? "&" + queryParam : ""}`)
    .then((data) => {
      return data.json();
    })
    .then((response) => {
      console.log(response[0]);
      return response;
    })
    .catch((error) => {
      console.error(error);
      return error;
    });
};

const launchYears = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];

const App = () => {
  const [missions, setMissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState({
    successfulLaunch: null,
    successfulLand: null,
    year: null,
  });

  const clearFilter = () => {
    setIsLoading(true);
    setFilter({ successfulLaunch: null, successfulLand: null, year: null });
    getMissions(null, null, null).then((response) => {
      Array.isArray(response) && response.length ? setMissions(response) : setMissions([]);
      setIsLoading(false);
    });
  };

  // call API on filter state update
  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      getMissions(filter.successfulLaunch, filter.successfulLand, filter.year).then((response) => {
        Array.isArray(response) && response.length ? setMissions(response) : setMissions([]);
        setIsLoading(false);
      });
    }
  }, [filter]);

  // get filter from URL and call API
  const URL_APIcall = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    const { land_success, launch_success, launch_year } = params;
    setFilter({ successfulLaunch: launch_success, successfulLand: land_success, year: parseInt(launch_year) });
    console.log(land_success, launch_success, launch_year);
    getMissions(launch_success, land_success, launch_year).then((response) => {
      Array.isArray(response) && response.length ? setMissions(response) : setMissions([]);
      setIsLoading(false);
    });
  };

  // on page load
  useEffect(() => URL_APIcall(), []);

  // forward and backward navigation
  useEffect(() => {
    window.onpopstate = (e) => e.state && URL_APIcall();
  });

  return (
    <div className={styles.parentContainer}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ margin: 0, padding: "1rem 0", flex: "1" }}>SpaceX Launch Programs</h2>
        <h2 style={{ margin: "auto" }} className={isLoading ? styles.rotate : ""}>
          {!isLoading && !missions.length && "0 missions found "} 🚀
        </h2>
      </div>
      <div className={styles.container}>
        <Filters
          launchYears={launchYears}
          filter={filter}
          setFilter={setFilter}
          getMissions={getMissions}
          isLoading={isLoading}
          clearFilter={clearFilter}
        />
        <div className={styles.cardContainer}>
          {missions.length && !isLoading
            ? missions.map((mission, index) => {
                return <MissionCard mission={mission} key={index} />;
              })
            : isLoading &&
              [...Array(20)].map((nan, idx) => {
                return <div className={[styles.skeletonBox, styles.loadingCard].join(" ")} key={idx}></div>;
              })}
        </div>
      </div>
      <h6 style={{ textAlign: "center" }}>Developed by: Barin Debnath</h6>
    </div>
  );
};

export default App;
