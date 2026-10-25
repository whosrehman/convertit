import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Expose-Headers', 'X-File-Name, X-File-Size');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const SECRET = process.env.CONVERTAPI_SECRET;
  if (!SECRET) {
    return res.status(500).json({ error: 'Conversion service not configured. Add CONVERTAPI_SECRET in Vercel environment variables.' });
  }

  try {
    const form = new IncomingForm({ maxFileSize: 50 * 1024 * 1024, keepExtensions: true });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const ext = path.extname(file.originalFilename || '').toLowerCase();
    if (ext !== '.pdf') {
      return res.status(400).json({ error: 'Only .pdf files are allowed' });
    }

    // Read file and convert to base64
    const fileBuffer = fs.readFileSync(file.filepath);
    const base64 = fileBuffer.toString('base64');

    // Call ConvertAPI (PDF → Word)
    const apiRes = await fetch(`https://v2.convertapi.com/convert/pdf/to/docx?Secret=${SECRET}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Parameters: [
          { Name: 'File', FileValue: { Name: file.originalFilename, Data: base64 } },
          { Name: 'Layout', Value: 'exact' },
          { Name: 'StoreFile', Value: true },
        ],
      }),
    });

    const result = await apiRes.json();

    if (!apiRes.ok || !result.Files || result.Files.length === 0) {
      console.error('ConvertAPI error:', JSON.stringify(result));
      return res.status(500).json({ error: result.Message || 'Conversion failed' });
    }

    // Download converted DOCX
    const docxRes = await fetch(result.Files[0].Url);
    const docxBuffer = Buffer.from(await docxRes.arrayBuffer());
    const outputName = path.parse(file.originalFilename).name + '.docx';

    // Cleanup
    try { fs.unlinkSync(file.filepath); } catch (e) {}

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="${outputName}"`);
    res.setHeader('X-File-Name', outputName);
    res.setHeader('X-File-Size', docxBuffer.length.toString());
    return res.status(200).send(docxBuffer);
  } catch (err) {
    console.error('PDF to Word error:', err);
    return res.status(500).json({ error: 'Conversion failed. ' + err.message });
  }
}
