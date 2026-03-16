module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 新功能
        'fix',      // Bug 修复
        'docs',     // 文档更新
        'style',    // 代码格式（不影响功能）
        'refactor', // 重构（既不是新功能也不是修复）
        'perf',     // 性能优化
        'test',     // 测试相关
        'build',    // 构建系统或外部依赖变更
        'ci',       // CI 配置文件和脚本变更
        'chore',    // 其他不修改源码或测试文件的变更
        'revert',   // 回滚之前的提交
        'WIP'       // 工作进行中
      ]
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100]
  }
}
