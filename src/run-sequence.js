import spawn from './spawn'
import log from './log'

export default function runSequence(scripts) {
  const exec = () => {
    if (scripts.length > 0) {
      const script = scripts.shift()
      spawn('npm', ['run', script], err => {
        if (err) {
          log.error(script, err)
        }
        exec()
      })
    }
  }

  exec()
}
