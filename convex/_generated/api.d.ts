/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as api_search from "../api/search.js";
import type * as api_users from "../api/users.js";
import type * as auth from "../auth.js";
import type * as crons from "../crons.js";
import type * as db_actionsInternal from "../db/actionsInternal.js";
import type * as db_mutationsInternal from "../db/mutationsInternal.js";
import type * as db_queriesInternal from "../db/queriesInternal.js";
import type * as http from "../http.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "api/search": typeof api_search;
  "api/users": typeof api_users;
  auth: typeof auth;
  crons: typeof crons;
  "db/actionsInternal": typeof db_actionsInternal;
  "db/mutationsInternal": typeof db_mutationsInternal;
  "db/queriesInternal": typeof db_queriesInternal;
  http: typeof http;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
