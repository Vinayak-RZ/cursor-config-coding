/** @type {import('dependency-cruiser').IConfiguration} */
export default {
  forbidden: [
    {
      name: 'no-feature-to-sibling',
      comment:
        'Do not import another feature folder. Fix: import from contracts/ or the other feature public index only.',
      severity: 'error',
      from: { path: '^src/features/[^/]+/' },
      to: {
        path: '^src/features/',
        pathNot: ['^src/features/[^/]+/index\\.'],
      },
    },
    {
      name: 'no-framework-to-app',
      comment:
        'shared framework packages must not import product features. Fix: invert dependency or expose a hook in contracts/.',
      severity: 'error',
      from: { path: '^(packages|lib)/' },
      to: { path: '^src/features/' },
    },
    {
      name: 'no-ui-to-data',
      comment: 'UI must not import data access. Fix: call a service or server action instead.',
      severity: 'error',
      from: { path: '^(src/)?(app|components|pages)/' },
      to: { path: '^(src/)?(db|repositories|data)/' },
    },
    {
      name: 'no-client-to-server-only',
      comment:
        'Client bundles must not import server-only modules. Fix: move shared types to contracts/ and keep server code behind actions.',
      severity: 'error',
      from: { path: '\\.client\\.(tsx?|jsx?)$' },
      to: { path: '(server-only|/server/)' },
    },
  ],
  options: {
    doNotFollow: {
      path: 'node_modules',
    },
    tsPreCompilationDeps: true,
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default'],
    },
  },
};