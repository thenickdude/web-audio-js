'use strict';

import assert from 'assert';
import sinon from 'sinon';
import * as api from '../../api';
import AudioContext from '../../api/BaseAudioContext';

describe('api/AudioBuffer', () => {
  it('context.createBuffer(numberOfChannels, length, sampleRate)', () => {
    const context = new AudioContext();
    const target = context.createBuffer(1, 16, 8000);

    expect(target instanceof api.AudioBuffer).toBeTruthy();
  });

  describe('attributes', () => {
    it('.sampleRate', () => {
      const context = new AudioContext();
      const target = context.createBuffer(1, 16, 8000);
      const sampleRate = 8000;

      target._impl.getSampleRate = sinon.spy(() => sampleRate);

      expect(target.sampleRate).toBe(sampleRate);
      expect(target._impl.getSampleRate.callCount).toBe(1);
    });

    it('.length', () => {
      const context = new AudioContext();
      const target = context.createBuffer(1, 16, 8000);
      const length = 16;

      target._impl.getLength = sinon.spy(() => length);

      expect(target.length).toBe(length);
      expect(target._impl.getLength.callCount).toBe(1);
    });

    it('.duration', () => {
      const context = new AudioContext();
      const target = context.createBuffer(1, 16, 8000);
      const duration = 16 / 8000;

      target._impl.getDuration = sinon.spy(() => duration);

      expect(target.duration).toBe(duration);
      expect(target._impl.getDuration.callCount).toBe(1);
    });

    it('.numberOfChannels', () => {
      const context = new AudioContext();
      const target = context.createBuffer(1, 16, 8000);
      const numberOfChannels = 1;

      target._impl.getNumberOfChannels = sinon.spy(() => numberOfChannels);

      expect(target.numberOfChannels).toBe(numberOfChannels);
      expect(target._impl.getNumberOfChannels.callCount).toBe(1);
    });
  });

  describe('methods', () => {
    it('.getChannelData(channel)', () => {
      const context = new AudioContext();
      const target = context.createBuffer(1, 16, 8000);
      const channel = 0;

      target._impl.getChannelData = sinon.spy();

      target.getChannelData(channel);
      expect(target._impl.getChannelData.callCount).toBe(1);
      expect(target._impl.getChannelData.args[0][0]).toBe(channel);
    });

    it('.copyFromChannel(destination, channelNumber, startInChannel)', () => {
      const context = new AudioContext();
      const target = context.createBuffer(1, 16, 8000);
      const destination = new Float32Array(128);
      const channelNumber = 0;
      const startInChannel = 2;

      target._impl.copyFromChannel = sinon.spy();

      target.copyFromChannel(destination, channelNumber, startInChannel);
      expect(target._impl.copyFromChannel.callCount).toBe(1);
      expect(target._impl.copyFromChannel.args[0][0]).toBe(destination);
      expect(target._impl.copyFromChannel.args[0][1]).toBe(channelNumber);
      expect(target._impl.copyFromChannel.args[0][2]).toBe(startInChannel);
    });

    it('.copyToChannel(source, channelNumber, startInChannel)', () => {
      const context = new AudioContext();
      const target = context.createBuffer(1, 16, 8000);
      const source = new Float32Array(128);
      const channelNumber = 0;
      const startInChannel = 2;

      target._impl.copyToChannel = sinon.spy();

      target.copyToChannel(source, channelNumber, startInChannel);
      expect(target._impl.copyToChannel.callCount).toBe(1);
      expect(target._impl.copyToChannel.args[0][0]).toBe(source);
      expect(target._impl.copyToChannel.args[0][1]).toBe(channelNumber);
      expect(target._impl.copyToChannel.args[0][2]).toBe(startInChannel);
    });
  });
});
