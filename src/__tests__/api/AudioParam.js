'use strict';

import assert from 'assert';
import sinon from 'sinon';
import AudioContext from '../../api/BaseAudioContext';

describe('api/AudioParam', () => {
  describe('attributes', () => {
    it('.value=', () => {
      const context = new AudioContext();
      const target = context.createGain().gain;
      const value1 = 1;
      const value2 = 0.5;

      target._impl.getValue = sinon.spy(() => value1);
      target._impl.setValue = sinon.spy();

      expect(target.value).toBe(value1);
      expect(target._impl.getValue.callCount).toBe(1);

      target.value = value2;
      expect(target._impl.setValue.callCount).toBe(1);
      expect(target._impl.setValue.args[0][0]).toBe(value2);
    });

    it('.defaultValue', () => {
      const context = new AudioContext();
      const target = context.createGain().gain;
      const defaultValue = 1;

      target._impl.getDefaultValue = sinon.spy(() => defaultValue);

      expect(target.defaultValue).toBe(defaultValue);
      expect(target._impl.getDefaultValue.callCount).toBe(1);
    });
  });

  describe('methods', () => {
    it('.setValueAtTime(value, startTime)', () => {
      const context = new AudioContext();
      const target = context.createGain().gain;
      const value = 0;
      const startTime = 0.5;

      target._impl.setValueAtTime = sinon.spy();

      target.setValueAtTime(value, startTime);
      expect(target._impl.setValueAtTime.callCount).toBe(1);
      expect(target._impl.setValueAtTime.args[0][0]).toBe(value);
      expect(target._impl.setValueAtTime.args[0][1]).toBe(startTime);
    });

    it('.linearRampToValueAtTime(value, endTime)', () => {
      const context = new AudioContext();
      const target = context.createGain().gain;
      const value = 0;
      const endTime = 0.5;

      target._impl.linearRampToValueAtTime = sinon.spy();

      target.linearRampToValueAtTime(value, endTime);
      expect(target._impl.linearRampToValueAtTime.callCount).toBe(1);
      expect(target._impl.linearRampToValueAtTime.args[0][0]).toBe(value);
      expect(target._impl.linearRampToValueAtTime.args[0][1]).toBe(endTime);
    });

    it('.exponentialRampToValueAtTime(value, endTime)', () => {
      const context = new AudioContext();
      const target = context.createGain().gain;
      const value = 0;
      const endTime = 0.5;

      target._impl.exponentialRampToValueAtTime = sinon.spy();

      target.exponentialRampToValueAtTime(value, endTime);
      expect(target._impl.exponentialRampToValueAtTime.callCount).toBe(1);
      expect(target._impl.exponentialRampToValueAtTime.args[0][0]).toBe(value);
      expect(target._impl.exponentialRampToValueAtTime.args[0][1]).toBe(
        endTime,
      );
    });

    it('.setTargetAtTime(target, startTime, timeConstant)', () => {
      const context = new AudioContext();
      const target = context.createGain().gain;
      const targetValue = 0;
      const startTime = 0.5;
      const timeConstant = 2;

      target._impl.setTargetAtTime = sinon.spy();

      target.setTargetAtTime(targetValue, startTime, timeConstant);
      expect(target._impl.setTargetAtTime.callCount).toBe(1);
      expect(target._impl.setTargetAtTime.args[0][0]).toBe(targetValue);
      expect(target._impl.setTargetAtTime.args[0][1]).toBe(startTime);
      expect(target._impl.setTargetAtTime.args[0][2]).toBe(timeConstant);
    });

    it('.setValueCurveAtTime(values, startTime, duration)', () => {
      const context = new AudioContext();
      const target = context.createGain().gain;
      const values = new Float32Array(128);
      const startTime = 0.5;
      const duration = 2;

      target._impl.setValueCurveAtTime = sinon.spy();

      target.setValueCurveAtTime(values, startTime, duration);
      expect(target._impl.setValueCurveAtTime.callCount).toBe(1);
      expect(target._impl.setValueCurveAtTime.args[0][0]).toBe(values);
      expect(target._impl.setValueCurveAtTime.args[0][1]).toBe(startTime);
      expect(target._impl.setValueCurveAtTime.args[0][2]).toBe(duration);
    });

    it('.cancelScheduledValues(startTime)', () => {
      const context = new AudioContext();
      const target = context.createGain().gain;
      const startTime = 0.5;

      target._impl.cancelScheduledValues = sinon.spy();

      target.cancelScheduledValues(startTime);
      expect(target._impl.cancelScheduledValues.callCount).toBe(1);
      expect(target._impl.cancelScheduledValues.args[0][0]).toBe(startTime);
    });
  });
});
