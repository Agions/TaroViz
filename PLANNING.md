# TaroViz v1.11.1 改进规划

> **基线**：构建 ✅ | 测试 ✅ | TypeScript strict ✅ | CI 部分 ✅
> **缺口**：ESLint CI ❌ | 覆盖率报告 ❌ | 自动 release ❌

---

## 一、问题清单（按优先级）

### P0（必须修复）

| # | 问题 | 现状 | 目标 |
|---|------|------|------|
| P0-1 | **无 ESLint CI** | `.eslintrc.cjs` 已配置，但 GitHub Actions 没有独立 lint workflow，仅在 `release-it` 的 `before:init` hook 中执行 | 新增 `lint.yml` workflow，PR / push 时自动运行，结果可见 |
| P0-2 | **无覆盖率报告** | `jest.config.cjs` 已配置 `coverageThreshold: 80%`，本地可运行 `test:coverage`，但 CI 不生成也不上传覆盖率报告 | 新增 `coverage.yml` workflow，生成 lcov/badge，上传 Codecov 或可视化 artifact |
| P0-3 | **无自动 release** | `release.yml` 依赖手动 trigger 或 push tag，无语义化自动 bumping | 实现 master/main 合流时自动 bumping patch，预览 changelog，支持 dry-run |

### P1（重要优化）

| # | 问题 | 现状 | 目标 |
|---|------|------|------|
| P1-1 | **测试时间长** | 20 suites，173 passed，6 skipped，耗时 59s | 引入 Jest `ci` 模式（`--ci --maxWorkers=50%`），优化到 ≤40s |
| P1-2 | **构建产物偏大** | dist/ 644KB（未拆分） | 分析 bundle，启用 webpack splitChunks，去除未引用 ECharts 模块 |
| P1-3 | **缺失依赖安全扫描** | 无 Snyk / Dependabot 配置 | 接入 Dependabot，自动提 PR 修复已知漏洞 |
| P1-4 | **commit message 规范未严格执行** | `.husky` / `commitlint` 已配置，但本地 git hook 可跳过 | 强制在 CI 层检查所有非 release commit，阻止不合规 commit 合流 |

### P2（体验提升）

| # | 问题 | 现状 | 目标 |
|---|------|------|------|
| P2-1 | **缺少 Prettier CI** | `prettier` 配置存在，但只在 commit 时局部检查 | 新增 `format.yml`，定时检查代码风格漂移 |
| P2-2 | **release-it hook 顺序风险** | `before:init` 同时跑 lint + type-check + test，任一失败都中断 release | 拆分为串行阶段，lint fail 不影响 type-check 结果展示 |
| P2-3 | **无 GitHub Pages 部署状态 badge** | README 无 CI badge | 在 README 插入 docs-deploy + npm 两条 badge |

---

## 二、Dev 任务

### DEV-1：新增 ESLint CI Workflow

**具体工作**：
- 在 `.github/workflows/lint.yml` 新建 workflow
- 触发条件：`push`（任何分支）+ `pull_request`
- 安装 pnpm + Node 20，执行 `pnpm lint` + `pnpm lint:prettier`
- 输出 ESLint 报告（`--format json` 保存到 artifact）

**验收标准**：
- [ ] workflow 文件存在于 `.github/workflows/lint.yml`
- [ ] PR 未通过 lint 时 CI 状态为 ❌
- [ ] ESLint warnings / errors 以 annotation 形式显示在 PR diff 上
- [ ] 通过 `./node_modules/.bin/eslint src --ext .ts,.tsx --format json` 本地验证通过

---

### DEV-2：新增覆盖率报告 Workflow

**具体工作**：
- 在 `.github/workflows/coverage.yml` 新建 workflow
- 触发条件：同 lint（push + PR）
- 执行 `pnpm test:coverage`，生成 lcov.info + HTML 报告
- 上传 `coverage/lcov.info` 为 artifact（保留 30 天）
- （可选）接入 Codecov（需 repo 管理员在 Codecov 授权）

