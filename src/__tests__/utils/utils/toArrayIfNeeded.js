'use strict';

import assert from 'assert';
import toArrayIfNeeded from '../../../utils/utils/toArrayIfNeeded';

describe('utils/toArrayIfNeeded(value)', () => {
  it('convert to array if not array', () => {
    const value = 1;
    const actual = toArrayIfNeeded(value);
    const expected = [value];

    assert.deepEqual(actual, expected);
  });

  it('nothing to do if array', () => {
    const value = [1];
    const actual = toArrayIfNeeded(value);
    const expected = value;

    expect(actual).toBe(expected);
  });
});
