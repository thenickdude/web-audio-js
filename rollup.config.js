// rollup.config.js
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src',
  plugins: [commonjs(), resolve(), typescript({ exclude: '**/*.test.ts' })],
  output: [
    {
      file: 'build/web-audio-engine.js',
      format: 'cjs',
    },
    {
      file: 'build/web-audio-engine.esm.js',
      format: 'esm',
    },
  ],
};
