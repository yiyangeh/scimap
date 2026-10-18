# SCImap · 研究技术路线图工具

版本 0.1.0 · 这个仓库就是一个完整的网页应用（PWA）。发布到 GitHub Pages 后，同一个网址同时就是：

| 形态 | 怎么用 |
|---|---|
| 网页版 | 浏览器直接打开 `https://<用户名>.github.io/<仓库名>/` |
| 电脑独立版 | 在 Edge / Chrome 里点地址栏右侧的「安装」图标（或页眉 **Install as App**）→ 独立窗口、桌面图标、开始菜单，离线可用 |
| 手机版 | Android：Chrome 菜单 → 安装应用；iPhone/iPad：Safari 分享 → 添加到主屏幕 |

所有数据保存在使用者自己的浏览器里，不会上传到任何服务器。

## 首次发布（一次性，约 5 分钟）

1. 登录 GitHub，右上角 **+ → New repository**。名称例如 `scimap`，选 **Public**，不要勾选任何初始化文件，Create。
2. 在新仓库页面点 **uploading an existing file**，把本压缩包里的**全部文件**（包括 `.nojekyll`）拖进去，Commit changes。
3. 仓库 **Settings → Pages → Build and deployment**：Source 选 **Deploy from a branch**，Branch 选 `main` / `(root)`，Save。
4. 一两分钟后打开 `https://<用户名>.github.io/scimap/`。

## 以后更新（自动，使用者不需要重新下载）

1. 拿到新的发布包后，在仓库页面 **Add file → Upload files**，把新文件全部拖进去覆盖，Commit。
2. 已经安装 SCImap 的电脑和手机，下次打开（或切回窗口）时会自动检查版本：发现新版本就在左侧出现「A new version of SCImap is ready — Update now」，点一下即完成，正在编辑的内容不丢。不点也会在下次完全关闭再打开时自动换成新版本。
3. 左侧底部显示当前版本号；点它可以手动检查更新。

更新的关键是 `sw.js` 里的 `VERSION` 和 `index.html` 里的 `scimap-version` 必须一起变（发布包里已经处理好，直接覆盖即可）。

## 文件说明

- `index.html` — SCImap 本体
- `sw.js` — Service Worker：离线缓存 + 版本更新
- `manifest.webmanifest` — 应用名称、图标、独立窗口、.md/.json 文件关联
- `icon-*.png`、`apple-touch-icon.png`、`favicon.png` — 各平台图标
- `404.html` — 子路径回到首页
- `.nojekyll` — 让 GitHub Pages 原样发布文件
