import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
export default defineConfig({
  // Other Vite configuration options...

  esbuild: {
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    jsxInject: `import * as React from 'react'`,
    jsx: {
      factory: 'React.createElement',
      fragment: 'React.Fragment',
      throwIfNamespace: false,
    },
  },
  plugins: [react()]
});

// https://vitejs.dev/config/

// export default defineConfig({
//   plugins: [react()],
// })


