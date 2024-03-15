function calledFromWhere(calledFrom, category) {
  let isNewTitle = "";
  let isNew = "";
  let noFurnitures = "";

  if (calledFrom === "newProducts") {
    isNew = "Here you can find our NEW furnitures - elegant, comfortable, functional ...";
    noFurnitures = "Sorry, there are no new furnitures!";
    isNewTitle = "New Furnitures";
  } else if (calledFrom === "search") {
    isNew = "The furniture that meets your criteria ...";
    noFurnitures = "Sorry, there are no furnitures that meets your criteria!";
    isNewTitle = "Found Furnitures";
  } else if (calledFrom === "category") {
    isNew = "The furnitures by category ...";
    noFurnitures = "Sorry, there are no furnitures in this category yet!";
    isNewTitle = `${category}`;
  } else {
    isNew = "Here you can find our furnitures - elegant, comfortable, functional ...";
    noFurnitures = "Sorry, there are no furnitures!";
    isNewTitle = "Our Furnitures";
  }

  return [isNew, noFurnitures, isNewTitle];
}

function excludeCategory(categoryName, category) {
  return category.filter((furniture) => furniture.category != categoryName);
}

function addLocations(categories) {
  const locationArr = ["left", "center", "right", "center"];
  let location = "";
  let j = 0;

  for (let i = 0; i < categories.length; i++) {

    if (i === locationArr.length) j = 0;
    location = locationArr[j];
    j++;
    categories[i].location = location;
  }

  return categories;
}

module.exports = {
  calledFromWhere,
  excludeCategory,
  addLocations,
}