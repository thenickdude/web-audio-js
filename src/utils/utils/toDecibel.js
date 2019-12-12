"use strict";

/**
 * @param {*} value
 * @return {number}
 */
function toDecibel(value) {
  if (value === 0) {
    return -1000;
  }
  return 20 * Math.log10(value);
}

module.exports = toDecibel;
