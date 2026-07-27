import pluginVue from 'eslint-plugin-vue'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
import js from '@eslint/js'
import globals from 'globals'

/**
 * ESLint Flat Config (集成 Prettier 格式检错)
 */
export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  eslintPluginPrettier, // 将 Prettier 格式问题直接作为 ESLint Error 弹出

  {
    files: ['**/*.{js,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Vue 规则
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': ['warn', { singleline: 5 }],
      'vue/no-v-html': 'off',
      'vue/attributes-order': 'off',

      // 严格代码检查规则
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
      'no-debugger': 'error',

      // 开启 Prettier 规则报错
      'prettier/prettier': 'error',
    },
  },

  {
    ignores: ['dist/', 'node_modules/'],
  },
]
