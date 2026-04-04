import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'ffe0aa8bcaa50758ade1d33649f695ff6114206e', queries,  });
export default client;
  