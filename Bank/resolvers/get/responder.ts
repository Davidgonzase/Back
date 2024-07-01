import {Request, Response} from "express"

const responder = (req:Request,res:Response) => {
    res.send(Object.toString(req))
}

export default responder;