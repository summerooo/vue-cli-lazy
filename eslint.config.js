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
      // 关键修正：声明浏览器和 Node.js 全局对象（console, document, window, process, FormData 等）
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
      'vue/attributes-order': 'off', // 允许 v-if 与 :key 顺序自由

      // JS 规则
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off', // 允许 console 输出
      'no-debugger': 'warn',
      'prefer-const': 'warn',
    },
  },

  {
    ignores: ['dist/', 'node_modules/'],
  },
]
