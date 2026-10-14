import { APICONFIG } from "./config/apiConfig";
import { app } from "./app";

app.listen(APICONFIG.port, APICONFIG.host, () => {
    console.log(`Servidor escoltant a http://${APICONFIG.host}:${APICONFIG.port}`);
});