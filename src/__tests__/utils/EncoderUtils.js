'use strict';

import assert from 'assert';
import sinon from 'sinon';
import * as EncoderUtils from '../../utils/EncoderUtils';

describe('utils/EncoderUtils.encode(encodeFn: function, audioData: AudioData, opts?: object): Promise<ArrayBuffer>', () => {
  it('should return promise and resolve - from AudioData', () => {
    const source = new Uint8Array(128);
    const sampleRate = 44100;
    const channelData = [new Float32Array(128), new Float32Array(128)];
    const audioData = { sampleRate, channelData };
    const opts = {};
    const encodeFn = sinon.spy(() => {
      return Promise.resolve(source.buffer);
    });

    return EncoderUtils.encode(encodeFn, audioData, opts).then(
      (arrayBuffer) => {
        expect(encodeFn.callCount).toBe(1);
        expect(encodeFn.calledWith(audioData, opts)).toBeTruthy();
        expect(arrayBuffer instanceof ArrayBuffer).toBeTruthy();
      },
    );
  });

  it('should return peomise and resolve - from AudioBuffer', () => {
    const source = new Uint8Array(128);
    const numberOfChannels = 2;
    const sampleRate = 44100;
    const channelData = [new Float32Array(128), new Float32Array(128)];
    const audioData = {
      numberOfChannels,
      sampleRate,
      getChannelData(ch) {
        return channelData[ch];
      },
    };
    const opts = {};
    const encodeFn = sinon.spy(() => {
      return Promise.resolve(source.buffer);
    });

    return EncoderUtils.encode(encodeFn, audioData, opts).then(
      (arrayBuffer) => {
        expect(encodeFn.callCount).toBe(1);

        const _audioData = encodeFn.args[0][0];

        expect(_audioData.numberOfChannels).toBe(numberOfChannels);
        expect(_audioData.length).toBe(128);
        expect(_audioData.sampleRate).toBe(44100);
        expect(_audioData.channelData[0]).toBe(channelData[0]);
        expect(_audioData.channelData[1]).toBe(channelData[1]);

        expect(arrayBuffer instanceof ArrayBuffer).toBeTruthy();
      },
    );
  });
});
