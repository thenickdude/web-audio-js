'use strict';

import assert from 'assert';
import sinon from 'sinon';
import * as api from '../../api';
import AudioContext from '../../api/BaseAudioContext';
import AudioParam from '../../api/AudioParam';

describe('api/SpatialPannerNode', () => {
  it('context.createSpatialPanner()', () => {
    const context = new AudioContext();
    const target = context.createSpatialPanner();

    expect(target instanceof api.SpatialPannerNode).toBeTruthy();
  });

  describe('attributes', () => {
    it('.panningModel=', () => {
      const context = new AudioContext();
      const target = context.createSpatialPanner();
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

    it('.positionX', () => {
      const context = new AudioContext();
      const target = context.createSpatialPanner();

      expect(target.positionX instanceof AudioParam).toBeTruthy();
      expect(target.positionX).toBe(target._impl.$positionX);
    });

    it('.positionY', () => {
      const context = new AudioContext();
      const target = context.createSpatialPanner();

      expect(target.positionY instanceof AudioParam).toBeTruthy();
      expect(target.positionY).toBe(target._impl.$positionY);
    });

    it('.positionZ', () => {
      const context = new AudioContext();
      const target = context.createSpatialPanner();

      expect(target.positionZ instanceof AudioParam).toBeTruthy();
      expect(target.positionZ).toBe(target._impl.$positionZ);
    });

    it('.orientationX', () => {
      const context = new AudioContext();
      const target = context.createSpatialPanner();

      expect(target.orientationX instanceof AudioParam).toBeTruthy();
      expect(target.orientationX).toBe(target._impl.$orientationX);
    });

    it('.orientationY', () => {
      const context = new AudioContext();
      const target = context.createSpatialPanner();

      expect(target.orientationY instanceof AudioParam).toBeTruthy();
      expect(target.orientationY).toBe(target._impl.$orientationY);
    });

    it('.orientationZ', () => {
      const context = new AudioContext();
      const target = context.createSpatialPanner();

      expect(target.orientationZ instanceof AudioParam).toBeTruthy();
      expect(target.orientationZ).toBe(target._impl.$orientationZ);
    });

    it('.distanceModel=', () => {
      const context = new AudioContext();
      const target = context.createSpatialPanner();
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
      const target = context.createSpatialPanner();
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
      const target = context.createSpatialPanner();
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
      const target = context.createSpatialPanner();
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
      const target = context.createSpatialPanner();
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
      const target = context.createSpatialPanner();
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
      const target = context.createSpatialPanner();
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
});
