import styles from "./MissionCard.module.css";

const MissionCard = ({ mission }) => {
  return (
    <div className={styles.missionCard}>
      <div className={styles.cardImageContainer}>
        {mission.links?.mission_patch_small && (
          <img src={mission.links.mission_patch_small} className={styles.cardImage} />
        )}
      </div>
      <h4 style={{ color: "#21346C" }}>
        {mission.mission_name} #{mission.flight_number}
      </h4>
      <table>
        <tbody>
          <tr>
            <td>
              <b>Mission Ids:</b>
            </td>
            <td>
              {mission.mission_id.length
                ? mission.mission_id.map((id, idx) => (
                    <span key={id}>
                      {id}
                      {idx + 1 < mission.mission_id.length && ", "}
                    </span>
                  ))
                : "--"}
            </td>
          </tr>
          <tr>
            <td>
              <b>Launch Year:</b>
            </td>
            <td>{mission.launch_year}</td>
          </tr>
          <tr>
            <td>
              <b>Successful Launch:</b>
            </td>
            <td>{mission.launch_success ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td>
              <b>Successful Landing:</b>
            </td>
            <td>{mission.launch_landing ? "Yes" : "No"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MissionCard;