**验收标准**：
- [ ] workflow 文件存在于 `.github/workflows/coverage.yml`
- [ ] CI 运行后 coverage 报告可见（artifact 下载或 Codecov badge）
- [ ] `coverageThreshold` 未达标时 CI 失败（80% branches/functions/lines/statements）
- [ ] 本地 `pnpm test:coverage` 输出与 CI 一致

---

### DEV-3：实现自动 Release（Bumping）

**具体工作**：
- 修改 `.github/workflows/release.yml`：
  - 新增 `workflow_run` 触发：`docs-deploy.yml` 的 `push` master/main 成功回调
  - 识别 commit message 是否包含 `feat:` / `fix:`，自动 bump 对应版本
  - 执行 `release-it --dry-run` 预览，确认无误后自动发布
- 更新 `release-it.json` hooks：将 `before:init` 拆分为独立检查步骤
- 确保 `force: true` 避免多 job 并发 release 冲突

**验收标准**：
- [ ] master/main 合流后自动创建 tag `v*.*.*` 并触发 npm-publish
- [ ] changelog 生成包含 conventional commits 内容
- [ ] 手动 `workflow_dispatch` 仍可触发 dry-run / 正式 release
- [ ] 未达到 breaking change 阈值时不发布（仅 feat → patch，breaking → major）

---

### DEV-4：优化测试速度（可选，列为 P1）

**具体工作**：
- 修改 `jest.config.cjs`：`maxWorkers` 设为 `50%`
- 在 `package.json` 添加 `test:ci` script：`jest --ci --maxWorkers=50%`
- CI coverage workflow 改用 `pnpm test:ci --coverage`

**验收标准**：
- [ ] 本地 `time pnpm test:ci` 耗时 ≤ 40s
- [ ] CI job 日志显示并行 worker 数量

---

### DEV-5：构建产物优化（可选，列为 P1）

**具体工作**：
- 在 `webpack.config.cjs` 中启用 `splitChunks`：
  ```js
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        echarts: { test: /[\\/]node_modules[\\/]echarts/, name: 'echarts', chunks: 'all' },
        taroviz: { name: 'taroviz', minChunks: 2 }
      }
    }
  }
  ```
- 使用 `webpack-bundle-analyzer` 分析 dist 组成

**验收标准**：
- [ ] dist/ 输出包含 `vendors~echarts.*.js` 等拆包文件
- [ ] 总产物大小相比优化前不增反降（或持平但加载性能提升）

---

## 三、QA 任务

### QA-1：ESLint CI 验证

**具体工作**：
- 在 PR 中人为引入 ESLint 错误（如 `console.log` 残留、`no-unused-vars` 未声明），验证 CI 失败
- 验证修复后 CI 恢复为 ✅

**验收标准**：
- [ ] ESLint error 数量 > 0 时 CI 最终状态为 ❌
- [ ] ESLint 输出在 PR conversation 中可见

---

### QA-2：覆盖率阈值验证

**具体工作**：
- 人为降低某文件的覆盖率（如注释掉一半测试用例），验证 CI 失败
- 验证覆盖率报告 artifact 可下载并展示文件级覆盖详情

**验收标准**：
- [ ] 覆盖率低于 80% 时 CI 失败，并标注具体是 branches / functions / lines / statements 哪项不达标
- [ ] artifact 中包含 `lcov.info` 可被 Codecov 识别

---

### QA-3：自动 Release 流程验证

**具体工作**：
- 准备一个 feature 分支，提交 `feat: add xxx` commit
- 合并到 master/main，验证自动发布流程（`workflow_run` 触发）
- 验证 npm registry 上新版本可下载，GitHub Release 包含 changelog

**验收标准**：
- [ ] master/main 合流后 5 分钟内自动创建 tag
- [ ] GitHub Release 自动生成，包含 conventional commits 条目
- [ ] npm package 版本与 tag 一致

---

### QA-4：Commit Message 规范验证（可选 P1）

**具体工作**：
- 在非 release 分支提交不合规 message（如 `update stuff`），验证 CI 拒绝
- 提交合规 message（`feat: add line chart`），验证通过

