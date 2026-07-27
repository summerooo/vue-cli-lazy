import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'
import js from '@eslint/js'

/**
 * ESLint Flat Config（现代配置格式）
 *
 * ESLint 负责代码质量检查（未使用变量、语法错误等）
 * Prettier 负责代码格式化（缩进、引号、分号等）
 * eslint-config-prettier 用于关闭 ESLint 中与 Prettier 冲突的规则
 */
export default [
  // 基础 JS 推荐规则
  js.configs.recommended,

  // Vue 3 推荐规则
  ...pluginVue.configs['flat/recommended'],

  // 关闭与 Prettier 冲突的规则（必须放在最后）
  eslintConfigPrettier,

  // 项目自定义规则
  {
    files: ['src/**/*.{js,vue}'],
    rules: {
      // ===== Vue 规则 =====
      // 允许单词组件名（如 Home.vue），教学项目放宽限制
      'vue/multi-word-component-names': 'off',
      // 每行最多属性数（模板中超过 3 个属性就换行）
      'vue/max-attributes-per-line': ['warn', { singleline: 3 }],
      // 允许 v-html（教学项目中使用，但需注意 XSS 风险）
      'vue/no-v-html': 'off',

      // ===== JS 规则 =====
      // 未使用变量（警告而非报错，对学生更友好）
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      // 禁止使用 console（警告，提醒学生生产环境应移除）
      'no-console': 'warn',
      // 禁止使用 debugger
      'no-debugger': 'warn',
      // 要求使用 const 声明不会被重新赋值的变量
      'prefer-const': 'warn',
    },
  },

  // 忽略目录
  {
    ignores: ['dist/', 'node_modules/', '*.config.js'],
  },
]
