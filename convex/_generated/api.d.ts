/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as blog from "../blog.js";
import type * as contact from "../contact.js";
import type * as http from "../http.js";
import type * as practiceAreas from "../practiceAreas.js";
import type * as router from "../router.js";
import type * as settings from "../settings.js";
import type * as testimonials from "../testimonials.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  blog: typeof blog;
  contact: typeof contact;
  http: typeof http;
  practiceAreas: typeof practiceAreas;
  router: typeof router;
  settings: typeof settings;
  testimonials: typeof testimonials;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
