'use strict';

import assert from 'assert';
import sinon from 'sinon';
import * as api from '../../api';
import AudioContext from '../../api/BaseAudioContext';

describe('api/AudioDestinationNode', () => {
  it('context.destination', () => {
    const context = new AudioContext();
    const target = context.destination;

    expect(target instanceof api.AudioDestinationNode).toBeTruthy();
  });

  describe('attributes', () => {
    it('.maxChannelCount', () => {
      const context = new AudioContext();
      const target = context.destination;
      const maxChannelCount = 2;

      target._impl.getMaxChannelCount = sinon.spy(() => maxChannelCount);

      expect(target.maxChannelCount).toBe(maxChannelCount);
      expect(target._impl.getMaxChannelCount.callCount).toBe(1);
    });
  });
});
