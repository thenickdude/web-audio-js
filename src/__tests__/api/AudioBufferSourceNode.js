'use strict';

import assert from 'assert';
import sinon from 'sinon';
import * as api from '../../api';
import AudioContext from '../../api/BaseAudioContext';
import AudioParam from '../../api/AudioParam';

describe('api/AudioBufferSourceNode', () => {
  it('context.createBufferSource()', () => {
    const context = new AudioContext();
    const target = context.createBufferSource();

    expect(target instanceof api.AudioBufferSourceNode).toBeTruthy();
    expect(target instanceof api.AudioScheduledSourceNode).toBeTruthy();
  });

  describe('attributes', () => {
    it('.buffer=', () => {
      const context = new AudioContext();
      const target = context.createBufferSource();
      const buffer = context.createBuffer(1, 16, 8000);

      target._impl.setBuffer = sinon.spy();

      target.buffer = buffer;
      expect(target.buffer).toBe(buffer);
      expect(target._impl.setBuffer.callCount).toBe(1);
      expect(target._impl.setBuffer.args[0][0]).toBe(buffer);
    });

    it('.playbackRate', () => {
      const context = new AudioContext();
      const target = context.createBufferSource();

      expect(target.playbackRate instanceof AudioParam).toBeTruthy();
      expect(target.playbackRate).toBe(target._impl.$playbackRate);
    });

    it('.detune', () => {
      const context = new AudioContext();
      const target = context.createBufferSource();

      expect(target.detune instanceof AudioParam).toBeTruthy();
      expect(target.detune).toBe(target._impl.$detune);
    });

    it('.loop=', () => {
      const context = new AudioContext();
      const target = context.createBufferSource();
      const loop1 = false;
      const loop2 = true;

      target._impl.getLoop = sinon.spy(() => loop1);
      target._impl.setLoop = sinon.spy();

      expect(target.loop).toBe(loop1);
      expect(target._impl.getLoop.callCount).toBe(1);

      target.loop = loop2;
      expect(target._impl.setLoop.callCount).toBe(1);
      expect(target._impl.setLoop.args[0][0]).toBe(loop2);
    });

    it('.loopStart=', () => {
      const context = new AudioContext();
      const target = context.createBufferSource();
      const loopStart1 = 0;
      const loopStart2 = 1;

      target._impl.getLoopStart = sinon.spy(() => loopStart1);
      target._impl.setLoopStart = sinon.spy();

      expect(target.loopStart).toBe(loopStart1);
      expect(target._impl.getLoopStart.callCount).toBe(1);

      target.loopStart = loopStart2;
      expect(target._impl.setLoopStart.callCount).toBe(1);
      expect(target._impl.setLoopStart.args[0][0]).toBe(loopStart2);
    });

    it('.loopEnd=', () => {
      const context = new AudioContext();
      const target = context.createBufferSource();
      const loopEnd1 = 0;
      const loopEnd2 = 1;

      target._impl.getLoopEnd = sinon.spy(() => loopEnd1);
      target._impl.setLoopEnd = sinon.spy();

      expect(target.loopEnd).toBe(loopEnd1);
      expect(target._impl.getLoopEnd.callCount).toBe(1);

      target.loopEnd = loopEnd2;
      expect(target._impl.setLoopEnd.callCount).toBe(1);
      expect(target._impl.setLoopEnd.args[0][0]).toBe(loopEnd2);
    });

    it('.onended=', () => {
      const context = new AudioContext();
      const target = context.createBufferSource();
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
    it('.start(when, offset, duration)', () => {
      const context = new AudioContext();
      const target = context.createBufferSource();
      const when = 0;
      const offset = 1;
      const duration = 2;

      target._impl.start = sinon.spy();

      target.start(when, offset, duration);
      expect(target._impl.start.callCount).toBe(1);
      expect(target._impl.start.args[0][0]).toBe(when);
      expect(target._impl.start.args[0][1]).toBe(offset);
      expect(target._impl.start.args[0][2]).toBe(duration);
    });

    it('.stop(when)', () => {
      const context = new AudioContext();
      const target = context.createBufferSource();
      const when = 0;

      target._impl.stop = sinon.spy();

      target.stop(when);
      expect(target._impl.stop.callCount).toBe(1);
      expect(target._impl.stop.args[0][0]).toBe(when);
    });
  });
});
