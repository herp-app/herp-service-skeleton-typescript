export interface IConfiguration {
    hostname: string;
    port: number;
    herp_uri: string;
    id: string;
}

export interface IRegistration {
    name: string;
    host: string;
    title: string;
    version: string;
    description: string;
}

export interface IField {
    fieldType: string;
    name: string;
    label: string;
}

export interface IInstallationRequest {
    nodeDefinitions: [
        {
            name: string;
            label: string;
            inputs: Array<IField>,
            outputs: Array<IField>,
        }
    ],
    // @todo: Link here hERP typescript package when available!
    configurations?: [
        {
            [key: string]: any;
            type: string;
            name: string;
        }
    ],
    permissions?: Array<string>;
}

export interface IInstallationResponse {
    installed: boolean;
    user: string;
    password: string;
}

export interface IDoRequest {
    id: string;
    data: {
        [keys: string]: any;
    };
}

export interface IDoResponse {
    id: string;
    data: {
        [keys: string]: any;
    };
}