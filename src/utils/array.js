const compareCaseInsensitive = (a, b) => {
  const la = a.toLowerCase();
  const lb = b.toLowerCase();
  // eslint-disable-next-line no-nested-ternary
  return la > lb ? 1 : lb > la ? -1 : 0;
};

const compareDescencingCaseInsensitive = (a, b) =>
  !compareCaseInsensitive(a, b);

const sortAscending = (arr = []) => [...arr].sort(compareCaseInsensitive);
const sortDescending = (arr = []) =>
  [...arr].sort(compareDescencingCaseInsensitive);

export { sortAscending, sortDescending };
