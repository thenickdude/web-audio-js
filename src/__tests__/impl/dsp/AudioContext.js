'use strict';


import assert from 'assert';
import sinon from 'sinon';
import AudioContext from '../../../impl/AudioContext';

const contextOpts = { sampleRate: 8000, blockSize: 16 };

describe('impl/dsp/AudioContext', () => {
  let context, destination;

  before(() => {
    context = new AudioContext(contextOpts);
    destination = context.getDestination();

    context.resume();
  });

  it('1: time advances', () => {
    const channelData = [new Float32Array(16), new Float32Array(16)];

    expect(context.getCurrentTime()).toBe(0);
    destination.process = sinon.spy();

    context.process(channelData, 0);

    expect(destination.process.callCount).toBe(1);
    expect(destination.process.calledWith(channelData, 0)).toBeTruthy();
    expect(context.getCurrentTime()).toBe(16 / 8000);
  });

  it('2: do post process and reserve pre process (for next process)', () => {
    const channelData = [new Float32Array(16), new Float32Array(16)];
    const immediateSpy = sinon.spy();

    expect(context.getCurrentTime()).toBe(16 / 8000);
    destination.process = sinon.spy(() => {
      context.addPostProcess(immediateSpy);
    });

    context.process(channelData, 0);

    expect(destination.process.callCount).toBe(1);
    expect(destination.process.calledWith(channelData, 0)).toBeTruthy();
    expect(context.getCurrentTime()).toBe(32 / 8000);
    expect(immediateSpy.callCount).toBe(1);
    expect(immediateSpy.calledAfter(destination.process)).toBeTruthy();
  });
});
