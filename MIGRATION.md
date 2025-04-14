# TaroViz 项目迁移说明

## 迁移原因

为了提供更好的维护和支持，TaroViz 项目已经从原来的 `@agions` 作用域迁移到 `@agions` 作用域下。这次迁移包含以下几个主要目的：

1. **更好的维护支持**：通过个人作用域管理，可以提供更及时的更新和维护
2. **版本统一管理**：所有包统一升级到 1.0.1 版本，建立更清晰的版本发布周期
3. **文档完善**：提供更详细的中文文档支持
4. **包名优化**：采用更清晰的包命名规范，便于理解和使用

## 包名变更对照表

| 原包名               | 新包名                   | 说明         |
| -------------------- | ------------------------ | ------------ |
| @agions/core        | @agions/taroviz-core     | 核心功能包   |
| @agions/adapters    | @agions/taroviz-adapters | 平台适配器   |
| @agions/hooks       | @agions/taroviz-hooks    | React Hooks  |
| @agions/data        | @agions/taroviz-data     | 数据处理工具 |
| @agions/themes      | @agions/taroviz-themes   | 主题系统     |
| @agions/core-bundle | @agions/taroviz          | 整合包       |

## 迁移步骤

1. 更新依赖声明：

```diff
- "@agions/core": "^0.5.1"
- "@agions/core-bundle": "^0.5.1"
+ "@agions/taroviz": "^1.0.0"
```

2. 更新导入语句：

```diff
- import { useChart } from '@agions/hooks';
+ import { useChart } from '@agions/taroviz-hooks';

- import { LineChart } from '@agions/core-bundle';
+ import { LineChart } from '@agions/taroviz';
```

3. 更新 TypeScript 类型引用：

```diff
- import type { ChartOptions } from '@agions/core';
+ import type { ChartOptions } from '@agions/taroviz-core';
```

## 重要说明

> **注意**：原 npm 包 [@agions](https://www.npmjs.com/package/taroviz) 和 [@agions/core-bundle](https://www.npmjs.com/package/@agions/core-bundle) 已停止维护并删除。请使用新的 `@agions` 作用域下的包。

## 新特性

1. 完整的 TypeScript 类型支持
2. 更好的文档和示例
3. 更稳定的版本发布
4. 持续的维护支持

## 联系方式

如果在迁移过程中遇到任何问题，请通过以下方式联系我们：

- GitHub Issues: [https://github.com/agions/taroviz/issues](https://github.com/agions/taroviz/issues)

## 相关链接

- 新版文档：[https://github.com/agions/taroviz](https://github.com/agions/taroviz)
- 更新日志：[CHANGELOG.md](./CHANGELOG.md)
