declare type ScrapeitCloudAPIParams = {
  q?: string,
  keyword?: string, // old name of q
  gl?: string,
  country?: string, // old name of gl
  hl?: string,
  domain?: string,
  start?: number,
  ll?: string
}

declare type ScrapeitCloudAPIResponse = {
  requestMetadata: Record<string, any>,
  localResults: Array<any>,
}

declare class ScrapeitCloud {
  private readonly apiKey: string;
  constructor(apiKey: string);

  scrape(params: ScrapeitCloudAPIParams): Promise<ScrapeitCloudAPIResponse>;
}

export default ScrapeitCloud;
