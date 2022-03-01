import styles from "./Filters.module.css";

const Filters = ({ filter, setFilter, launchYears, isLoading, clearFilter }) => {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.filter}>
        <h4>Launch Year</h4>
        <div className={styles.buttonContainer}>
          {launchYears.map((year) => (
            <button
              className={[
                styles.button,
                year === filter.year ? styles.active : "",
                isLoading ? styles.disabled : "",
              ].join(" ")}
              onClick={() => setFilter({ ...filter, year })}
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
            className={[
              styles.button,
              filter.successfulLaunch ? styles.active : "",
              isLoading ? styles.disabled : "",
            ].join(" ")}
            onClick={() => setFilter({ ...filter, successfulLaunch: true })}
            disabled={isLoading}
          >
            True
          </button>
          <button
            className={[
              styles.button,
              filter.successfulLaunch === false ? styles.active : "",
              isLoading ? styles.disabled : "",
            ].join(" ")}
            onClick={() => setFilter({ ...filter, successfulLaunch: false })}
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
            className={[
              styles.button,
              filter.successfulLand ? styles.active : "",
              isLoading ? styles.disabled : "",
            ].join(" ")}
            onClick={() => setFilter({ ...filter, successfulLand: true })}
            disabled={isLoading}
          >
            True
          </button>
          <button
            className={[
              styles.button,
              filter.successfulLand === false ? styles.active : "",
              isLoading ? styles.disabled : "",
            ].join(" ")}
            onClick={() => setFilter({ ...filter, successfulLand: false })}
            disabled={isLoading}
          >
            False
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: "#21346c", textAlign: "center", borderRadius: ".5rem" }}>
        <button
          className={[styles.button, isLoading ? styles.disabled : ""].join(" ")}
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
