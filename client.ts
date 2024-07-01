import { createClient } from '@sanity/client';

export default createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_API_TOKEN,
  useCdn: true,
  ignoreBrowserTokenWarning: true
});
