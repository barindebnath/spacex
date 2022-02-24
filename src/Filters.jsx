import styles from "./Filters.module.css";

const Filters = ({
  launchYears,
  launchYear,
  successfulLaunch,
  successfulLanading,
  setLaunchYear,
  setSuccessfulLaunch,
  setSuccessfulLanading,
  isLoading,
  clearFilter,
}) => {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.filter}>
        <h4>Launch Year</h4>
        <div className={styles.buttonContainer}>
          {launchYears.map((year) => (
            <button
              className={[styles.button, year === launchYear ? styles.activeButton : {}].join(" ")}
              onClick={() => setLaunchYear(year)}
              key={year}
              disabled={isLoading}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filter}>
        <h4>Successfull Launch</h4>
        <div className={styles.buttonContainer}>
          <button
            className={[styles.button, successfulLaunch ? styles.activeButton : {}].join(" ")}
            onClick={() => setSuccessfulLaunch(true)}
            disabled={isLoading}
          >
            True
          </button>
          <button
            className={[styles.button, successfulLaunch === false ? styles.activeButton : {}].join(" ")}
            onClick={() => setSuccessfulLaunch(false)}
            disabled={isLoading}
          >
            False
          </button>
        </div>
      </div>

      <div className={styles.filter}>
        <h4>Successfull Landing</h4>
        <div className={styles.buttonContainer}>
          <button
            className={[styles.button, successfulLanading ? styles.activeButton : {}].join(" ")}
            onClick={() => setSuccessfulLanading(true)}
            disabled={isLoading}
          >
            True
          </button>
          <button
            className={[styles.button, successfulLanading === false ? styles.activeButton : {}].join(" ")}
            onClick={() => setSuccessfulLanading(false)}
            disabled={isLoading}
          >
            False
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: "#21346c", textAlign: "center", borderRadius: ".5rem" }}>
        <button
          className={styles.button}
          onClick={clearFilter}
          style={{ padding: ".5rem", margin: ".5rem" }}
          disabled={isLoading}
        >
          Clear all filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
