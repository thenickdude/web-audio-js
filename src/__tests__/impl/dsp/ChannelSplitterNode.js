'use strict';

import assert from 'assert';
import * as np from '../../../__tests_helpers/np';
import AudioContext from '../../../impl/AudioContext';
import ChannelSplitterNode from '../../../impl/ChannelSplitterNode';
import AudioNode from '../../../impl/AudioNode';

const context = new AudioContext({ sampleRate: 8000, blockSize: 16 });
const channelData = [new Float32Array(16), new Float32Array(16)];

describe('impl/dsp/ChannelSplitterNode', () => {
  it('works', () => {
    const node1 = new AudioNode(context, {}, { outputs: [4] });
    const node2 = new ChannelSplitterNode(context, { numberOfOutputs: 6 });
    const noise1 = np.random_sample(16);
    const noise2 = np.random_sample(16);

    context.resume();
    node1.connect(node2);
    node2.connect(context.getDestination());
    node1.enableOutputsIfNecessary();
    [0, 1, 2, 3, 4, 5].forEach((ch) => {
      node2.outputs[ch].bus.getMutableData()[0].set(np.random_sample(16));
    });
    node1.outputs[0].bus.getMutableData()[0].set(noise1);
    node1.outputs[0].bus.getMutableData()[1].set(noise2);
    node1.outputs[0].bus.getMutableData()[2].set(noise1);
    node1.outputs[0].bus.getMutableData()[3].set(noise2);

    context.process(channelData, 0);

    const actual = [0, 1, 2, 3, 4, 5].map(
      (ch) => node2.outputs[ch].bus.getChannelData()[0],
    );
    const isSilent = [0, 1, 2, 3, 4, 5].map(
      (ch) => node2.outputs[ch].bus.isSilent,
    );

    expect(isSilent[0]).toBe(false);
    expect(isSilent[1]).toBe(false);
    expect(isSilent[2]).toBe(false);
    expect(isSilent[3]).toBe(false);
    expect(isSilent[4]).toBe(true);
    expect(isSilent[5]).toBe(true);
    assert.deepEqual(actual[0], noise1);
    assert.deepEqual(actual[1], noise2);
    assert.deepEqual(actual[2], noise1);
    assert.deepEqual(actual[3], noise2);
    assert.deepEqual(actual[4], np.zeros(16));
    assert.deepEqual(actual[5], np.zeros(16));
  });

  it('works - silent', () => {
    const node1 = new AudioNode(context, {}, { outputs: [4] });
    const node2 = new ChannelSplitterNode(context, { numberOfOutputs: 6 });

    context.resume();
    node1.connect(node2);
    node2.connect(context.getDestination());
    node1.enableOutputsIfNecessary();
    [0, 1, 2, 3, 4, 5].forEach((ch) => {
      node2.outputs[ch].bus.getMutableData()[0].set(np.random_sample(16));
    });

    context.process(channelData, 0);

    const actual = [0, 1, 2, 3, 4, 5].map(
      (ch) => node2.outputs[ch].bus.getChannelData()[0],
    );
    const isSilent = [0, 1, 2, 3, 4, 5].map(
      (ch) => node2.outputs[ch].bus.isSilent,
    );

    expect(isSilent[0]).toBe(true);
    expect(isSilent[1]).toBe(true);
    expect(isSilent[2]).toBe(true);
    expect(isSilent[3]).toBe(true);
    expect(isSilent[4]).toBe(true);
    expect(isSilent[5]).toBe(true);
    assert.deepEqual(actual[0], np.zeros(16));
    assert.deepEqual(actual[1], np.zeros(16));
    assert.deepEqual(actual[2], np.zeros(16));
    assert.deepEqual(actual[3], np.zeros(16));
    assert.deepEqual(actual[4], np.zeros(16));
    assert.deepEqual(actual[5], np.zeros(16));
  });
});
