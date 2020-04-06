'use strict';

import assert from 'assert';
import sinon from 'sinon';
import * as api from '../../api';
import AudioContext from '../../api/BaseAudioContext';

describe('api/IIRFilterNode', () => {
  it('context.createIIRFilter(feedforward, feedback)', () => {
    const context = new AudioContext();
    const feedforward = new Float32Array(4);
    const feedback = new Float32Array(4);
    const target = context.createIIRFilter(feedforward, feedback);

    expect(target instanceof api.IIRFilterNode).toBeTruthy();
  });

  describe('methods', () => {
    it('.getFrequencyResponse(frequencyHz, magResponse, phaseResponse)', () => {
      const context = new AudioContext();
      const feedforward = new Float32Array(4);
      const feedback = new Float32Array(4);
      const target = context.createIIRFilter(feedforward, feedback);
      const frequencyHz = new Float32Array(128);
      const magResponse = new Float32Array(128);
      const phaseResponse = new Float32Array(128);

      target._impl.getFrequencyResponse = sinon.spy();

      target.getFrequencyResponse(frequencyHz, magResponse, phaseResponse);
      expect(target._impl.getFrequencyResponse.callCount).toBe(1);
      expect(target._impl.getFrequencyResponse.args[0][0]).toBe(frequencyHz);
      expect(target._impl.getFrequencyResponse.args[0][1]).toBe(magResponse);
      expect(target._impl.getFrequencyResponse.args[0][2]).toBe(phaseResponse);
    });
  });
});
