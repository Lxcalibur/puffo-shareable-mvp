# Pet's Afterlife - 2026-06-02

## 今日目标

做出一个可以分享给别人看的网页 MVP：让第一次打开的人明白，这个 app 的核心是把用户上传的宠物照片变成一只相似、会动、保留性格边界的小狗/小猫。

## 今日完成

- 把 prototype 从“长表单 + 动画检查器”重构成更清晰的 creation flow。
- 首屏改成：照片 -> Visual DNA -> Animated Preview。
- 右侧保留手机 Home，让 Puffo 在家里动起来。
- 整理出独立的 shareable static MVP 文件夹：
  - `shareable-mvp/`
  - `puffo-shareable-mvp.zip`
- 切换到新的 Puffo v2 compact sprite：
  - `pets/puffo-v2-compact/spritesheet.webp`
  - `pets/puffo-v2-compact/pet.json`
- 改善动画播放逻辑：
  - 不再用统一 180ms 切帧。
  - 不同状态使用不同节奏：idle 更慢，walk 更快，annoyed 中等。
- 保留真实宠物边界感：
  - Puffo 不会无限顺从。
  - Pet 太多次会进入 annoyed/needs space 状态。

## 修改文件

- `index.html`
- `styles.css`
- `app.js`
- `shareable-mvp/README.md`
- `shareable-mvp/index.html`
- `shareable-mvp/styles.css`
- `shareable-mvp/app.js`

## 验证结果

- `node --check app.js` 通过。
- `node --check shareable-mvp/app.js` 通过。
- 分享包没有旧 Puffo 路径、本机绝对路径或 `file://` 路径残留。
- 浏览器本地预览通过：
  - 页面标题正确。
  - 页面不是空白。
  - 没有控制台错误。
  - Puffo v2 compact sprite 正常加载。
  - Generate Puffo Preview 会进入 review 状态。
  - Play 会进入 moving/walk 状态。
  - 连续 Pet 会触发 annoyed/needs space。
- 最终分享包从 `shareable-mvp/` 单独启动预览通过。
- 尝试上传 GitHub：
  - GitHub connector 当前只安装在 `instructa-pro`，没有安装到个人账号 `Lxcalibur`。
  - connector 能看到 `Lxcalibur/snowflake`，但写入时报 `Resource not accessible by integration`。
  - 本机 Git HTTPS 推送缺少 GitHub 凭据。
  - 本机 Git SSH 推送缺少 GitHub SSH key。
  - `shareable-mvp/` 已经初始化 git，并完成本地 commit：`Publish Puffo shareable MVP`。

## 当前判断

今天的版本比之前更接近真正 MVP，因为第一屏已经围绕“从照片生成相似宠物”展开，而不是只展示一个宠物小游戏。

## 明日建议

1. 给 Codex GitHub connector 授权个人账号 `Lxcalibur`，或配置本机 GitHub SSH/HTTPS 凭据。
2. 推送 `shareable-mvp/` 到 `Lxcalibur/snowflake` 的 `gh-pages` 分支，目标 URL 是 `https://lxcalibur.github.io/snowflake/`。
3. 找 3-5 个人看第一反应：他们是否理解“用照片生成相似宠物”。
4. 进一步微调 Puffo v2 的视觉质量，尤其是 idle 和 walk 的自然感。
5. 增加一个“Visual DNA confirmation”交互，让用户能明确修改耳朵、眼睛、毛色、体型。
6. 如果要继续做语音训练功能，先做文字版 `Puffo, sit`，再接语音。

## 风险

- 当前仍然是静态网页模拟，还没有真正调用 AI 生成。
- Puffo v2 比旧版本好，但动作自然度仍取决于 spritesheet 本身。
- 移动端没有通过真实浏览器 viewport 自动截图验证，需要后续再做一次专门检查。
