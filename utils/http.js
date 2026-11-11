const http = require('https');
const nodeUrl = require('url');

const doRequest = (url, headers, params) => {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null),
  ).toString();

  const options = {
    host: nodeUrl.parse(url).hostname,
    path: `${nodeUrl.parse(url).path}?${query}`,
    method: 'GET',
    headers,
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => resolve(data));

      res.on('error', (err) => reject(err.message));
    });

    req.on('error', (err) => reject(err.message));

    req.end();
  });
};

module.exports = { doRequest };
