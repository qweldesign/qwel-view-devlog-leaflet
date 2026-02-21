// fetch-sheet.ts

import path from 'path';
import fs from 'fs';
import 'dotenv/config';

(async function() {
  console.log('Fetching sheet...');

  const url = process.env.SS_API_URL as string;
  const res = await fetch(url);
  const data = await res.json();
  const outputPath = path.resolve('public/assets/data.json');

  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log('✔ data.json generated');
})();
