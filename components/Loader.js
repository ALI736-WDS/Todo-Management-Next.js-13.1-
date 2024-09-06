import { RotatingLines } from "react-loader-spinner";

//Styles
import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.loader}>
      <RotatingLines
        width="100px"
        height="100px"
        strokeWidth="3"
        strokeColor="#3874ff"
      />
    </div>
  );
}

export default Loader;
