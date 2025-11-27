import { hydrateRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router";
import * as build from "../build/client";

const router = createBrowserRouter(build.routes);

hydrateRoot(document, <RouterProvider router={router} />);
