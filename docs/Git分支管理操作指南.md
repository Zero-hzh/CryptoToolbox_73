# Git 分支管理操作指南

本文档提供完整的 Git 分支管理操作步骤，用于在 GitHub 上真实执行「创建分支、合并分支、解决冲突」，并在报告中截图展示。

## 0. 前置准备

```bash
# 克隆项目
git clone git@github.com:Zero-hzh/CryptoToolbox_73.git
cd CryptoToolbox_73

# 配置用户信息（如未配置）
git config user.name "何子皓"
git config user.email "2166636503@qq.com"
```

## 1. 创建并推送初始代码（master 分支）

```bash
git add .
git commit -m "feat: 初始化密码学工具箱项目"
git push -u origin master
```

## 2. 创建功能分支（分支管理 - 创建分支）

```bash
# 创建并切换到 dev 分支
git checkout -b dev
git push -u origin dev

# 查看所有分支
git branch -a
```

## 3. 在 dev 分支上开发新功能

```bash
# 例如：新增 RSA 占位功能或修改样式
# （编辑文件后）
git add .
git commit -m "feat: 在 dev 分支添加新功能"
git push origin dev
```

## 4. 合并分支（分支管理 - 合并分支）

```bash
# 切回 master 分支
git checkout master

# 合并 dev 分支
git merge dev

# 推送到远程
git push origin master
```

## 5. 制造并解决冲突（分支管理 - 解决冲突）

### 制造冲突场景
```bash
# 场景：master 和 dev 分支都修改了 README.md 的同一行

# 在 master 分支修改 README.md 标题
git checkout master
# 编辑 README.md：标题改为 "CryptoToolbox 密码学工具箱 v2.0"
git add README.md
git commit -m "docs: master 分支修改 README 标题"

# 在 dev 分支修改同一行
git checkout dev
# 编辑 README.md：标题改为 "CryptoToolbox - 前端密码学工具"
git add README.md
git commit -m "docs: dev 分支修改 README 标题"

# 合并时产生冲突
git checkout master
git merge dev
# 此时会提示：CONFLICT (content): Merge conflict in README.md
```

### 解决冲突
```bash
# 打开 README.md，会看到冲突标记
<<<<<<< HEAD
# CryptoToolbox 密码学工具箱 v2.0
=======
# CryptoToolbox - 前端密码学工具
>>>>>>> dev

# 手动编辑，保留最终想要的内容（例如两者结合）
# CryptoToolbox 密码学工具箱 v2.0

# 标记冲突已解决
git add README.md
git commit -m "fix: 解决 README.md 合并冲突"

# 推送
git push origin master
```

## 6. 删除已合并的分支（可选）

```bash
# 删除本地 dev 分支
git branch -d dev

# 删除远程 dev 分支
git push origin --delete dev
```

## 截图建议清单（报告中需要）

1. ✅ `git checkout -b dev` 创建分支的终端截图
2. ✅ `git branch` 查看分支列表的截图
3. ✅ `git merge` 合并分支的截图
4. ✅ 合并冲突提示 `CONFLICT (content)` 的截图
5. ✅ 解决冲突后 `git status` 的截图
6. ✅ GitHub 网页上 Branches 页面显示多分支的截图
7. ✅ GitHub 网页上 Pull Request 的截图（可选）
