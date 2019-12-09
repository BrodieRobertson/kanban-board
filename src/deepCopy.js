/**
 * Performs a deep copy on any object that meets the JSON standard
 *
 * @function deepCopy
 * @author [Brodie Robertson](https://github.com/BrodieRobertson)
 * @param object The object being copied
 * @returns A deep copy of an objects
 */
export function deepCopy(object) {
  return JSON.parse(JSON.stringify(object));
}
