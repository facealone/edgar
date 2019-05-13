import 'dotenv/config';
import { Client } from '@elastic/elasticsearch';

export const client = new Client({
  node: process.env.ELASTICSEARCH_CLIENT,
});

client.ping(error => {
  if (error) {
    console.log('elasticsearch cluster is down!');
  }

  console.log('Elasticsearch is up');
});
