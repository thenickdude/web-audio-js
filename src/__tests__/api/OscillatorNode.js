'use strict';


import assert from 'assert';
import sinon from 'sinon';
import api from '../../api';
import AudioContext from '../../api/BaseAudioContext';
import AudioParam from '../../api/AudioParam';

describe('api/OscillatorNode', () => {
  it('context.createOscillator()', () => {
    const context = new AudioContext();
    const target = context.createOscillator();

    expect(target instanceof api.OscillatorNode).toBeTruthy();
    expect(target instanceof api.AudioScheduledSourceNode).toBeTruthy();
  });

  describe('attributes', () => {
    it('.type=', () => {
      const context = new AudioContext();
      const target = context.createOscillator();
      const type1 = 'sine';
      const type2 = 'sawtooth';

      target._impl.getType = sinon.spy(() => type1);
      target._impl.setType = sinon.spy();

      expect(target.type).toBe(type1);
      expect(target._impl.getType.callCount).toBe(1);

      target.type = type2;
      expect(target._impl.setType.callCount).toBe(1);
      expect(target._impl.setType.args[0][0]).toBe(type2);
    });

    it('.frequency', () => {
      const context = new AudioContext();
      const target = context.createOscillator();

      expect(target.frequency instanceof AudioParam).toBeTruthy();
      expect(target.frequency).toBe(target._impl.$frequency);
    });

    it('.detune', () => {
      const context = new AudioContext();
      const target = context.createOscillator();

      expect(target.detune instanceof AudioParam).toBeTruthy();
      expect(target.detune).toBe(target._impl.$detune);
    });

    it('.onended=', () => {
      const context = new AudioContext();
      const target = context.createOscillator();
      const callback1 = sinon.spy();
      const callback2 = sinon.spy();
      const callback3 = sinon.spy();
      const event = { type: 'ended' };

      target.onended = callback1;
      target.onended = callback2;
      target.addEventListener('ended', callback3);
      target._impl.dispatchEvent(event);

      expect(target.onended).toBe(callback2);
      expect(callback1.callCount).toBe(0);
      expect(callback2.callCount).toBe(1);
      expect(callback3.callCount).toBe(1);
      expect(callback2.args[0][0]).toBe(event);
      expect(callback3.args[0][0]).toBe(event);
    });
  });

  describe('methods', () => {
    it('.start(when)', () => {
      const context = new AudioContext();
      const target = context.createOscillator();
      const when = 0;

      target._impl.start = sinon.spy();

      target.start(when);
      expect(target._impl.start.callCount).toBe(1);
      expect(target._impl.start.args[0][0]).toBe(when);
    });

    it('.stop(when)', () => {
      const context = new AudioContext();
      const target = context.createOscillator();
      const when = 0;

      target._impl.stop = sinon.spy();

      target.stop(when);
      expect(target._impl.stop.callCount).toBe(1);
      expect(target._impl.stop.args[0][0]).toBe(when);
    });

    it('.setPeriodicWave(periodicWave)', () => {
      const context = new AudioContext();
      const target = context.createOscillator();
      const real = new Float32Array(16);
      const imag = new Float32Array(16);
      const periodicWave = context.createPeriodicWave(real, imag);

      target._impl.setPeriodicWave = sinon.spy();

      target.setPeriodicWave(periodicWave);
      expect(target._impl.setPeriodicWave.callCount).toBe(1);
      expect(target._impl.setPeriodicWave.args[0][0]).toBe(periodicWave);
    });
  });
});
