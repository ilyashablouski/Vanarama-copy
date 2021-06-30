import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  res.redirect(`/${req.query.slug}`);
}
