import app from "./app";
import { Logger } from "tslog";
const log: Logger = new Logger({ name: "console", overwriteConsole: true });

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: any) {
  const portVal = parseInt(val, 10);
  if (isNaN(portVal)) {
    // named pipe
    return val;
  }
  if (portVal >= 0) {
    // port number
    return portVal;
  }
  return false;
}

/**
 * Set HTTP port for application
 */
const port = normalizePort(process.env.PORT || "3001");
app.set("port", port);

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
  console.debug(
    "App is running at http://localhost:" +
      app.get("port") +
      " in " +
      app.get("env") +
      " mode"
  );
  console.debug("Press CTRL-C to stop");
});

export default server;
