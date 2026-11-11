const { SCRAPE_IT_CLOUD_API_URL, SCRAPE_IT_CLOUD_API_ENDPOINT } = require('./const');
const { doRequest } = require('./utils/http');

// Old parameter names (keyword, country, domain: 'com') still work
const toApiParams = ({ keyword, country, ...params }) => {
  const result = { ...params };

  if (keyword !== undefined && result.q === undefined) {
    result.q = keyword;
  }

  if (country !== undefined && result.gl === undefined) {
    result.gl = String(country).toLowerCase();
  }

  if (result.domain && !String(result.domain).startsWith('google.')) {
    result.domain = `google.${result.domain}`;
  }

  return result;
};

class ScrapeitCloud {
  /**
     *
     * @param {apiKey} apiKey - Scrapeit Cloud API Key
     * @throws {Error}
     *
     */
  constructor(apiKey = null) {
    if (!apiKey) {
      throw new Error('API Key is not provided');
    }

    this.apiKey = apiKey;
  }

  /**
     *
     * @param {params} params - Scrapeit Cloud API Params
     * @throws {Error}
     * @returns {object} Scrapeit Cloud API Response
     *
     */
  async scrape(params) {
    const responseBody = await doRequest(
      `${SCRAPE_IT_CLOUD_API_URL}${SCRAPE_IT_CLOUD_API_ENDPOINT}`,
      {
        'x-api-key': this.apiKey,
      },
      {
        ...toApiParams(params),
        source: 'nodejs_sdk'
      }
    );

    let result = {};

    try {
      result = JSON.parse(responseBody);
    } catch (e) {
      result = responseBody;
    }

    if (result.status === 'ok') {
      return result.scrapingResult;
    }

    if (result.error) {
      throw new Error(result.error);
    }

    // HasData API errors: 401 { message }, 422 { errors }
    const isApiError = !result.requestMetadata && (result.message || result.errors);

    if (result.status === 'error' || isApiError) {
      const message = result.message || 'Request failed';
      throw new Error(`${message}: ${JSON.stringify(result.errors || {})}`);
    }

    return result;
  }
}

module.exports = ScrapeitCloud;
