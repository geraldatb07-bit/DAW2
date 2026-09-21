import { version } from "./version.js";
import { resources } from "./resources.js";

export interface ApiConfig {
    name: string;
    description: string;
    host: string;
    port: number;
    status: string;
    version: version;
    resources: resources[];
}