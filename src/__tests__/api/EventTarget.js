'use strict';


import assert from 'assert';
import sinon from 'sinon';
import AudioContext from '../../api/BaseAudioContext';

describe('api/EventTarget', () => {
  describe('methods', () => {
    it('.addEventListener(type, listener)', () => {
      const context = new AudioContext();
      const target = context.createOscillator();
      const type = 'ended';
      const listener = () => {};

      target._impl.addEventListener = sinon.spy();

      target.addEventListener(type, listener);
      expect(target._impl.addEventListener.callCount).toBe(1);
      expect(target._impl.addEventListener.args[0][0]).toBe(type);
      expect(target._impl.addEventListener.args[0][1]).toBe(listener);
    });

    it('.removeEventListener()', () => {
      const context = new AudioContext();
      const target = context.createOscillator();
      const type = 'ended';
      const listener = sinon.spy();

      target._impl.removeEventListener = sinon.spy();

      target.removeEventListener(type, listener);
      expect(target._impl.removeEventListener.callCount).toBe(1);
      expect(target._impl.removeEventListener.args[0][0]).toBe(type);
      expect(target._impl.removeEventListener.args[0][1]).toBe(listener);
    });
  });
});
