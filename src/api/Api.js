export const apiUrl = "https://www.dnd5eapi.co/api/";

export const fetchClassData = async (url, classType) => {
  const classTypeUrl = classType === "subclass" ? "subclasses/" : "classes/";
  try {
    const resultsfetch = await fetch(apiUrl + classTypeUrl + url).then((res) =>
      res.json()
    );
    return resultsfetch;
  } catch (error) {
    console.warn(error);
    return error;
  }
};

export const mockClassTypeData = {
  allClasses: [
    { class: "barbarian", subclass: "berserker" },
    { class: "bard", subclass: "lore" },
    { class: "cleric", subclass: "life" },
    { class: "druid", subclass: "land" },
    { class: "fighter", subclass: "champion" },
    { class: "monk", subclass: "open-hand" },
    { class: "paladin", subclass: "devotion" },
    { class: "ranger", subclass: "hunter" },
    { class: "rogue", subclass: "thief" },
    { class: "sorcerer", subclass: "draconic" },
    { class: "warlock", subclass: "fiend" },
    { class: "wizard", subclass: "evocation" },
  ],
};

// const classes_url = "https://www.dnd5eapi.co/api/classes/";
// const promises = allClasses.map((index) => fetch(classes_url + index));
