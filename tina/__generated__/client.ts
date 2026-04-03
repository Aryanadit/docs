import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '48468b17aeb1ee06b6701cf6ee73e5e237b641a5', queries,  });
export default client;
  