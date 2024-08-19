# 晚自习时钟

“晚自习时钟”是一个用于管理晚自习下课时间和学生离开记录的 Web 应用程序。它可以帮助教师和班干部方便地管理晚自习，并记录学生的离开和返回情况。

## 示例图片

<img src="https://image.qqhkx.com/clock%20(3).jpeg" style="zoom:50%;" />

<img src="https://image.qqhkx.com/clock%20(1).jpeg" style="zoom:50%;" />

<img src="https://image.qqhkx.com/clock%20(2).jpeg" style="zoom:50%;" />

## 功能介绍

- **实时时钟显示**：页面中间显示当前时间，时钟字体较大，易于查看。
- **下课时间设置**：可以设置多个下课时间，到时间时会有声音提醒。
- **离开记录管理**：记录学生的离开时间和原因，并可以登记返回时间。
- **侧边栏隐藏/显示**：可以通过点击按钮隐藏或显示侧边栏。
- **黑暗模式热切换**：可以丝滑切换为黑暗模式，亮度更低，更护眼。
- **自定义背景**：可以自己选择背景图片或自定义颜色。
- **更好的手机端支持** ：方便老师在手机上操作。

## 使用方法

### 1. 设置下课时间

- 在页面右侧的侧边栏中，输入下课时间（格式为 HH:MM）。
- 点击“添加下课时间”按钮，添加到下课时间列表。
- 到达设定的下课时间时，页面会弹出提醒并播放提示音。

### 2. 记录学生离开

- 在侧边栏中的“登记离开”部分，输入学生姓名和请假原因。
- 点击“登记离开”按钮，记录学生的离开时间。
- 离开记录会显示在页面右侧的列表中，可以登记学生的返回时间。

### 3. 显示/隐藏侧边栏

- 点击右侧的 ☰ 按钮，可以显示或隐藏侧边栏。
- 当页面无操作 5 秒钟后，侧边栏会自动隐藏。

## 文件结构

```
|-- index.html          // 主页面结构
|-- styles.css          // 样式文件
|-- script.js           // 脚本文件
|-- alert.mp3           // 提示音文件
```

### index.html

包含页面的基础结构，包括三个主要部分：左侧的下课时间列表，中间的实时时钟，右侧的离开记录列表，以及右侧的侧边栏。

### styles.css

定义了页面的样式，包括布局、字体大小、颜色等。

### script.js

包含页面的交互逻辑，如实时更新时钟、添加下课时间、记录学生离开和返回等。

## 开发环境

- HTML5
- CSS3
- JavaScript (ES6)
- 本地存储 (LocalStorage)

## 安装和运行

1. 将项目克隆或下载到本地。

   ```bash
   git clone https://github.com/QQHKX/school-study-supervision.git
   ```

2. 确保所有文件在同一目录下，包括 `index.html`, `styles.css`, `script.js`, 和 `alert.mp3`。

3. 打开 `index.html` 文件，即可在浏览器中查看和使用该应用。

## 注意事项

- 请确保 `alert.mp3` 文件存在于项目根目录下，以便在下课时间到达时播放提示音。
- 本项目使用 LocalStorage 存储下课时间和离开记录，刷新页面后数据仍会保留。

## 版本

- v0.9.1 初始版本，包含基本功能。
- v0.9.2 增加侧边栏隐藏/显示功能，优化样式。
- v0.9.3 增加本地存储功能，刷新页面后数据仍会保留。
- v0.9.4 修复页面显示 bug。
- v1.0.0-beta 优化页面，修复已知 bug，加入黑暗模式，支持自定义背景。

## 更新计划

### 近期

- [x] 优化布局，高度适配触屏操作。
- [x] 修复已知 bug。
- [ ] 部署到服务器上，准备投入使用。
- [ ] 投入实际使用后修复发现的 bug。
- [x] 加入黑暗样式，亮度更少，跟护眼。
- [x] 支持自定义背景图片。

### 未来

- [ ] 支持一键导入班级名单，输入名字无需再打字。

- [ ] 支持老师在手机上操作并在电脑上实时同步。
- [ ] 加入晚自习下课自动关机功能，班级电教不再烦恼。
- [ ] 重构项目，加入后端支持。
- [ ] 班主任(管理员)支持远程投送消息和图片，方便班级事务通知。

## 贡献

如果您有任何建议或改进意见，可以[联系我](https://qqhkx.com/)。
