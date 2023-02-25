import chalk from "chalk";

const log = {};

log.info = (tag: string, msg: string) => {
  console.log(`${chalk.yellow(`> [${tag}]`)} ${msg}`);
};

log.error = (tag: string, msg: string) => {
  console.log(`${chalk.red(`> [${tag}]`)} ${msg}`);
};

export default log;
