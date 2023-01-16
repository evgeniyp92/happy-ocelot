import fs from 'fs';

// export default (req, res) => {
//   res.status(405).json({ message: 'Method not allowed' });
// };

// this solution follows the example laid out in
// https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430

// import nextConnect from 'next-connect';
// import multer from 'multer';

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: './public/uploads',
//     filename: (req, file, cb) => cb(null, file.originalname),
//   }),
// });

// const apiRoute = nextConnect({
//   onNoMatch(req, res) {
//     res.status(405).json({ message: 'Method not allowed' });
//   },
//   enError(error, req, res) {
//     res.status(501).json({ message: error.message });
//   },
// });

// const uploadMiddleware = upload.array('files');

// apiRoute.use(uploadMiddleware);

// apiRoute.post((req, res) => {
//   console.log(req.files);
//   res.status(200).json({ data: 'success' });
// });

// export default apiRoute;

export default function handleUpload(req, res) {
  // break out query params
  const { query } = req;

  // create a write stream (in append mode)
  req.on('data', chunk => {
    fs.appendFileSync(`./public/uploads/${query.fileName}`, chunk);
  });
  res.status(200).json({ data: 'success' });
}

// telling Next.js to not parse the body of the request
export const config = {
  api: {
    bodyParser: false,
  },
};
