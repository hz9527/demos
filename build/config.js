const path = require('path');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const scssPlugin = require('rollup-plugin-scss');
const isProd = process.env.NODE_ENV === 'production';

const resolve = (p = '') => path.join(__dirname, '../', p);

const tem = (() => {
  const defaultPlugins = [
    babel(),
    nodeResolve(),
    commonjs()
  ]
  if (isProd) {
    const {terser} = require('rollup-plugin-terser')
    defaultPlugins.push(terser())
  }
  return function (name, input, file, useScss = false, format = 'cjs') {
    const plugins = defaultPlugins.slice()
    useScss && plugins.push(scssPlugin({output: file.replace(/js$/, 'css')}))
    return {
      name,
      config: {
        inputOpt: {input, plugins},
        outputOpt: {file, format, sourcemap: true}
      }
    }
  }
})()


const CONF = {
  inputBaseUrl: resolve('./src'),
  fileDefaultDir: resolve('./src/dist'),
  projects: [
    {name: 'rx', input: '/rxjs/src/index.js', output: '/rxjs/dist', file: `rxdemo.js`, useScss: true},
    {name: 'rxExample', input: '/rxjs/src/examples/index.js', output: '/rxjs/dist', file: `rxexample${isProd ? '.min' : ''}.js`, useScss: true},
    {name: 'rxelevator', input: '/rxjs/src/elevator/index.js', output: '/rxjs/dist', file: `rxelevator${isProd ? '.min' : ''}.js`},
    {name: 'event', input: '/rxjs/src/bigEvent/demo/demo.js', output: '/rxjs/dist', file: `bigEvent${isProd ? '.min' : ''}.js`}
  ]
}

module.exports = CONF.projects.map(item => tem(
  item.name,
  CONF.inputBaseUrl + item.input,
  `${item.output ? (CONF.inputBaseUrl + item.output) : CONF.fileDefaultDir}/${item.file}`,
  item.useScss
))
