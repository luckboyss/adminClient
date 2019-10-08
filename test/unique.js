
/* export function unique(arr) {
  return arr.filter(function (item, index, arr) {
    return arr.indexOf(item) === index;
  });
} */


/* export function unique (arr) {
    return Array.from(new Set(arr));
} */

//[0, "0", true, "true", null, "NaN", NaN, undefined, 4, "a", "b", "c", {…}, {…}, ""]

export function unique(arr) {
    var obj = {};
    return arr.filter(function (item, index, arr) {
        return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true);
    });
}
