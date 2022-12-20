import { fileURLToPath, URL } from 'node:url'
import codegen from 'vite-plugin-graphql-codegen'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default ({ mode }: any) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  return defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      codegen({
        config: {
          schema: process.env.VITE_APP_API_URL,
          documents: 'src/**/*.ts',
          config: {
            preResolveTypes: true,
          },
          generates: {
            'src/types/graphql.types.ts': {
              plugins: ['typescript', 'typescript-operations', 'typescript-vue-apollo'],
              config: {
                typesPrefix: 'I',
                skipTypename: true,
                operationResultSuffix: 'Result',
                flattenGeneratedTypesIncludeFragments: true,
                dedupeOperationSuffix: true,
                useTypeImports: true,
                vueCompositionApiImportFrom: 'vue',
              },
            },
          },
        },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  })
}
