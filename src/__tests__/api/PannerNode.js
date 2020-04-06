'use strict';


import assert from 'assert';
import sinon from 'sinon';
import api from '../../api';
import AudioContext from '../../api/BaseAudioContext';

describe('api/PannerNode', () => {
  it('context.createPanner()', () => {
    const context = new AudioContext();
    const target = context.createPanner();

    expect(target instanceof api.PannerNode).toBeTruthy();
  });

  describe('attributes', () => {
    it('.panningModel=', () => {
      const context = new AudioContext();
      const target = context.createPanner();
      const panningModel1 = 'equalpower';
      const panningModel2 = 'HRTF';

      target._impl.getPanningModel = sinon.spy(() => panningModel1);
      target._impl.setPanningModel = sinon.spy();

      expect(target.panningModel).toBe(panningModel1);
      expect(target._impl.getPanningModel.callCount).toBe(1);

      target.panningModel = panningModel2;
      expect(target._impl.setPanningModel.callCount).toBe(1);
      expect(target._impl.setPanningModel.args[0][0]).toBe(panningModel2);
    });

    it('.distanceModel=', () => {
      const context = new AudioContext();
      const target = context.createPanner();
      const distanceModel1 = 'inverse';
      const distanceModel2 = 'linear';

      target._impl.getDistanceModel = sinon.spy(() => distanceModel1);
      target._impl.setDistanceModel = sinon.spy();

      expect(target.distanceModel).toBe(distanceModel1);
      expect(target._impl.getDistanceModel.callCount).toBe(1);

      target.distanceModel = distanceModel2;
      expect(target._impl.setDistanceModel.callCount).toBe(1);
      expect(target._impl.setDistanceModel.args[0][0]).toBe(distanceModel2);
    });

    it('.refDistance=', () => {
      const context = new AudioContext();
      const target = context.createPanner();
      const refDistance1 = 1;
      const refDistance2 = 0.8;

      target._impl.getRefDistance = sinon.spy(() => refDistance1);
      target._impl.setRefDistance = sinon.spy();

      expect(target.refDistance).toBe(refDistance1);
      expect(target._impl.getRefDistance.callCount).toBe(1);

      target.refDistance = refDistance2;
      expect(target._impl.setRefDistance.callCount).toBe(1);
      expect(target._impl.setRefDistance.args[0][0]).toBe(refDistance2);
    });

    it('.maxDistance=', () => {
      const context = new AudioContext();
      const target = context.createPanner();
      const maxDistance1 = 10000;
      const maxDistance2 = 15000;

      target._impl.getMaxDistance = sinon.spy(() => maxDistance1);
      target._impl.setMaxDistance = sinon.spy();

      expect(target.maxDistance).toBe(maxDistance1);
      expect(target._impl.getMaxDistance.callCount).toBe(1);

      target.maxDistance = maxDistance2;
      expect(target._impl.setMaxDistance.callCount).toBe(1);
      expect(target._impl.setMaxDistance.args[0][0]).toBe(maxDistance2);
    });

    it('.rolloffFactor=', () => {
      const context = new AudioContext();
      const target = context.createPanner();
      const rolloffFactor1 = 1;
      const rolloffFactor2 = 0.8;

      target._impl.getRolloffFactor = sinon.spy(() => rolloffFactor1);
      target._impl.setRolloffFactor = sinon.spy();

      expect(target.rolloffFactor).toBe(rolloffFactor1);
      expect(target._impl.getRolloffFactor.callCount).toBe(1);

      target.rolloffFactor = rolloffFactor2;
      expect(target._impl.setRolloffFactor.callCount).toBe(1);
      expect(target._impl.setRolloffFactor.args[0][0]).toBe(rolloffFactor2);
    });

    it('.coneInnerAngle=', () => {
      const context = new AudioContext();
      const target = context.createPanner();
      const coneInnerAngle1 = 360;
      const coneInnerAngle2 = 270;

      target._impl.getConeInnerAngle = sinon.spy(() => coneInnerAngle1);
      target._impl.setConeInnerAngle = sinon.spy();

      expect(target.coneInnerAngle).toBe(coneInnerAngle1);
      expect(target._impl.getConeInnerAngle.callCount).toBe(1);

      target.coneInnerAngle = coneInnerAngle2;
      expect(target._impl.setConeInnerAngle.callCount).toBe(1);
      expect(target._impl.setConeInnerAngle.args[0][0]).toBe(coneInnerAngle2);
    });

    it('.coneOuterAngle=', () => {
      const context = new AudioContext();
      const target = context.createPanner();
      const coneOuterAngle1 = 360;
      const coneOuterAngle2 = 270;

      target._impl.getConeOuterAngle = sinon.spy(() => coneOuterAngle1);
      target._impl.setConeOuterAngle = sinon.spy();

      expect(target.coneOuterAngle).toBe(coneOuterAngle1);
      expect(target._impl.getConeOuterAngle.callCount).toBe(1);

      target.coneOuterAngle = coneOuterAngle2;
      expect(target._impl.setConeOuterAngle.callCount).toBe(1);
      expect(target._impl.setConeOuterAngle.args[0][0]).toBe(coneOuterAngle2);
    });

    it('.coneOuterGain=', () => {
      const context = new AudioContext();
      const target = context.createPanner();
      const coneOuterGain1 = 0;
      const coneOuterGain2 = 0.25;

      target._impl.getConeOuterGain = sinon.spy(() => coneOuterGain1);
      target._impl.setConeOuterGain = sinon.spy();

      expect(target.coneOuterGain).toBe(coneOuterGain1);
      expect(target._impl.getConeOuterGain.callCount).toBe(1);

      target.coneOuterGain = coneOuterGain2;
      expect(target._impl.setConeOuterGain.callCount).toBe(1);
      expect(target._impl.setConeOuterGain.args[0][0]).toBe(coneOuterGain2);
    });
  });

  describe('methods', () => {
    it('.setPosition(x, y, z)', () => {
      const context = new AudioContext();
      const target = context.createPanner();
      const x = 0;
      const y = 1;
      const z = 2;

      target._impl.setPosition = sinon.spy();

      target.setPosition(x, y, z);
      expect(target._impl.setPosition.callCount).toBe(1);
      expect(target._impl.setPosition.args[0][0]).toBe(x);
      expect(target._impl.setPosition.args[0][1]).toBe(y);
      expect(target._impl.setPosition.args[0][2]).toBe(z);
    });

    it('.setOrientation(x, y, z)', () => {
      const context = new AudioContext();
      const target = context.createPanner();
      const x = 0;
      const y = 1;
      const z = 2;

      target._impl.setOrientation = sinon.spy();

      target.setOrientation(x, y, z);
      expect(target._impl.setOrientation.callCount).toBe(1);
      expect(target._impl.setOrientation.args[0][0]).toBe(x);
      expect(target._impl.setOrientation.args[0][1]).toBe(y);
      expect(target._impl.setOrientation.args[0][2]).toBe(z);
    });

    it('.setVelocity(x, y, z)', () => {
      const context = new AudioContext();
      const target = context.createPanner();
      const x = 0;
      const y = 1;
      const z = 2;

      target._impl.setVelocity = sinon.spy();

      target.setVelocity(x, y, z);
      expect(target._impl.setVelocity.callCount).toBe(1);
      expect(target._impl.setVelocity.args[0][0]).toBe(x);
      expect(target._impl.setVelocity.args[0][1]).toBe(y);
      expect(target._impl.setVelocity.args[0][2]).toBe(z);
    });
  });
});
