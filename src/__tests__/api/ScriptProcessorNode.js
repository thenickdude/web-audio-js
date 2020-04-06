'use strict';


import assert from 'assert';
import sinon from 'sinon';
import api from '../../api';
import AudioContext from '../../api/BaseAudioContext';

describe('api/ScriptProcessorNode', () => {
  it('context.createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels)', () => {
    const context = new AudioContext();
    const target = context.createScriptProcessor(256, 1, 1);

    expect(target instanceof api.ScriptProcessorNode).toBeTruthy();
  });

  describe('attributes', () => {
    it('.bufferSize', () => {
      const context = new AudioContext();
      const target = context.createScriptProcessor(256, 1, 1);
      const bufferSize = 256;

      target._impl.getBufferSize = sinon.spy(() => bufferSize);

      expect(target.bufferSize).toBe(bufferSize);
      expect(target._impl.getBufferSize.callCount).toBe(1);
    });

    it('.onaudioprocess=', () => {
      const context = new AudioContext();
      const target = context.createScriptProcessor(256, 1, 1);
      const callback1 = sinon.spy();
      const callback2 = sinon.spy();
      const callback3 = sinon.spy();
      const event = { type: 'audioprocess' };

      target.onaudioprocess = callback1;
      target.onaudioprocess = callback2;
      target.addEventListener('audioprocess', callback3);
      target._impl.dispatchEvent(event);

      expect(target.onaudioprocess).toBe(callback2);
      expect(callback1.callCount).toBe(0);
      expect(callback2.callCount).toBe(1);
      expect(callback3.callCount).toBe(1);
      expect(callback2.args[0][0]).toBe(event);
      expect(callback3.args[0][0]).toBe(event);
    });
  });
});
