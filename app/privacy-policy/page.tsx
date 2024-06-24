import { promises as fs } from 'fs';

import parse from 'html-react-parser';

export default async function PrivacyPolicy() {
  const html = await fs.readFile(
    process.cwd() + '/app/privacy-policy/privacy-policy.html',
    'utf8'
  );

  return <>{parse(html)}</>;
}
