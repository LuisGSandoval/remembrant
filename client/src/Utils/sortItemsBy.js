export const sortItems = (arr, orderBy) => {
  if (orderBy === 'date') {
    return arr.sort(
      (a, b) =>
        new Date(a.executionDate).getTime() -
        new Date(b.executionDate).getTime()
    );
  } else if (orderBy === 'priority') {
    return arr.sort((a, b) => b.priority - a.priority);
  } else if (orderBy === 'finished') {
    return arr.filter(ele => ele.finishedTask === true);
  } else if (orderBy === 'pending') {
    return arr.filter(ele => ele.finishedTask === false);
  } else {
    return arr.sort((a, b) => a.finishedTask - b.finishedTask);
  }
};
