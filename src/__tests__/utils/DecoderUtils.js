'use strict';

import assert from 'assert';
import sinon from 'sinon';
import * as DecoderUtils from '../../utils/DecoderUtils';

describe('utils/DecoderUtils.decode(decodeFn: function, audioData: arrayBuffer, opts?: object): Promise<AudioData>', () => {
  it('should return promise and resolve - without resampling', () => {
    const source = new Uint8Array(128);
    const sampleRate = 44100;
    const channelData = [new Float32Array(128), new Float32Array(128)];
    const decodeFn = sinon.spy(() => {
      return Promise.resolve({ sampleRate, channelData });
    });

    return DecoderUtils.decode(decodeFn, source).then((audioData) => {
      expect(decodeFn.callCount).toBe(1);
      expect(decodeFn.calledWith(source)).toBeTruthy();
      expect(audioData.sampleRate).toBe(44100);
      expect(audioData.channelData).toBe(channelData);
    });
  });

  it('should return promise and resolve - resampling', () => {
    const source = new Uint8Array(128);
    const sampleRate = 44100;
    const channelData = [new Float32Array(128), new Float32Array(128)];
    const decodeFn = sinon.spy(() => {
      return Promise.resolve({ sampleRate, channelData });
    });

    return DecoderUtils.decode(decodeFn, source, { sampleRate: 22050 }).then(
      (audioData) => {
        expect(decodeFn.callCount).toBe(1);
        expect(decodeFn.calledWith(source)).toBeTruthy();
        expect(audioData.sampleRate).toBe(22050);
        expect(audioData.length).toBe(channelData[0].length / 2);
      },
    );
  });

  it('should reject if provided invalid data', () => {
    const source = new Uint8Array(128);
    const decodeFn = sinon.spy(() => {
      return Promise.reject('ERROR!');
    });

    return DecoderUtils.decode(decodeFn, source, { sampleRate: 44100 }).then(
      () => {
        throw new TypeError('NOT REACHED');
      },
      (e) => {
        expect(decodeFn.callCount).toBe(1);
        expect(decodeFn.calledWith(source)).toBeTruthy();
        expect(e).toBe('ERROR!');
      },
    );
  });

  it('should reject if invalid return', () => {
    const source = new Uint8Array(128);
    const decodeFn = sinon.spy(() => {
      return Promise.resolve(null);
    });

    return DecoderUtils.decode(decodeFn, source, { sampleRate: 44100 }).then(
      () => {
        throw new TypeError('NOT REACHED');
      },
      (e) => {
        expect(decodeFn.callCount).toBe(1);
        expect(decodeFn.calledWith(source)).toBeTruthy();
        expect(e instanceof TypeError).toBeTruthy();
      },
    );
  });
});

describe('utils/DecoderUtils.resample(audioData: AudioData, sampleRate: number): AudioData', () => {
  it('works', () => {
    const source = {
      sampleRate: 8000,
      channelData: [new Float32Array(128)],
    };
    const resampled = DecoderUtils.resample(source, 16000);

    expect(resampled.numberOfChannels).toBe(1);
    expect(resampled.length).toBe(256);
    expect(resampled.sampleRate).toBe(16000);
    expect(resampled.channelData.length).toBe(resampled.numberOfChannels);
    expect(resampled.channelData[0].length).toBe(resampled.length);
  });

  it('nothing to do', () => {
    const source = {
      sampleRate: 8000,
      channelData: [new Float32Array(128)],
    };
    const resampled = DecoderUtils.resample(source, 8000);

    expect(resampled).toBe(source);
  });
});
