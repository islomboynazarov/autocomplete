function createAutoComplete(data) {
  const sorted = [...data].sort();

  function findLeft(prefix) {
    let left = 0, right = sorted.length - 1, result = sorted.length;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (sorted[mid] >= prefix) {
        result = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return result;
  }

  function findRight(prefix) {
    const upper = prefix + '\uffff';
    let left = 0, right = sorted.length - 1, result = -1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (sorted[mid] <= upper) {
        result = mid;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return result;
  }

  return function(prefix) {
    if (!prefix) return [...sorted];
    const left = findLeft(prefix);
    const right = findRight(prefix);
    if (left > right) return [];
    return sorted.slice(left, right + 1);
  };
}

module.exports = { createAutoComplete };