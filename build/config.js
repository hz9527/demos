const path = require('path');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const isProd = process.env.NODE_ENV === 'production'

const resolve = (p = '') => path.join(__dirname, '../', p);

const tem = (() => {
  const plugins = [
    babel(),
    nodeResolve(),
    commonjs()
  ]
  if (isProd) {
    const {terser} = require('rollup-plugin-terser')
    plugins.push(terser())
  }
  return function (name, input, file, format = 'cjs') {
    return {
      name,
      config: {
        inputOpt: {
          input,
          plugins
        },
        outputOpt: {
          file,
          format,
          sourcemap: true,
        }
      }
    }
  }
})()


const CONF = {
  inputBaseUrl: resolve('./src'),
  fileDefaultDir: resolve('./src/dist'),
  projects: [
    {name: 'rx', input: '/rxjs/src/index.js', output: '/rxjs/dist', file: `rxdemo${isProd ? '.min' : ''}.js`},
    {name: 'rxelevator', input: '/rxjs/src/elevator/index.js', output: '/rxjs/dist', file: `rxelevator${isProd ? '.min' : ''}.js`}
  ]
}

module.exports = CONF.projects.map(item => tem(
  item.name,
  CONF.inputBaseUrl + item.input,
  `${item.output ? (CONF.inputBaseUrl + item.output) : CONF.fileDefaultDir}/${item.file}`
))
