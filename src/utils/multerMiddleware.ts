import multer, { diskStorage } from "multer";

export const multerFunction = () => {
  const storage = diskStorage({
    destination(_req: any, _file: any, cb: any) {
      cb(null, "./uploads");
    },
    filename(_req: any, file: any, cb: any) {
      const dateSuffix = Date.now();
      cb(
        null,
        `${file.fieldname}_${dateSuffix}.${file.mimetype.split("/")[1]}`
      );
    },
  });

  const fileFilter = function (_req: any, file: any, cb: any) {
    if (!file.mimetype.startsWith("image"))
      return cb(
        new Error(`${file.mimetype} is invalid file extension!`, { cause: 409 })
      );

    return cb(null, true);
  };

  const upload = multer({ storage, fileFilter });

  return upload;
};
