import { json, Router, Request, Response} from "express";

const routes = Router()

routes.get('/ping', (request: Request, response: Response) => {
    return response.json({
        message: "pong"
    })
})


export default routes