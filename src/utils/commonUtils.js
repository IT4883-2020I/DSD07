function isEmptyArray(array) {
  return !array || (Array.isArray(array) && array.length === 0);
}

export {
  isEmptyArray
}
