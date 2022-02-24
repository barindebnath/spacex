import { useEffect, useState } from "react";
import styles from "./App.module.css";
import Filters from "./Filters";
import MissionCard from "./MissionCard";

const getMissions = (successfulLaunch, successfulLanading, launchYear) => {
  localStorage.setItem("successfulLaunch", successfulLaunch === false ? "0" : successfulLaunch ? "1" : "");
  localStorage.setItem("successfulLanading", successfulLanading === false ? "0" : successfulLanading ? "1" : "");
  localStorage.setItem("launchYear", launchYear ? launchYear : "");

  const landFilter = "&land_success=" + successfulLanading;
  const launchFilter = "&launch_success=" + successfulLaunch;
  const yearFilter = "&launch_year=" + launchYear;

  return fetch(
    `https://api.spacexdata.com/v3/launches?limit=100${successfulLanading !== null && landFilter}${
      successfulLaunch !== null && launchFilter
    }${launchYear !== null && yearFilter}`
  )
    .then((data) => {
      return data.json();
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
      return error;
    });
};

const App = () => {
  const [missions, setMissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [successfulLaunch, setSuccessfulLaunch] = useState(null);
  const [successfulLanading, setSuccessfulLanading] = useState(null);
  const [launchYear, setLaunchYear] = useState(null);
  const launchYears = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];

  const clearFilter = () => {
    setIsLoading(true);
    setLaunchYear(null);
    setSuccessfulLanading(null);
    setSuccessfulLaunch(null);
    getMissions(null, null, null).then((response) => {
      Array.isArray(response) && response.length ? setMissions(response) : setMissions([]);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      getMissions(successfulLaunch, successfulLanading, launchYear).then((response) => {
        Array.isArray(response) && response.length ? setMissions(response) : setMissions([]);
        setIsLoading(false);
      });
    }
  }, [successfulLaunch, successfulLanading, launchYear]);

  useEffect(() => {
    let launch = localStorage.getItem("successfulLaunch");
    let landing = localStorage.getItem("successfulLanading");
    let year = localStorage.getItem("launchYear");
    launch = launch === "0" ? false : launch === "1" ? true : null;
    landing = landing === "0" ? false : landing === "1" ? true : null;
    year = typeof year === "string" && year.length > 0 ? parseInt(year) : null;
    setSuccessfulLaunch(launch);
    setSuccessfulLanading(landing);
    setLaunchYear(year);
    console.log(launch, landing, year);
    getMissions(launch, landing, year).then((response) => {
      Array.isArray(response) && response.length ? setMissions(response) : setMissions([]);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className={styles.parentContainer}>
      <h2 style={{ margin: 0, padding: "1rem 0", textAlign: "center" }}>SpaceX Launch Programs</h2>
      <div className={styles.container}>
        <Filters
          launchYears={launchYears}
          launchYear={launchYear}
          successfulLaunch={successfulLaunch}
          successfulLanading={successfulLanading}
          setLaunchYear={setLaunchYear}
          setSuccessfulLaunch={setSuccessfulLaunch}
          setSuccessfulLanading={setSuccessfulLanading}
          getMissions={getMissions}
          isLoading={isLoading}
          clearFilter={clearFilter}
        />
        <div className={styles.cardContainer}>
          {missions.length && !isLoading
            ? missions.map((mission, index) => {
                return <MissionCard mission={mission} key={index} index={index} />;
              })
            : [...Array(20)].map((nan, idx) => {
                return <div className={styles.loadingCard} key={idx}></div>;
              })}
        </div>
      </div>
      <h6 style={{ textAlign: "center" }}>Developed by: Barin Debnath</h6>
    </div>
  );
};

export default App;
