import crossSpawn from 'cross-spawn'
import log from './log'

const defaultCb = err => {
  if (err) {
    console.error(err)
  }
}

export default function spawn(command, args = [], cb = defaultCb) {
  const script = args[1]
  const child = crossSpawn(command, args, {stdio: 'inherit'})
  log.info(script, `started ${script}`)
  child.on('close', code => {
    let err = null
    if (code !== 0) {
      err = `script ${script} exited with wrong status code ${code}`
    }
    cb(err)
  })
}
