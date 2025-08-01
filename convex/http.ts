import { httpRouter } from "convex/server";

const http = httpRouter();

// Remove complex routing for now since we're handling auth through mutations
export default http;
