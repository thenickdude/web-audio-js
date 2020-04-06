'use strict';


import assert from 'assert';
import api from '../../api';
import AudioContext from '../../api/BaseAudioContext';

describe('api/PeriodicWave', () => {
  it('context.createPeriodicWave(real, imag)', () => {
    const context = new AudioContext();
    const real = new Float32Array(16);
    const imag = new Float32Array(16);
    const target = context.createPeriodicWave(real, imag);

    expect(target instanceof api.PeriodicWave).toBeTruthy();
  });
});
