'use strict';


import assert from 'assert';
import sinon from 'sinon';
import api from '../../api';
import AudioContext from '../../api/BaseAudioContext';

describe('api/AnalyserNode', () => {
  it('context.createAnalyser()', () => {
    const context = new AudioContext();
    const target = context.createAnalyser();

    expect(target instanceof api.AnalyserNode).toBeTruthy();
  });

  describe('attributes', () => {
    it('.fftSize=', () => {
      const context = new AudioContext();
      const target = context.createAnalyser();
      const fftSize1 = 1024;
      const fftSize2 = 512;

      target._impl.getFftSize = sinon.spy(() => fftSize1);
      target._impl.setFftSize = sinon.spy();

      expect(target.fftSize).toBe(fftSize1);
      expect(target._impl.getFftSize.callCount).toBe(1);

      target.fftSize = fftSize2;
      expect(target._impl.setFftSize.callCount).toBe(1);
      expect(target._impl.setFftSize.args[0][0]).toBe(fftSize2);
    });

    it('.frequencyBinCount', () => {
      const context = new AudioContext();
      const target = context.createAnalyser();
      const frequencyBinCount = 512;

      target._impl.getFrequencyBinCount = sinon.spy(() => frequencyBinCount);

      expect(target.frequencyBinCount).toBe(frequencyBinCount);
      expect(target._impl.getFrequencyBinCount.callCount).toBe(1);
    });

    it('.minDecibels=', () => {
      const context = new AudioContext();
      const target = context.createAnalyser();
      const minDecibels1 = -30;
      const minDecibels2 = -20;

      target._impl.getMinDecibels = sinon.spy(() => minDecibels1);
      target._impl.setMinDecibels = sinon.spy();

      expect(target.minDecibels).toBe(minDecibels1);
      expect(target._impl.getMinDecibels.callCount).toBe(1);

      target.minDecibels = minDecibels2;
      expect(target._impl.setMinDecibels.callCount).toBe(1);
      expect(target._impl.setMinDecibels.args[0][0]).toBe(minDecibels2);
    });

    it('.maxDecibels=', () => {
      const context = new AudioContext();
      const target = context.createAnalyser();
      const maxDecibels1 = -100;
      const maxDecibels2 = -120;

      target._impl.getMaxDecibels = sinon.spy(() => maxDecibels1);
      target._impl.setMaxDecibels = sinon.spy();

      expect(target.maxDecibels).toBe(maxDecibels1);
      expect(target._impl.getMaxDecibels.callCount).toBe(1);

      target.maxDecibels = maxDecibels2;
      expect(target._impl.setMaxDecibels.callCount).toBe(1);
      expect(target._impl.setMaxDecibels.args[0][0]).toBe(maxDecibels2);
    });

    it('.smoothingTimeConstant=', () => {
      const context = new AudioContext();
      const target = context.createAnalyser();
      const smoothingTimeConstant1 = 0.8;
      const smoothingTimeConstant2 = 0.6;

      target._impl.getSmoothingTimeConstant = sinon.spy(
        () => smoothingTimeConstant1,
      );
      target._impl.setSmoothingTimeConstant = sinon.spy();

      expect(target.smoothingTimeConstant).toBe(smoothingTimeConstant1);
      expect(target._impl.getSmoothingTimeConstant.callCount).toBe(1);

      target.smoothingTimeConstant = smoothingTimeConstant2;
      expect(target._impl.setSmoothingTimeConstant.callCount).toBe(1);
      assert(
        target._impl.setSmoothingTimeConstant.args[0][0] ===
          smoothingTimeConstant2,
      );
    });
  });

  describe('methods', () => {
    it('.getFloatFrequencyData(array)', () => {
      const context = new AudioContext();
      const target = context.createAnalyser();
      const array = new Float32Array(128);

      target._impl.getFloatFrequencyData = sinon.spy();

      target.getFloatFrequencyData(array);
      expect(target._impl.getFloatFrequencyData.callCount).toBe(1);
      expect(target._impl.getFloatFrequencyData.args[0][0]).toBe(array);
    });

    it('.getByteFrequencyData(array)', () => {
      const context = new AudioContext();
      const target = context.createAnalyser();
      const array = new Uint8Array(128);

      target._impl.getByteFrequencyData = sinon.spy();

      target.getByteFrequencyData(array);
      expect(target._impl.getByteFrequencyData.callCount).toBe(1);
      expect(target._impl.getByteFrequencyData.args[0][0]).toBe(array);
    });

    it('.getFloatTimeDomainData(array)', () => {
      const context = new AudioContext();
      const target = context.createAnalyser();
      const array = new Float32Array(128);

      target._impl.getFloatTimeDomainData = sinon.spy();

      target.getFloatTimeDomainData(array);
      expect(target._impl.getFloatTimeDomainData.callCount).toBe(1);
      expect(target._impl.getFloatTimeDomainData.args[0][0]).toBe(array);
    });

    it('.getByteTimeDomainData(array)', () => {
      const context = new AudioContext();
      const target = context.createAnalyser();
      const array = new Uint8Array(128);

      target._impl.getByteTimeDomainData = sinon.spy();

      target.getByteTimeDomainData(array);
      expect(target._impl.getByteTimeDomainData.callCount).toBe(1);
      expect(target._impl.getByteTimeDomainData.args[0][0]).toBe(array);
    });
  });
});
