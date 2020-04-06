'use strict';


import assert from 'assert';
import sinon from 'sinon';
import decoder from '../decoder';
import DecoderUtils from '../utils/DecoderUtils';
import AudioBuffer from '../api/AudioBuffer';

describe('decoder', () => {
  let defaultWavDecoder, DecoderUtils$decode;

  before(() => {
    defaultWavDecoder = decoder.get('wav');
    DecoderUtils$decode = DecoderUtils.decode;
    DecoderUtils.decode = sinon.spy(DecoderUtils.decode);
  });
  afterEach(() => {
    decoder.set('wav', defaultWavDecoder);
    DecoderUtils.decode.reset();
  });
  after(() => {
    DecoderUtils.decode = DecoderUtils$decode;
  });

  it('.get(type: string): function', () => {
    const decodeFn1 = decoder.get('wav');
    const decodeFn2 = decoder.get('unknown');

    expect(typeof decodeFn1).toBe('function');
    expect(typeof decodeFn2).not.toBe('function');
  });

  it('.set(type: string, fn: function)', () => {
    const decodeFn1 = sinon.spy();

    decoder.set('spy', decodeFn1);

    expect(decoder.get('spy')).toBe(decodeFn1);
  });

  it('.decode(audioData: ArrayBuffer, opts?:object): Promise<AudioBuffer>', () => {
    const channelData = [new Float32Array(16), new Float32Array(16)];
    const decodeFn = sinon.spy(() => {
      return Promise.resolve({ sampleRate: 44100, channelData: channelData });
    });
    const audioData = new Uint32Array([
      0x46464952,
      0x0000002c,
      0x45564157,
      0x20746d66,
      0x00000010,
      0x00020001,
      0x0000ac44,
      0x0002b110,
      0x00100004,
      0x61746164,
      0x00000008,
      0x8000c000,
      0x3fff7fff,
    ]).buffer;
    const opts = {};

    decoder.set('wav', decodeFn);

    return decoder.decode(audioData, opts).then((audioBuffer) => {
      expect(decodeFn.callCount).toBe(1);
      expect(decodeFn.calledWith(audioData, opts)).toBeTruthy();
      expect(DecoderUtils.decode.callCount).toBe(1);
      expect(DecoderUtils.decode.calledWith(decodeFn, audioData, opts)).toBeTruthy();
      expect(audioBuffer instanceof AudioBuffer).toBeTruthy();
      expect(audioBuffer.numberOfChannels).toBe(2);
      expect(audioBuffer.length).toBe(16);
      expect(audioBuffer.sampleRate).toBe(44100);
      expect(audioBuffer.getChannelData(0)).toBe(channelData[0]);
      expect(audioBuffer.getChannelData(1)).toBe(channelData[1]);
    });
  });

  it('.decode(audioData: ArrayBuffer, opts?:object): Promise<AudioBuffer> - not supported', () => {
    const audioData = new Uint8Array(16).buffer;

    return decoder.decode(audioData).catch((err) => {
      expect(err instanceof TypeError).toBeTruthy();
    });
  });
});
