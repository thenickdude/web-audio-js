'use strict';

import assert from 'assert';
import sinon from 'sinon';
import * as api from '../../api';
import AudioContext from '../../api/BaseAudioContext';

describe('api/ConvolverNode', () => {
  it('context.createConvolver()', () => {
    const context = new AudioContext();
    const target = context.createConvolver();

    expect(target instanceof api.ConvolverNode).toBeTruthy();
  });

  describe('attributes', () => {
    it('.buffer=', () => {
      const context = new AudioContext();
      const target = context.createConvolver();
      const buffer = context.createBuffer(1, 16, 8000);

      target._impl.setBuffer = sinon.spy();

      target.buffer = buffer;
      expect(target.buffer).toBe(buffer);
      expect(target._impl.setBuffer.callCount).toBe(1);
      expect(target._impl.setBuffer.args[0][0]).toBe(buffer);
    });

    it('.normalize=', () => {
      const context = new AudioContext();
      const target = context.createConvolver();
      const normalize1 = true;
      const normalize2 = false;

      target._impl.getNormalize = sinon.spy(() => normalize1);
      target._impl.setNormalize = sinon.spy();

      expect(target.normalize).toBe(normalize1);
      expect(target._impl.getNormalize.callCount).toBe(1);

      target.normalize = normalize2;
      expect(target._impl.setNormalize.callCount).toBe(1);
      expect(target._impl.setNormalize.args[0][0]).toBe(normalize2);
    });
  });
});
