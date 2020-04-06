'use strict';

import assert from 'assert';
import sinon from 'sinon';
import * as api from '../../api';
import AudioContext from '../../api/BaseAudioContext';

describe('api/WaveShaperNode', () => {
  it('context.createWaveShaper()', () => {
    const context = new AudioContext();
    const target = context.createWaveShaper();

    expect(target instanceof api.WaveShaperNode).toBeTruthy();
  });

  describe('atrributes', () => {
    it('.curve=', () => {
      const context = new AudioContext();
      const target = context.createWaveShaper();
      const curve1 = null;
      const curve2 = new Float32Array(128);

      target._impl.getCurve = sinon.spy(() => curve1);
      target._impl.setCurve = sinon.spy();

      expect(target.curve).toBe(curve1);
      expect(target._impl.getCurve.callCount).toBe(1);

      target.curve = curve2;
      expect(target._impl.setCurve.callCount).toBe(1);
      expect(target._impl.setCurve.args[0][0]).toBe(curve2);
    });

    it('.oversample=', () => {
      const context = new AudioContext();
      const target = context.createWaveShaper();
      const oversample1 = 'none';
      const oversample2 = '2x';

      target._impl.getOversample = sinon.spy(() => oversample1);
      target._impl.setOversample = sinon.spy();

      expect(target.oversample).toBe(oversample1);
      expect(target._impl.getOversample.callCount).toBe(1);

      target.oversample = oversample2;
      expect(target._impl.setOversample.callCount).toBe(1);
      expect(target._impl.setOversample.args[0][0]).toBe(oversample2);
    });
  });
});
