import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'
import js from '@eslint/js'
import globals from 'globals'

/**
 * ESLint Flat Config
 */
export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  eslintConfigPrettier,

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

      // 严格代码检查规则（触发 npm run lint 报错）
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // 未使用变量直接 error 报错
      'no-console': 'off', // 允许 console 输出
      'no-debugger': 'error', // 禁用 debugger 调试器
    },
  },

  {
    ignores: ['dist/', 'node_modules/'],
  },
]
