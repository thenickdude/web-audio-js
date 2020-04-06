'use strict';


import assert from 'assert';
import sinon from 'sinon';
import encoder from '../encoder';
import EncoderUtils from '../utils/EncoderUtils';

describe('encoder', () => {
  let defaultWavEncoder, EncoderUtils$encode;

  before(() => {
    defaultWavEncoder = encoder.get('wav');
    EncoderUtils$encode = EncoderUtils.encode;
    EncoderUtils.encode = sinon.spy(EncoderUtils.encode);
  });
  afterEach(() => {
    encoder.set('wav', defaultWavEncoder);
    EncoderUtils.encode.reset();
  });
  after(() => {
    EncoderUtils.encode = EncoderUtils$encode;
  });

  it('.get(type: string): function', () => {
    const encodeFn1 = encoder.get('wav');
    const encodeFn2 = encoder.get('unknown');

    expect(typeof encodeFn1).toBe('function');
    expect(typeof encodeFn2).not.toBe('function');
  });

  it('.set(type: string, fn: function)', () => {
    const encodeFn1 = sinon.spy();

    encoder.set('spy', encodeFn1);

    expect(encoder.get('spy')).toBe(encodeFn1);
  });

  it('.encode(audioData: object, opts?: object): Promise<ArrayBuffer>', () => {
    const channelData = [new Float32Array(16), new Float32Array(16)];
    const audioData = { sampleRate: 44100, channelData: channelData };
    const encodeFn = sinon.spy(() => {
      return Promise.resolve(new Uint8Array(64).buffer);
    });
    const opts = {};

    encoder.set('wav', encodeFn);

    return encoder.encode(audioData, opts).then((arrayBuffer) => {
      expect(encodeFn.callCount).toBe(1);
      expect(encodeFn.calledWith(audioData, opts)).toBeTruthy();
      expect(EncoderUtils.encode.callCount).toBe(1);
      expect(EncoderUtils.encode.calledWith(encodeFn, audioData, opts)).toBeTruthy();
      expect(arrayBuffer instanceof ArrayBuffer).toBeTruthy();
    });
  });

  it('.encode(audioData: object, opts?: object): Promise<ArrayBuffer> - failed', () => {
    const channelData = [new Float32Array(16), new Float32Array(16)];
    const audioData = { sampleRate: 44100, channelData: channelData };
    const opts = { type: 'mid' };

    return encoder.encode(audioData, opts).catch((err) => {
      expect(err instanceof TypeError).toBeTruthy();
    });
  });
});
