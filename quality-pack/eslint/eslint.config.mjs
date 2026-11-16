// Starter flat ESLint config for agent-heavy TS/React repos.
// Customize EFFECTS_GLOB via your repo copy; default allows hooks under src/lib/effects/

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

const effectsGlob = ['**/src/lib/effects/**', '**/lib/effects/**'];

const restrictedTimersMessage =
  'Raw timers are only allowed under src/lib/effects/. Use a wrapper hook (e.g. useDebounced) from that folder.';

const restrictedUseEffectMessage =
  'useEffect is only allowed under src/lib/effects/. Add a wrapper hook there and import it.';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': true,
          'ts-nocheck': true,
          'ts-check': false,
        },
      ],
      'no-warning-comments': [
        'error',
        {
          terms: ['fixme', 'xxx'],
          location: 'anywhere',
        },
      ],
    },
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    ignores: effectsGlob,
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: "CallExpression[callee.name='useEffect']",
          message: restrictedUseEffectMessage,
        },
      ],
      'no-restricted-globals': [
        'error',
        {
          name: 'setTimeout',
          message: restrictedTimersMessage,
        },
        {
          name: 'setInterval',
          message: restrictedTimersMessage,
        },
        {
          name: 'requestAnimationFrame',
          message: restrictedTimersMessage,
        },
      ],
    },
  },
  {
    files: effectsGlob,
    rules: {
      'no-restricted-syntax': 'off',
      'no-restricted-globals': 'off',
    },
  },
);