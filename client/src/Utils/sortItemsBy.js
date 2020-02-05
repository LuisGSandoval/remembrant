export const sortItems = (arr, type, finished) => {
  let newArr = [];

  // By type
  if (type === 'executionDate') {
    newArr = arr.sort(
      (a, b) =>
        new Date(a.executionDate).getTime() -
        new Date(b.executionDate).getTime()
    );
  } else if (type === 'dateRegistered') {
    newArr = arr.sort(
      (a, b) =>
        new Date(a.dateRegistered).getTime() -
        new Date(b.dateRegistered).getTime()
    );
  } else if (type === 'priority') {
    newArr = arr.sort((a, b) => b.priority - a.priority);
  }

  // Finished
  if (finished === 'true') {
    newArr = newArr.filter(ele => ele.finishedTask === true);
  } else if (finished === 'false') {
    newArr = newArr.filter(ele => ele.finishedTask === false);
  } else {
    newArr = newArr.sort((a, b) => a.finishedTask - b.finishedTask);
  }
  return newArr;
};
