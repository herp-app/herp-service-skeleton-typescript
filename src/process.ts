/**
 * This file contains all the logic you need for your service.
 * Feel free to extend this file by others to structure more complex services.
 */

import { IDoRequest } from "./interfaces";

 
export function process(inputData: IDoRequest) {
    const values = inputData.data;
    const outputField = values.inputField1 + " " + values.inputField2;
    return {outputField};
 }