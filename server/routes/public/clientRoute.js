import { Router } from 'express';
import { getClientById, createClient, getClients, updateUserCreds } from '../../controllers/clientController.js';
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, callback) {
        const uniqueName = uuidv4() + path.extname(file.originalname);
        callback(null, uniqueName);
    }
});

const uploads = multer({
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 },
    fileFilter: function (req, file, callback) {
        const allowedFileTypes = /jpeg|jpg|png|gif/;
        const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedFileTypes.test(file.mimetype);

        if (extname && mimetype) {
            callback(null, true);
        } else {
            callback(new Error('Only images (jpeg, jpg, png, gif) are allowed!'));
        }
    },
});

const router = Router();

router.post('/registration', createClient);
router.get('/', getClients);
router.put('/:userId', uploads.single('profile_image'), updateUserCreds);
router.get('/:id', getClientById);

export default router;