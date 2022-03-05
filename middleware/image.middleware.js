const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/profile_pictures');
    },
    filename: function (req, file, callback) {
        callback(null, getName(file));
    }
});

const upload = multer({ storage: storage });


const getName = (file) => {
    mime = file.mimetype.toLowerCase();
    type = mime.slice(6);
    return file.fieldname + "-" + Date.now()+ "." + type;
} 
module.exports = { upload };