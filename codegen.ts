import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000",
  documents: ["src/**/*.tsx"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: ["typescript", "typescript-operations"],
      presetConfig: {
        gqlTagName: "gql",
      },
      config: {
        scalars: {
          intID: "number",
        },
      },
    },
  },
};

export default config;
