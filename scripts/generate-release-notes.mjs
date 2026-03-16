/**
 * Release Notes Generator
 * 生成 Conventional Changelog 风格的发布说明
 */
import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'

const version = process.argv[2]

if (!version) {
  console.error('Usage: node generate-release-notes.mjs <version>')
  process.exit(1)
}

console.log(`Generating release notes for v${version}...`)

// 获取上次发布以来的 commit
function getCommits(sinceTag) {
  try {
    const log = execSync(
      `git log ${sinceTag}..HEAD --pretty=format:"%s|%h|%an" --reverse`,
      { encoding: 'utf8' }
    )
    return log.trim().split('\n').filter(Boolean)
  } catch {
    // 首次发布，获取所有 commit
    const log = execSync(
      `git log --pretty=format:"%s|%h|%an" --reverse`,
      { encoding: 'utf8' }
    )
    return log.trim().split('\n').filter(Boolean)
  }
}

// 获取上次发布的 tag
function getLastTag() {
  try {
    return execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim()
  } catch {
    return null
  }
}

// 解析 commit
function parseCommits(commits) {
  const types = {
    feat: { title: '✨ 新功能', items: [] },
    fix: { title: '🐛 Bug 修复', items: [] },
    docs: { title: '📝 文档', items: [] },
    style: { title: '💄 代码格式', items: [] },
    refactor: { title: '♻️ 重构', items: [] },
    perf: { title: '⚡ 性能优化', items: [] },
    test: { title: '🧪 测试', items: [] },
    build: { title: '📦 构建', items: [] },
    ci: { title: '🔧 CI/CD', items: [] },
    chore: { title: '🔨 其他', items: [] },
  }

  for (const commit of commits) {
    const [message, hash, author] = commit.split('|')
    const match = message.match(/^(\w+)(?:\(([^)]+)\))?:\s*(.+)/)
    if (match) {
      const [, type, scope, subject] = match
      if (types[type]) {
        const scopeStr = scope ? `**${scope}**: ` : ''
        types[type].items.push(`- ${scopeStr}${subject} (${hash.slice(0, 7)})`)
      }
    }
  }

  return types
}

// 生成 Markdown
function generateMarkdown(types) {
  let md = `# Release v${version}\n\n`

  const hasChanges = Object.values(types).some((t) => t.items.length > 0)

  if (!hasChanges) {
    md += '_此版本没有变更记录_\n'
    return md
  }

  for (const [type, { title, items }] of Object.entries(types)) {
    if (items.length > 0) {
      md += `## ${title}\n\n${items.join('\n')}\n\n`
    }
  }

  return md
}

// 主函数
function main() {
  const lastTag = getLastTag()
  console.log(`Last tag: ${lastTag || 'None'}`)

  const commits = getCommits(lastTag ? `v${lastTag}` : null)
  console.log(`Found ${commits.length} commits`)

  const types = parseCommits(commits)
  const markdown = generateMarkdown(types)

  // 输出
  console.log('\n--- Release Notes ---\n')
  console.log(markdown)

  // 保存到文件
  writeFileSync('RELEASE_NOTES.md', markdown)
  console.log('\nSaved to RELEASE_NOTES.md')
}

main()
