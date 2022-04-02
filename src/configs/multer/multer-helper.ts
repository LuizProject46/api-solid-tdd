import { Request } from 'express'
import path from 'path'
import multer from 'multer'

export const Multer = {
    storage: multer.diskStorage({
        destination: function(req : Request, file, cb) {
            cb(null, path.join(__dirname, '..', '..', '..', '/uploads'))
        },
        filename: function (req: Request, file: Express.Multer.File, cb) {
           
            const fileName = `${Date.now()}-${file.originalname}`

            cb(null, fileName)
        },

        
    }),

    upload: function ():  multer.Multer {

        return multer({ storage : this.storage, fileFilter: this.fileFilter})

    },
    fileFilter: function(req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
        const mediaTypesAllowed : string [] = [
            'image/jpg',
            'image/png',
            'image/jpeg'
        ]        

        if(!mediaTypesAllowed.includes(file.mimetype)){
            return cb(null, false);
        }

        return cb(null, true);

    }
}