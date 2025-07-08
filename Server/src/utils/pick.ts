/**
 * Creates a new object composed of the picked `key` properties.
 *
 * @param obj - The object to pick from.
 * @param keys - The keys to pick.
 *
 * @returns {Object} The new object with the picked properties.
 */
const pick = (obj: object, keys: string[]) => {
  return keys.reduce<{ [key: string]: unknown }>((finalObj, key) => {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key as keyof typeof obj];
    }
    return finalObj;
  }, {});
};

export default pick;
