import { DeepPartial } from "../utils/utils";
import { IGreeting } from "./responseData";

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 *  MICROSERVICE STUFF
 * * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * */

export interface IConfiguration {
    hostname: string;
    port: number;
    herp_uri: string;
    id: string;
    user: string;
    password: string;
    registered: boolean;
}

type NodeTypePort = {[key: string]: {[key: string]: unknown}}

export interface IRegistration {
    _hid?: string;
    type: "microservice";
    bundle: string;
    name: string;
    label: string;
    host: string;
    version: string;
    description: string;
    endpoints: Array<{
        path: string;
        inputs?: NodeTypePort;
        outputs?: NodeTypePort;
    }>
}

export interface IField {
    fieldType: string;
    name: string;
    label: string;
}

export interface IInstallationRequest {
    configurations?: Array<
        {
            [key: string]: any;
            type: string;
            name: string;
        }
    >,
    permissions?: Array<string>;
}

export interface IInstallationResponse {
    installed: boolean;
    user: string;
    password: string;
}


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 *  PROCESSING METHOD FROM WORKFLOW
 * * * * * * * * * * * * * * * * * * * * *  * * * * * * * * * */
export interface IGreetingRequest {
    id: string;
    data: DeepPartial<IGreeting>;
    unchanged: DeepPartial<IGreeting>;
    collaborationId: {
        formId: string;
        collaborationId: string;
    };
}

export interface IGreetingResponse {
    id: string;
    data: DeepPartial<IGreeting>;
}
