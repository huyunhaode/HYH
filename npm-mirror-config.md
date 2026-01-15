# NPM 国内镜像源配置指南

## 常用国内镜像源

| 镜像源 | 地址 |
|--------|------|
| 淘宝镜像 (npmmirror) | https://registry.npmmirror.com |
| 腾讯云镜像 | https://mirrors.cloud.tencent.com/npm/ |
| 华为云镜像 | https://repo.huaweicloud.com/repository/npm/ |

> **推荐使用淘宝镜像**，更新速度快、稳定性好。

---

## 配置方法

### 方法一：永久配置（推荐）

```bash
# 设置淘宝镜像
npm config set registry https://registry.npmmirror.com

# 验证配置是否生效
npm config get registry
```

### 方法二：临时使用

在安装包时添加 `--registry` 参数：

```bash
npm install <package-name> --registry https://registry.npmmirror.com
```

### 方法三：通过 .npmrc 文件配置

在项目根目录或用户主目录创建 `.npmrc` 文件：

```bash
# 项目级配置（仅对当前项目生效）
echo "registry=https://registry.npmmirror.com" > .npmrc

# 用户级配置（对当前用户所有项目生效）
echo "registry=https://registry.npmmirror.com" >> ~/.npmrc
```

---

## 使用 nrm 管理多个镜像源（可选）

nrm 是一个 npm 镜像源管理工具，可以方便地切换不同的镜像源。

```bash
# 安装 nrm
npm install -g nrm

# 查看可用镜像源
nrm ls

# 切换到淘宝镜像
nrm use taobao

# 测试镜像源速度
nrm test
```

---

## 恢复官方镜像源

```bash
npm config set registry https://registry.npmjs.org/
```

---

## 验证配置

```bash
# 查看当前镜像源
npm config get registry

# 查看完整配置
npm config list
```

---

## 注意事项

1. **发布包时**：如果需要发布 npm 包，请切换回官方镜像源
2. **私有包**：如果公司有私有 npm 仓库，需要单独配置 scope
3. **yarn 用户**：yarn 也可以配置镜像源
   ```bash
   yarn config set registry https://registry.npmmirror.com
   ```
4. **pnpm 用户**：pnpm 配置方式相同
   ```bash
   pnpm config set registry https://registry.npmmirror.com
   ```
