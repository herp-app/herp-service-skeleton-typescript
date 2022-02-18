import Config from "./configuration";
import Fastify from 'fastify';
import FastifyCors from "fastify-cors";
import FastifyNext from "fastify-nextjs";
import { Server } from "socket.io";
import register from "./microservice/register";
import install from "./microservice/install";
import init from "./tasks/init";


Config.initiate();

/**
 * Starting the webserver
 */
var app = Fastify({
    logger: false,
    pluginTimeout: 20000,
});

app.register(FastifyCors);
app.register(FastifyNext, {
    dev: true,
    logLevel: "debug",
    noServeAssets: false,
})
.after(() => {
  app.next('/visualization');
  app.next('/details');
});

// Initiate socket
const socketIo = new Server(app.server);

// initialize greeting functionality
init(app, socketIo);

// Apply installation behavior of the microservice
install(app);

app.listen(Config.get().port, '0.0.0.0', async (err, address) => {
    if (err) { throw err; }

    app.log.info(`server listening on ${address}`);
    console.log(`server listening on ${address}`);
    // register service to herp
    await register();
});
  