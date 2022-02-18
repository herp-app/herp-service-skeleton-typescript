import Config from "../configuration";
import { IRegistration } from "../interfaces/microservice";
import Axios from "axios";

/**
 * Configurations
 * This configurations are hard coded and should not be changed on runtime! Please change it to your needs.
 */

 //
// machine readable name of your service. 
// This equals the unique identifier. 
// Thats why you should use your website for this.
//
const serviceName: string = "helloWorld.herp.app"; 

//
// Human readable title of your Service
//
const serviceTitle: string = "Hello World exampler";

//
// Service description
//
const serviceDescription: string = "A service that displays a greeting text";

//
//  actual version of the instance
//
const serviceVersion: string = "0.1.0";


/**
 * Register function to knock at herps door.
 */
 const register = async () => {
    if (Config.get().registered) {
        return;
    }

    console.log("Register service to herp on " + Config.get().herp_uri);
    try {
        const registration: IRegistration = {
            _hid: Config.get().id,
            type: "microservice",
            bundle: "helloWorld",
            name: serviceName,
            host: Config.get().hostname + ":" + Config.get().port,
            label: serviceTitle,
            version: serviceVersion,
            description: serviceDescription,
            endpoints: [
                {
                    path: "/helloWorld",
                    inputs: {
                        data: {
                            greetingName: {
                                type: "field",
                                bundle: "helloWorld",
                                fieldType: "string",
                                name: "greetingName",
                                label: "Name to greet",
                            } 
                        },
                        unchanged: {
                            greetingName: {
                                type: "field",
                                bundle: "helloWorld",
                                fieldType: "string",
                                name: "greetingName",
                                label: "Name to greet",
                                optional: true,
                            } 
                        },
                        collaborationId: {
                            collaborationId: {
                                type: "field",
                                bundle: "helloWorld",
                                fieldType: "string",
                                name: "collaborationId",
                                label: "collaborationId",
                                optional: true,
                            } 
                        }
                    },
                    outputs: {
                        data: {
                            greetingName: {
                                type: "field",
                                bundle: "helloWorld",
                                fieldType: "string",
                                name: "greetingName",
                                label: "Name to greet",
                            } 
                        }
                    }
                }
            ]
        };

        const result = await Axios.post(Config.get().herp_uri + "/services/register", registration);
        
        // save id to config
        Config.set("id", result.data._hid);
        Config.set("registered", true);
        Config.save();
        console.log("Registered service successful");
    } catch (e: any) {
        console.error(e.response.data);
    }
}

export default register;