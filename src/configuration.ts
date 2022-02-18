import Nconf from 'nconf';
import * as Path from 'path';
import * as Os from 'os';
import * as Fs from 'fs';
import { IConfiguration } from './interfaces/microservice';

/**
 * The config object the system will work with
 */
let config: IConfiguration

//
// the path of the configuration to store
//
const configPath = Path.join(__dirname, `configuration/config${process.env.NODE_ENV ? "." + process.env.NODE_ENV : ""}.json`);


function initiate() {
    /**
     * Dynamical Configuration
     * Handle the configuration that can be changed per instance. Using nconf for this feature.
     */
    Nconf.use('memory');

    //
    // load configurations from arguments
    //
    Nconf.argv();

    //
    // load configurations from environment variables
    //
    Nconf.env({
        separator: '__',
        lowerCase: true,
    });

    //
    // load configuration from file based on node_env
    //
    console.log("Try to load configuration ", configPath);
    if (Fs.existsSync(configPath)) {
        Nconf.file(configPath);
        console.log("Configuration ", configPath, "found and loaded");
    }

    //
    //  setting defaults
    //
    Nconf.defaults({
        service: {
            hostname: Os.hostname(),
            port: 6100,
        }
    }).required(['service:herp_uri']);

    config = Nconf.get("service");
}

function set(key: string, value: any) {
    Nconf.set("service:" + key, value);
    config = Nconf.get("service");
}

function save() {
    Fs.writeFileSync(configPath, JSON.stringify({service: config}, null, 4));
}

function get() {
    return config;
}

const Config = {
    save,
    get,
    initiate,
    set,
};


export default Config;