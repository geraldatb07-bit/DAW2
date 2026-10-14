import { app } from "./app";
import { APICONFIG } from "./config/apiConfig";

app.listen(APICONFIG.port, APICONFIG.host, () => {
    console.log(`Servidor escoltant a http://${APICONFIG.host}:${APICONFIG.port}`);
})
