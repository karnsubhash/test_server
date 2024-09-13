const getUniqueElementArray = (array, criteria) => {
  //CODE TO FIND UNIQUE ROWS IN ARRAY OF OBJECTS
  if (!array) return [];

  const unique = array.filter(
    (item, index) =>
      array.findIndex((x) => x[criteria] === item[criteria]) === index
  );
  return unique;
};
