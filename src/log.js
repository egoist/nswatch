import chalk from 'chalk'

const log = {}

log.info = (tag, msg) => {
  console.log(`${chalk.yellow(`> [${tag}]`)} ${msg}`)
}

log.error = (tag, msg) => {
  console.log(`${chalk.red(`> [${tag}]`)} ${msg}`)
}

export default log
