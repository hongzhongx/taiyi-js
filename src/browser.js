const api = require("./api");
const auth = require("./auth");
const memo = require("./auth/memo");
const broadcast = require("./broadcast");
const config = require("./config");
const formatter = require("./formatter")(api);
const utils = require("./utils");

const taiyi = {
  api,
  auth,
  memo,
  broadcast,
  config,
  formatter,
  utils
};

if (typeof window !== "undefined") {
  window.taiyi = taiyi;
}

if (typeof global !== "undefined") {
  global.taiyi = taiyi;
}

exports = module.exports = taiyi;
