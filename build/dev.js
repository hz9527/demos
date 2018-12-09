const rollup = require('rollup');
const Configs = require('./config.js');

Configs.forEach(({name, config: {inputOpt, outputOpt}}) => {
  const watchOptions = {
    ...inputOpt,
    cache: true,
    output: [outputOpt],
    watch: {}
  };

  const watcher = rollup.watch(watchOptions);

  watcher.on('event', event => {
    if (event.code === 'FATAL') {
      console.log(event, name)
    }
  })
})
