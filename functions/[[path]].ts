import { createRequestHandler } from "@react-router/cloudflare";
import * as build from "../build/server";

export const onRequest = createRequestHandler({
  build,
});
// This file connects React Router Cloudflare Functions → React Router SSR.
