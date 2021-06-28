export default function handler(req: any, res: any) {
  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  res.redirect(`/${req.query.slug}`);
}
