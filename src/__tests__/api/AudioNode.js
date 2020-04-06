'use strict';

import assert from 'assert';
import sinon from 'sinon';
import AudioContext from '../../api/BaseAudioContext';

describe('api/AudioNode', () => {
  it('.context', () => {
    const context = new AudioContext();
    const target = context.createGain();

    expect(target.context).toBe(context);
  });

  describe('attributes', () => {
    it('.numberOfInputs', () => {
      const context = new AudioContext();
      const target = context.createGain();
      const numberOfInputs = 1;

      target._impl.getNumberOfInputs = sinon.spy(() => numberOfInputs);

      expect(target.numberOfInputs).toBe(numberOfInputs);
      expect(target._impl.getNumberOfInputs.callCount).toBe(1);
    });

    it('.numberOfOutputs', () => {
      const context = new AudioContext();
      const target = context.createGain();
      const numberOfOutputs = 1;

      target._impl.getNumberOfOutputs = sinon.spy(() => numberOfOutputs);

      expect(target.numberOfOutputs).toBe(numberOfOutputs);
      expect(target._impl.getNumberOfOutputs.callCount).toBe(1);
    });

    it('.channelCount=', () => {
      const context = new AudioContext();
      const target = context.createGain();
      const channelCount1 = 1;
      const channelCount2 = 2;

      target._impl.getChannelCount = sinon.spy(() => channelCount1);
      target._impl.setChannelCount = sinon.spy();

      expect(target.channelCount).toBe(channelCount1);
      expect(target._impl.getChannelCount.callCount).toBe(1);

      target.channelCount = channelCount2;
      expect(target._impl.setChannelCount.callCount).toBe(1);
      expect(target._impl.setChannelCount.args[0][0]).toBe(channelCount2);
    });

    it('.channelCountMode=', () => {
      const context = new AudioContext();
      const target = context.createGain();
      const channelCountMode1 = 'max';
      const channelCountMode2 = 'explicit';

      target._impl.getChannelCountMode = sinon.spy(() => channelCountMode1);
      target._impl.setChannelCountMode = sinon.spy();

      expect(target.channelCountMode).toBe(channelCountMode1);
      expect(target._impl.getChannelCountMode.callCount).toBe(1);

      target.channelCountMode = channelCountMode2;
      expect(target._impl.setChannelCountMode.callCount).toBe(1);
      expect(target._impl.setChannelCountMode.args[0][0]).toBe(
        channelCountMode2,
      );
    });

    it('.channelInterpretation=', () => {
      const context = new AudioContext();
      const target = context.createGain();
      const channelInterpretation1 = 'max';
      const channelInterpretation2 = 'explicit';

      target._impl.getChannelInterpretation = sinon.spy(
        () => channelInterpretation1,
      );
      target._impl.setChannelInterpretation = sinon.spy();

      expect(target.channelInterpretation).toBe(channelInterpretation1);
      expect(target._impl.getChannelInterpretation.callCount).toBe(1);

      target.channelInterpretation = channelInterpretation2;
      expect(target._impl.setChannelInterpretation.callCount).toBe(1);
      assert(
        target._impl.setChannelInterpretation.args[0][0] ===
          channelInterpretation2,
      );
    });
  });

  describe('methods', () => {
    it('.connect(destination: AudioNode, output, input)', () => {
      const context = new AudioContext();
      const target = context.createGain();
      const destination = context.createGain();
      const output = 0;
      const input = 0;

      target._impl.connect = sinon.spy();

      const retVal = target.connect(destination, output, input);

      expect(retVal).toBe(destination);
      expect(target._impl.connect.callCount).toBe(1);
      expect(target._impl.connect.args[0][0]).toBe(destination._impl);
      expect(target._impl.connect.args[0][1]).toBe(output);
      expect(target._impl.connect.args[0][2]).toBe(input);
    });

    it('.connect(destination: AudioParam, output)', () => {
      const context = new AudioContext();
      const target = context.createGain();
      const destination = context.createGain().gain;
      const output = 0;

      target._impl.connect = sinon.spy();

      const retVal = target.connect(destination, output);

      expect(retVal).toBe(undefined);
      expect(target._impl.connect.callCount).toBe(1);
      expect(target._impl.connect.args[0][0]).toBe(destination._impl);
      expect(target._impl.connect.args[0][1]).toBe(output);
    });

    it('.disconnect(...args)', () => {
      const context = new AudioContext();
      const target = context.createGain();
      const output = 0;

      target._impl.disconnect = sinon.spy();

      target.disconnect(output);
      expect(target._impl.disconnect.callCount).toBe(1);
      expect(target._impl.disconnect.args[0][0]).toBe(output);
    });
  });
});
