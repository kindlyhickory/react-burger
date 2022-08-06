import React from "react";
import styles from "./loader.module.css"

function Loader({text}) {

  return (
    <div className={`${styles.loaderContainer}`}>
      <div className={styles.loader}>
      </div>
      <p className="text text_type_main-medium">
        {text}
      </p>
    </div>

  )
}

export default Loader;