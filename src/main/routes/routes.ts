import { json, Router, Request, Response} from "express";
import { signupController } from '../../useCases/Signup'
import { signinController } from "../../useCases/Signin";

const router = Router()

/**GET ROUTES */
router.get('/ping', (request: Request, response: Response) => {
    return response.json({
        message: "pong"
    })
})

router.get('/users', (request: Request, response: Response) => {
    return response.json({ name: "ola"})
})



/**POST ROUTES */

router.post('/user/new', (request: Request, response: Response) => {
    return signupController.execute(request, response)
})

router.post('/signin', (request: Request, response: Response) => {
    return signinController.execute(request, response)
})


export { router }