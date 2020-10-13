import Config from "./configuration";
import Axios from "axios";
import Express from "express";
import * as BodyParser from "body-parser";
import { IDoRequest, IField, IInstallationRequest, IInstallationResponse, IRegistration } from "./interfaces";
import { process } from "./process";

/**
 * Configurations
 * This configurations are hard coded and should not be changed on runtime! Please change it to your needs.
 */

 //
// machine readable name of your service. 
// This equals the unique identifier. 
// Thats why you should use your website for this.
//
const serviceName: string = "skeleton-ts.herp.app"; 

//
// Human readable title of your Service
//
const serviceTitle: string = "TS Skeleton Service";

//
// Service description
//
const serviceDescription: string = "A skeleton service with all necessary functionality to talk with herp but without any logic. Feel free to integrate your ideas!";

//
//  actual version of the instance
//
const serviceVersion: string = "0.1.0";


Config.initiate();


/**
 * Register function to knock at herps door.
 */
const register = async () => {
    console.log("Register service to herp on " + Config.get().herp_uri);
    try {
        const registration: IRegistration = {
            name: serviceName,
            host: Config.get().hostname + ":" + Config.get().port,
            title: serviceTitle,
            version: serviceVersion,
            description: serviceDescription,
        };

        const result = await Axios.post(Config.get().herp_uri + "/services/register", registration);

        // save id to config
        Config.set("id", result.data._id);
        Config.save();
        console.log("Registered service sucessfull");
    } catch (e) {
        console.error(e.message);
    }
}



/**
 * Starting the webserver
 */
var app = Express();
app.use(BodyParser.json());


/**
 * This endpoint is default and called whenever a node instance of this service gets triggerd inside a workflow
 */
app.post('/do', function (req, res) {
    const data: IDoRequest = req.body;
    const output = process(data);
    res.send(output);
});


/**
 * This endpoint is called by herp if a user requests installation info.
 */
app.get('/install', function (req, res) {
    const installation: IInstallationRequest = {
        nodeDefinitions: [
            // #1 a node definition with one input and one output
            {
                name: "combineString",
                label: "Combine two strints to one single string",
                inputs: [
                    {
                        fieldType: "string",
                        name: "inputField1",
                        label: "String Input 1"
                    },
                    {
                        fieldType: "string",
                        name: "inputField2",
                        label: "String Input 2"
                    },
                ],
                outputs: [
                    {
                        fieldType: "string",
                        name: "outputField",
                        label: "Combined strings"
                    },
                ]
            },
        ],
      };
    res.send(installation);
  });
  
  
  /**
   * The install post method will call by herb after a successfull installation.
   * This can be used to populate database with data
   */
  app.post('/install', function (req, res) {
      const data: IInstallationResponse = req.body;
      console.log("service is installed");
  
      // store credentials of created service user in config file
      Config.set("user", data.user);
      Config.set("password", data.password);
      Config.save();
      
  
      res.send({});
    });
  
  
  
  app.listen(6100, async function () {
      console.log(`Service listening on ${Config.get().hostname}:${Config.get().port}!`);
      // register service to herp
      await register();
  });
  