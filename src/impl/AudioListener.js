'use strict';

import AudioParam from './AudioParam';
import { AUDIO_RATE } from '../constants/AudioParamRate';

class AudioListener {
  /**
   * @param {AudioContext} context
   */
  constructor(context) {
    this.context = context;
    this._positionX = new AudioParam(context, {
      rate: AUDIO_RATE,
      defaultValue: 0,
    });
    this._positionY = new AudioParam(context, {
      rate: AUDIO_RATE,
      defaultValue: 0,
    });
    this._positionZ = new AudioParam(context, {
      rate: AUDIO_RATE,
      defaultValue: 0,
    });
    this._forwardX = new AudioParam(context, {
      rate: AUDIO_RATE,
      defaultValue: 0,
    });
    this._forwardY = new AudioParam(context, {
      rate: AUDIO_RATE,
      defaultValue: 0,
    });
    this._forwardZ = new AudioParam(context, {
      rate: AUDIO_RATE,
      defaultValue: 0,
    });
    this._upX = new AudioParam(context, { rate: AUDIO_RATE, defaultValue: 0 });
    this._upY = new AudioParam(context, { rate: AUDIO_RATE, defaultValue: 0 });
    this._upZ = new AudioParam(context, { rate: AUDIO_RATE, defaultValue: 0 });
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  /* istanbul ignore next */
  setPosition() {
    throw new TypeError('NOT YET IMPLEMENTED');
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} xUp
   * @param {number} yUp
   * @param {number} zUp
   */
  /* istanbul ignore next */
  setOrientation() {
    throw new TypeError('NOT YET IMPLEMENTED');
  }

  /**
   * @return {AudioParam}
   */
  getPositionX() {
    return this._positionX;
  }

  /**
   * @return {AudioParam}
   */
  getPositionY() {
    return this._positionY;
  }

  /**
   * @return {AudioParam}
   */
  getPositionZ() {
    return this._positionZ;
  }

  /**
   * @return {AudioParam}
   */
  getForwardX() {
    return this._forwardX;
  }

  /**
   * @return {AudioParam}
   */
  getForwardY() {
    return this._forwardY;
  }

  /**
   * @return {AudioParam}
   */
  getForwardZ() {
    return this._forwardZ;
  }

  /**
   * @return {AudioParam}
   */
  getUpX() {
    return this._upX;
  }

  /**
   * @return {AudioParam}
   */
  getUpY() {
    return this._upY;
  }

  /**
   * @return {AudioParam}
   */
  getUpZ() {
    return this._upZ;
  }
}

export default AudioListener;
