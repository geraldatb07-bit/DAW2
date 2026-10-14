import express, { Express, Request, Response } from "express";
import { APICONFIG } from "./config/apiConfig";
import { artistRouter } from "./routes/artistRoutes";
import { countryRouter } from "./routes/countryRoutes";
import { trackRouter } from "./routes/trackRoutes";
import { userRouter } from "./routes/userReoutes";

const app: Express = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
    return res.json(JSON.stringify(APICONFIG));
});

app.use("/tracks", trackRouter);

app.use("/artists", artistRouter)

app.use("/users", userRouter);

app.use("/countryes", countryRouter)

app.listen(APICONFIG.port, APICONFIG.host, () => {
    console.log(`Servidor escoltant a http://${APICONFIG.host}:${APICONFIG.port}`);
})
