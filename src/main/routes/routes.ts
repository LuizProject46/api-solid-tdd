import {  Router, Request, Response} from "express";
import { signupController } from '../../useCases/Signup'
import { signinController } from "../../useCases/Signin";
import { Multer } from "../../configs/multer";
import { JWT } from "../../middlewares/jwt";


const router = Router()
const upload = Multer.upload()


/**GET ROUTES */
router.get('/users', JWT.authentication, (request: Request, response: Response) => {
    return response.json({ name: "ola"})
})

/**POST ROUTES */

router.post('/signup', upload.single('avatar') , (request: Request, response: Response) => {
    return signupController.execute(request, response)
})

router.post('/signin', (request: Request, response: Response) => {
    return signinController.execute(request, response)
})


export { router }