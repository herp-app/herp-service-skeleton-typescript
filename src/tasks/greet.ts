/**
 * This file contains all the logic you need for your service.
 * Feel free to extend this file by others to structure more complex services.
 */

import { Server } from "socket.io";
import { IGreetingRequest, IGreetingResponse } from "../interfaces/microservice";

export async function greet(inputData: IGreetingRequest, socketIo: Server): Promise<IGreetingResponse> {
    socketIo.emit("greet:" + inputData.collaborationId.collaborationId, inputData.data.greetingName);
    
    return inputData;
 }