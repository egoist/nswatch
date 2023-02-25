import * as colors from "colorette";

const log = {
  info: (tag: string, msg: any) => {
    console.log(`${colors.yellow(`> [${tag}]`)}`, msg);
  },

  error: (tag: string, msg: any) => {
    console.log(`${colors.red(`> [${tag}]`)}`, msg);
  },
};

export default log;
