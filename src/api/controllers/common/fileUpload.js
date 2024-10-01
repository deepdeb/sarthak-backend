const fs = require('fs');
const path = require('path');
const multer = require('multer');

exports.fileuploadController = async (req, res) => {
    try {
        const uploadFolder = path.join(__dirname, '../../../../public/upload/files/');
        if (!fs.existsSync(uploadFolder)) {
            fs.mkdirSync(uploadFolder, { recursive: true });
        }
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, uploadFolder);
            },
            filename: function (req, file, cb) {
                const newFilename = `${Date.now()}_${file.originalname}`.replace(/ /g, "_");
                cb(null, newFilename);
            },
        });

        const upload = multer({ storage: storage }).single('file');

        upload(req, res, function (err) {
            if (err) {
                logger.error("upload function:", err);
                return res.json({ success: false, status: 500, message: 'Internal server error', response: []});
            }
            const originalFilename = req.file.originalname;
            const newFilename = req.file.filename;

            return res.json({
                success: true, status: 200, message: "File uploaded successfully", response: { originalFilename, newFilename},
            });
        });
    }

    catch (error) {
        console.log("error file upload: ", error);
        logger.error("error file upload: ", error);
        return res.json({ status: 500, message: "Internal server error", success: false, response: null });
    }
}