# Google Maps API
[HasData](https://hasdata.com/) - Web Scraping API with Proxy Rotation. Get valuable data at scale in HTML format from any website without need for a proxy.

Interface to call [Google Maps Scraper](https://hasdata.com/scrapers/google-maps) easily from Node.

## Install

    npm i @scrapeit-cloud/google-maps-api

## Usage
Signup to HasData to [get your API key](https://app.hasdata.com/sign-up) and some free credits to get started.

    import ScrapeitSDK from './index';

    const main = async() => {
      const scrapeit = new ScrapeitSDK('INSERT_YOUR_API_KEY_HERE');

      try {
        const response = await scrapeit.scrape({
          "keyword": "plumber in new york",
          "country": "US",
          "domain": "com"
        });

        console.log(response);
      } catch(e) {
        console.log(e.message);
      }
    };

    main();

You can find all the supported parameters on [HasData documentation](https://docs.hasdata.com/apis/google-maps/search). The old names `keyword`, `country` and `domain: "com"` still work and are sent as `q`, `gl` and `domain: "google.com"`.
