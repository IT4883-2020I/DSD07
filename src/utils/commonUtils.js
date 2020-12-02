function isEmptyArray(array) {
  return !array || (Array.isArray(array) && array.length === 0);
}

/**
 * 
 * @param {Object} section 
 */
function isValidSection(section) {
  const { type, format, text, headers, records, alt, url } = section;
  // Check type
  if (!['text', 'text-key', 'table', 'image', 'predefined-section'].includes(type)) return false;
  // Check text
  if (type === 'text' || type === 'text-key') {
    if (!['header', 'paragraph', 'quote'].includes(format)) return false;
    if (text && typeof text !== 'string') return false;
  }
  // Check table
  if (type == 'table') {
    if (headers && !Array.isArray(headers)) return false;
    if (records && !Array.isArray(records)) return false;
  }
  // Check image
  if (type == 'image') {
    if (alt && typeof alt !== 'string') return false;
    if (url && typeof url !== 'string') return false;
  }
  return true;
}

export {
  isEmptyArray,
  isValidSection
}
