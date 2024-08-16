import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(process.env.ALGOLIASEARCH_APPLICATION_ID ?? '', process.env.ALGOLIASEARCH_API_KEY ?? '');

export default searchClient;