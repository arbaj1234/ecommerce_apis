import multer from "multer";

const storage=multer.memoryStorage();
export const singleUplod=multer({storage}).single("file");