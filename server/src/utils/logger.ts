import config from "../config/config";
const info = (...params: any) => {
  if (config.ENV !== "test") {
    console.log(...params);
  }
};

const error = (...params: any) => {
  if (config.ENV !== "test") {
    console.error(...params);
  }
};

export default { info, error };
