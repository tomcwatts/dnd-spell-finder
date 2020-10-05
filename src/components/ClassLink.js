import React from "react";
import styles from "./ClassLink.module.scss";

function ClassLink(props) {
  const { classes, subClasses, onActive } = props;
  return (
    <div className={styles.card}>
      {classes && (
        <h3 className={styles.classLink} onClick={() => onActive(classes)}>
          {classes}
        </h3>
      )}
      {classes && (
        <h4
          className={styles.subclassLink}
          onClick={() => onActive(subClasses, true)}
        >
          {subClasses}
        </h4>
      )}
    </div>
  );
}

export default ClassLink;