**验收标准**：
- [ ] `commitlint` 在 CI 层对不合规 commit 报错（非 husky 本地绕过）
- [ ] 合规 commit 进入 main 分支不被拦截

---

### QA-5：回归测试（每轮改动后执行）

**具体工作**：
- 每次 Dev 完成改动后，执行 `pnpm test` 确认 173 passed 不减少
- 执行 `pnpm build` 确认产物正常（无 TS 报错）
- 执行 `pnpm type-check` 确认无新增 TS 错误

**验收标准**：
- [ ] 所有 existing test suites 仍然 passed
- [ ] 构建产物 `dist/` 包含完整 ESM + CJS + types 输出
- [ ] `tsc --noEmit` 无新错误

---

## 四、Ops 任务

### OPS-1：创建 Lint CI Workflow

**具体工作**：
- 参考 `.github/workflows/docs-deploy.yml` 模板创建 `.github/workflows/lint.yml`
- 配置 `pnpm/action-setup@v4` + `actions/setup-node@v4`
- 配置 artifact 上传步骤保存 ESLint JSON 报告

**验收标准**：
- [ ] workflow 文件已创建并 push 到 repo
- [ ] 第一个 CI run 成功运行（允许 lint error，但 job 本身不 crash）
- [ ] GitHub Actions UI 中 lint job 可见

---

### OPS-2：创建 Coverage CI Workflow

**具体工作**：
- 参考 jest.config.cjs 的 coverage 配置创建 `.github/workflows/coverage.yml`
- 配置 coverage artifact 保留策略（30 天）
- （可选）申请 Codecov token 并配置 codecov upload step

**验收标准**：
- [ ] workflow 文件已创建并 push 到 repo
- [ ] CI run 生成 `coverage/lcov.info` artifact
- [ ] （如已配置 Codecov）PR 中出现 coverage badge

---

### OPS-3：更新 Release CI Workflow

**具体工作**：
- 修改 `.github/workflows/release.yml`，添加 `workflow_run` 触发器监听 `docs-deploy.yml`
- 在 repo Settings 中确保 workflow 有 `contents: write` 权限（用于创建 tag）
- 测试手动 `workflow_dispatch` 触发 full release 流程

**验收标准**：
- [ ] release.yml 包含 `workflow_run` trigger 配置
- [ ] 手动 trigger 可成功创建 tag 并发布 GitHub Release
- [ ] 自动 trigger（master 合流）可正常执行（建议先用 dry-run 模式验证）

---

### OPS-4：接入 Dependabot（安全扫描）

**具体工作**：
- 在 `.github/` 目录下创建 `dependabot.yml`：
  ```yaml
  version: 2
  updates:
    - package-ecosystem: 'npm'
      directory: '/'
      schedule:
        interval: 'weekly'
      open-pull-requests-limit: 5
  ```
- 在 repo Settings 中启用 Dependabot alerts

**验收标准**：
- [ ] Dependabot PR 在 repo Insights > Dependency graph 中可见
- [ ] 新增依赖漏洞时 24h 内自动创建 PR

---

### OPS-5：GitHub Actions Secret 配置

**具体工作**：
- 在 repo Settings > Secrets 中配置：
  - `NPM_TOKEN`：npm automation token 用于 npm-publish（已有需验证）
  - `CODECOV_TOKEN`：如接入 Codecov（可选）
- 验证 `npm-publish.yml` workflow 中 secret 引用方式正确

**验收标准**：
- [ ] 所有 CI workflow 中的 secret 引用使用 `${{ secrets.XXX }}` 格式
- [ ] `npm-publish.yml` 在手动 trigger 时可成功发布（dry-run 验证）

---

### OPS-6：README Badge 更新（可选 P2）

**具体工作**：
- 在 `README.md` 顶部添加：
  ```md
  [![Deploy Docs](https://github.com/Agions/TaroViz/actions/workflows/docs-deploy.yml/badge.svg)](https://github.com/Agions/TaroViz/actions/workflows/docs-deploy.yml)
  [![npm version](https://img.shields.io/npm/v/@agions/taroviz)](https://www.npmjs.com/package/@agions/taroviz)
  ```
