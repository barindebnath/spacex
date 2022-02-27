import { useEffect, useState } from "react";
import styles from "./App.module.css";
import Filters from "./Filters";
import MissionCard from "./MissionCard";

const serialize = (obj) => {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p) && obj[p] && obj[p] !== "null") {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

const getMissions = (successfulLaunch, successfulLanading, launchYear) => {
  let queryParam = serialize({
    land_success: successfulLanading,
    launch_success: successfulLaunch,
    launch_year: launchYear,
  });

  window.history.pushState("", document.title, `/spacex${queryParam ? "?" + queryParam : ""}`);

  return fetch(`https://api.spacexdata.com/v3/launches?limit=100${queryParam ? "&" + queryParam : ""}`)
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
  const launchYears = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];

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

  // on filter state update
  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      getMissions(successfulLaunch, successfulLanading, launchYear).then((response) => {
        Array.isArray(response) && response.length ? setMissions(response) : setMissions([]);
        setIsLoading(false);
      });
    }
  }, [successfulLaunch, successfulLanading, launchYear]);

  // on page load
  useEffect(() => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    const { land_success, launch_success, launch_year } = params;
    setSuccessfulLaunch(launch_success);
    setSuccessfulLanading(land_success);
    setLaunchYear(launch_year);
    console.log(land_success, launch_success, launch_year);
    getMissions(launch_success, land_success, launch_year).then((response) => {
      Array.isArray(response) && response.length ? setMissions(response) : setMissions([]);
      setIsLoading(false);
    });
  }, []);

  // forward and backward navigation
  // useEffect(()=>{
  //   window.onpopstate = function(e){
  //     if(e.state){
  //         document.getElementById("content").innerHTML = e.state.html;
  //         document.title = e.state.pageTitle;
  //     }
  // };
  // })

  return (
    <div className={styles.parentContainer}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ margin: 0, padding: "1rem 0", flex: "1" }}>SpaceX Launch Programs</h2>
        <h2 style={{ margin: "auto" }} className={isLoading ? styles.rotate : ""}>
          🚀
        </h2>
      </div>
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
                return <MissionCard mission={mission} key={index} />;
              })
            : [...Array(20)].map((nan, idx) => {
                return <div className={[styles.skeletonBox, styles.loadingCard].join(" ")} key={idx}></div>;
              })}
        </div>
      </div>
      <h6 style={{ textAlign: "center" }}>Developed by: Barin Debnath</h6>
    </div>
  );
};

export default App;
