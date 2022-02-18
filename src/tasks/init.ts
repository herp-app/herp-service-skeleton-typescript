import { FastifyInstance } from "fastify";
import { Server } from "socket.io";
// import DataStore from "../utils/DataStore";
import { IGreetingRequest } from "../interfaces/microservice";
// import { greet } from "./greet";

/**
 * Starting Data Memory Storage
 */
//  const dataStorage = new DataStore();

const init = (app : FastifyInstance, socketIo: Server) => {

    socketIo.on("connection", (socket) => {
        
        // Do stuff here when client connects

    });

    /**˚
     * This endpoint is default and called whenever a node instance of this service gets triggerd inside a workflow
     */
    app.post<{Body: IGreetingRequest}>('/helloWorld', async function (req, res) {
        const data = req.body;
        // dataStorage.set(data.collaborationId.collaborationId, data);

        // const output = await greet(data, socketIo);
        //@ts-ignore
        console.log("Hello ", data.data.name, "how are you today?");
        res.send({data: {greetingName: "ok"}});
    });

}

export default init;