import React, { useState, useEffect, useCallback } from "react";
import styles from "./SpellList.module.scss";
import { ReactComponent as Loading } from "../assets/loader.svg";

function SpellList(props) {
  const { parentClassName, subClassName, isClass } = props;
  const [classSpellList, setClassSpellList] = useState([]);
  const [subClassSpellList, setSubClassSpellList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const fetchClassSpells = useCallback(() => {
    const classUrl = parentClassName ? parentClassName : subClassName;
    fetch("https://www.dnd5eapi.co/api/classes/" + classUrl + "/spells")
      .then((res) => res.json())
      .then((spellData) => {
        setClassSpellList(spellData.results);
        setIsLoaded(true);
      })
      .catch(console.error);
  }, [parentClassName, subClassName]);
  const fetchSubClassSpells = useCallback(() => {
    if (!isClass) {
      const subClassUrl = "subclasses/" + subClassName;
      fetch("https://www.dnd5eapi.co/api/" + subClassUrl)
        .then((res) => res.json())
        .then((classData) => {
          const classDataSpells =
            classData.spells &&
            classData.spells.length &&
            classData.spells.map((i) => i.spell);
          setSubClassSpellList(classDataSpells);
        })
        .catch(console.error);
    }
  }, [isClass, subClassName]);

  // If class get its spells, if subclass get the parent classes spells
  useEffect(() => {
    fetchClassSpells();
  }, [fetchClassSpells]);

  // If it'a subclass, fetch the list of spells
  useEffect(() => {
    fetchSubClassSpells();
  }, [fetchSubClassSpells]);

  if (!isLoaded) {
    return (
      <article>
        <p>
          <Loading />{" "}
        </p>
      </article>
    );
  } else {
    return (
      <>
        {(isClass && (
          <article>
            <strong>Spells: </strong>
            {classSpellList && classSpellList.length > 0 ? (
              <ul>
                {classSpellList.map((spell) => (
                  <li key={spell.index + "-class"}>{spell.name}</li>
                ))}
              </ul>
            ) : (
              <span>No spells found.</span>
            )}
            <br />
            <br />
          </article>
        )) || (
          <div className={styles.spellListContain}>
            <article className={styles.listContain}>
              <strong className={styles.listHeading}>Spells:</strong>
              {subClassSpellList && subClassSpellList.length > 0 ? (
                <ul>
                  {subClassSpellList.map((spell) => (
                    <li key={spell.index + "-subclass"}>{spell.name}</li>
                  ))}
                </ul>
              ) : (
                <p>No spells found.</p>
              )}
            </article>
            <article className={styles.listContain}>
              <strong className={styles.listHeading}>
                <span className={styles.capitalize}>{parentClassName}</span>{" "}
                Class Spells:
              </strong>
              {classSpellList && classSpellList.length > 0 ? (
                <ul>
                  {classSpellList.map((spell) => (
                    <li key={spell.index + "-parent"}>{spell.name}</li>
                  ))}
                </ul>
              ) : (
                <p>No spells found.</p>
              )}
            </article>
          </div>
        )}
      </>
    );
  }
}

export default SpellList;
