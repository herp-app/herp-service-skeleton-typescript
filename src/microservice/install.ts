import { FastifyInstance } from "fastify";
import Config from "../configuration";
import { IInstallationRequest, IInstallationResponse } from "../interfaces/microservice";


const install = (app: FastifyInstance) => {
/**
 * This endpoint is called by herp if a user requests installation info.
 */
 app.get('/install', function (req, res) {
    const installation: IInstallationRequest = {
        permissions: [
            "content:helloWorld:all",
            "formCollaboration::read",
        ],
        configurations: [
            // add a bundle
            {
                _hid: "Bundle.620a21aaa5c8a89efae96c50",
                name: "helloWorld",
                type: "bundle",
                label: "Hello World Bundle",
            },
            // add a layout embedded for the layout page
            {
                _hid: "LayoutEmbedded.620a21840a5665ed902b618b", // generate a custom hid with herp-cli tools
                type: "layoutEmbedded",
                bundle: "helloWorld",
                name: "helloWorldPage",
                label: "Hello World Page",
                description: "Shows an interactive Hello World string",
                embeddedType: {
                    microservice: {
                        microservice: "Microservice.620a226f8b935a184b76dd87",
                        endpoint: "helloWorld",
                    }
                }
            },
        ]
      };
    res.send(installation);
  });
  
  
  /**
   * The install post method will call by herb after a successfull installation.
   * This can be used to populate database with data
   */
  app.post<{Body: IInstallationResponse}>('/install', function (req, res) {
      const data = req.body;
      console.log("service is installed");
  
      // store credentials of created service user in config file
      Config.set("user", data.user);
      Config.set("password", data.password);
      Config.save();
      
  
      res.send({});
    });
  
}

export default install;