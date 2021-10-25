import type { MessagePort } from 'worker_threads';

const MC =
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  typeof MessageChannel === 'function'
    ? // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      MessageChannel
    : require('worker_threads').MessageChannel;

export function makeMessageChannel() {
  return new MC();
}

let nextPort: MessagePort | undefined;

export function setNextPort(port: MessagePort | undefined): void {
  nextPort = port;
}

export function getNextPort(): MessagePort | undefined {
  return nextPort;
}
