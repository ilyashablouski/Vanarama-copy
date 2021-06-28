export default function handler(req: any, res: any) {
  res.clearPreviewData();
  res.end('Preview mode disabled');
}