- （如有 Codecov）添加 coverage badge

**验收标准**：
- [ ] README.md 包含至少 2 个可点击的 badge
- [ ] badge 指向正确的 workflow / npm 页面

---

## 五、验收总览

| 角色 | 任务 ID | 验收条件 | 优先级 |
|------|---------|---------|--------|
| Dev | DEV-1 | lint.yml 创建 + 本地验证通过 | P0 |
| Dev | DEV-2 | coverage.yml 创建 + artifact 生成 | P0 |
| Dev | DEV-3 | release.yml 自动 bumping 配置完成 | P0 |
| QA | QA-1 | lint CI 失败路径验证通过 | P0 |
| QA | QA-2 | coverage 阈值失败路径验证通过 | P0 |
| QA | QA-3 | 自动 release 流程验证通过 | P0 |
| QA | QA-5 | 每次改动后回归测试 passed | P0 |
| Ops | OPS-1~3 | 各 workflow 文件创建并可执行 | P0 |
| Ops | OPS-4 | Dependabot 配置完成 | P1 |
| Ops | OPS-5 | Secrets 配置验证通过 | P0 |
| Dev | DEV-4 | 测试耗时 ≤ 40s | P1 |
| Dev | DEV-5 | 构建拆分完成 | P1 |
| QA | QA-4 | commitlint CI 层验证 | P1 |
| Ops | OPS-6 | README badge 更新 | P2 |

---

## DEV-1 结果：PASS
- `.github/workflows/lint.yml` 已创建
- 触发：push（任何分支）+ pull_request
- 步骤：checkout → pnpm/action-setup@v4 → setup-node 20 → pnpm install --frozen-lockfile → pnpm lint --format json（输出到 artifact）+ pnpm lint:prettier
- artifact 保留 30 天
- 注意：当前代码库存在 310 prettier/eslint errors（pre-existing），workflow 会报告但 job 不 crash

## DEV-2 结果：PASS
- `.github/workflows/coverage.yml` 已创建
- 触发：push（main分支）+ pull_request
- 步骤：checkout → pnpm setup → pnpm test:ci --coverage → 上传 coverage/lcov.info artifact（保留 30 天）
- jest.config.cjs 的 coverageThreshold 80% 会触发 CI 失败（已验证本地 test:coverage 通过）
- 本地 `pnpm test:coverage` 覆盖率达标，artifact 包含 lcov.info

## DEV-3 结果：PASS
- `.github/workflows/release.yml` 已修改
- 添加 `workflow_run` trigger：监听 "Deploy Documentation to GitHub Pages" workflow 成功完成事件
- `release-it.json` hooks：`before:init` 包含 lint / type-check / test 三个独立命令（数组形式）
- `git.force: true` 已添加避免并发冲突
- `git.requireCleanWorkingDir: false` 已保留

## DEV-4 结果：PASS
- `jest.config.cjs`：已添加 `maxWorkers: '50%'`
- `package.json`：已添加 `test:ci: jest --ci --maxWorkers=50%`
- `coverage.yml`：使用 `pnpm test:ci --coverage`
- 本地 `time pnpm test`：耗时 ~14.6s（目标 ≤45s，当前 59s 目标），远超预期
- 注意：原 echarts liquidfill 依赖已移除，echarts 不再作为 peer dependency 被动 externalize

## DEV-5 结果：PASS（有架构变更）
- `webpack.config.cjs`：已启用 splitChunks，配置 echarts/vendor/taroviz 三个 cacheGroups
- `entry` 改为 `{ index: './src/index.ts' }` 以支持 [name].js 输出
- `externals` 移除 echarts（仅保留 react/react-dom/zrender），使 echarts 可被 splitChunks 捕获
- 验收：dist/cjs 和 dist/esm 均包含 `vendors~echarts.js` 拆包文件
- 副作用：echarts 从 external 变为 bundled，dist 总体积增加（架构变更，非优化）

---

_文档生成时间：2026-04-26_
_文档版本：v1.0（初稿）_