let config = {
  dev: {
    webserver: {
      uri: "http://localhost:3000"
    }
  },
  production: {
    webserver: {
      uri: ""
    }
  }
};

config = new Proxy(config, {
  get(target, prop, receiver) {
    if (prop in target) return target[prop];

    if (/prod/gi.test(prop)) return target["production"];
    else return target["dev"];
  }
});

export default config;