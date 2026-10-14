import { version } from "./version";
import { resources } from "./resources";

export interface ApiConfig {
    name: string;
    description: string;
    host: string;
    port: number;
    status: string;
    version: version;
    resources: resources[];
}