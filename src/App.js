import React, { useState, useEffect, useCallback } from "react";
import { fetchClassData, mockClassTypeData } from "./api/Api";
import ClassLink from "./components/ClassLink";
import styles from "./App.module.scss";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { ReactComponent as Loading } from "./assets/loader.svg";
import { ReactComponent as Close } from "./assets/close.svg";
import SpellList from "./components/SpellList";
import "@reach/dialog/styles.css";

function App() {
  const [activeClassType, setActiveClassType] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [activeClass, setActiveClass] = useState("");
  const [parentClassName, setParentClassName] = useState("");
  const [dialogLoading, setDialogLoading] = useState(true);
  const [showDialog, setShowDialog] = React.useState(false);
  const fetchedClassData = useCallback(() => {
    const fetchedClassData = async () => {
      setSelectedClass(await fetchClassData(activeClass, activeClassType));
      setDialogLoading(false);
    };
    fetchedClassData();
    setDialogLoading(true);
  }, [activeClass, activeClassType]);

  useEffect(() => {
    fetchedClassData();
  }, [fetchedClassData]);

  // Takes a URL to fetch and a boolean if a subclass
  const handleActiveClass = (activeClassUrl, isSubClass) => {
    setShowDialog(true);
    setActiveClass(activeClassUrl);
    setActiveClassType(isSubClass ? "subclass" : "class");
    if (isSubClass) {
      const parentClass = mockClassTypeData.allClasses.filter(
        (parent) => parent.subclass === activeClassUrl
      )[0].class;
      setParentClassName(parentClass);
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setSelectedClass("");
    setActiveClass("");
    setParentClassName("");
  };

  return (
    <>
      <div className={styles.app}>
        <header className={styles.header}>
          <h1 className={styles.heading}>D&D Spell Finder</h1>
        </header>
        <div>
          <DialogOverlay
            isOpen={showDialog}
            onDismiss={handleDialogClose}
            className="Dialog"
          >
            <DialogContent aria-label="class-modal">
              <div className={styles.dialogContent}>
                {dialogLoading ? (
                  <div className={styles.loadContain}>
                    <Loading />
                  </div>
                ) : (
                  selectedClass && (
                    <>
                      <h2>{selectedClass.name}</h2>
                      <span>
                        <strong>Type: </strong>
                        <span className={styles.capitalize}>
                          {activeClassType}
                        </span>
                      </span>
                      <p>{selectedClass.desc}</p>
                      <SpellList
                        subClassName={activeClass}
                        parentClassName={parentClassName}
                        isClass={activeClassType === "subclass" ? false : true}
                      />
                    </>
                  )
                )}
              </div>
              <button
                onClick={() => handleDialogClose()}
                className={styles.closeButton}
              >
                <Close />
              </button>
            </DialogContent>
          </DialogOverlay>
        </div>
        <div className={styles.articles}>
          {mockClassTypeData.allClasses.map((data) => (
            <ClassLink
              key={data.class}
              classes={data.class}
              subClasses={data.subclass}
              onActive={handleActiveClass}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
