// 更新时间函数
function updateTime() {
  // 获取页面中的时钟元素
  const clockElement = document.getElementById("clock");
  // 获取当前日期时间
  const now = new Date();
  // 格式化小时、分钟、秒为两位数
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  // 设置时钟元素的文本为当前时间
  clockElement.textContent = `${hours}:${minutes}:${seconds}`;
  // 检查是否到达了设置的结束时间
  checkEndTime(now);
}

// 异步检查结束时间函数
async function checkEndTime(now) {
  // 从本地存储中获取结束时间列表
  let endTimes = JSON.parse(localStorage.getItem("endTimes")) || [];
  // 预加载音频文件
  const audio = document.getElementById("alert-sound");

  // 遍历所有结束时间
  endTimes.forEach((endTime) => {
    // 解析结束时间为小时和分钟
    const [endHours, endMinutes] = endTime.split(":").map(Number);
    // 如果当前时间和设置的结束时间匹配，则播放音频
    if (
      now.getHours() === endHours &&
      now.getMinutes() === endMinutes &&
      now.getSeconds() === 0
    ) {
      audio.play(); // 播放音频
    }
  });
}

// 添加结束时间按钮监听
document.getElementById("addEndTime").addEventListener("click", () => {
  // 获取用户输入的结束时间
  const endTime = document.getElementById("endTime").value;
  if (endTime) {
    // 从本地存储获取或初始化结束时间列表
    let endTimes = JSON.parse(localStorage.getItem("endTimes")) || [];
    // 将新的结束时间添加到列表中
    endTimes.push(endTime);
    // 存储更新后的结束时间列表到本地存储
    localStorage.setItem("endTimes", JSON.stringify(endTimes));
    // 渲染新的结束时间列表
    renderEndTimes();
  }
});

// 渲染结束时间列表函数
function renderEndTimes() {
  // 获取页面中的结束时间列表容器
  const endTimesList = document.getElementById("endTimesList");
  // 清空列表容器
  endTimesList.innerHTML = "";
  // 从本地存储获取结束时间列表
  let endTimes = JSON.parse(localStorage.getItem("endTimes")) || [];
  // 遍历结束时间列表
  endTimes.forEach((endTime, index) => {
    // 创建一个 div 元素来显示每个结束时间
    const div = document.createElement("div");
    div.textContent = endTime;
    // 创建一个删除按钮
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "删除";
    // 给删除按钮添加点击事件监听器
    deleteButton.addEventListener("click", () => {
      // 从列表中移除被点击的结束时间
      endTimes.splice(index, 1);
      // 存储更新后的列表到本地存储
      localStorage.setItem("endTimes", JSON.stringify(endTimes));
      // 重新渲染列表
      renderEndTimes();
    });
    // 把删除按钮添加到 div 中
    div.appendChild(deleteButton);
    // 把 div 添加到列表容器中
    endTimesList.appendChild(div);
  });
}

// 离校申请表单提交监听
document.getElementById("leaveForm").addEventListener("submit", (e) => {
  // 阻止默认的表单提交行为
  e.preventDefault();
  // 获取学生姓名、离校原因以及离校时间
  const name = document.getElementById("studentName").value;
  const reason = document.getElementById("reason").value;
  const leaveTime = new Date().toLocaleTimeString();
  // 创建离校记录对象
  const record = { name, reason, leaveTime, returnTime: null };
  // 从本地存储获取或初始化离校记录列表
  let records = JSON.parse(localStorage.getItem("leaveRecords")) || [];
  // 将新记录添加到列表中
  records.push(record);
  // 存储更新后的记录列表到本地存储
  localStorage.setItem("leaveRecords", JSON.stringify(records));
  // 渲染新的记录列表
  renderRecords();
  // 清空表单
  document.getElementById("leaveForm").reset();
});

// 渲染记录列表函数
function renderRecords() {
  // 获取页面中的记录列表容器
  const recordList = document.getElementById("recordList");
  // 清空列表容器
  recordList.innerHTML = "";
  // 从本地存储获取记录列表
  let records = JSON.parse(localStorage.getItem("leaveRecords")) || [];
  // 遍历记录列表
  records.forEach((record, index) => {
    // 创建一个 li 元素来显示每条记录
    const li = document.createElement("li");
    li.textContent = `${record.name} - ${record.reason} - 离开: ${record.leaveTime}`;
    // 如果学生还没有返回，显示一个“返回签到”按钮
    if (!record.returnTime) {
      const returnButton = document.createElement("button");
      returnButton.textContent = "返回签到";
      // 给按钮添加点击事件监听器
      returnButton.addEventListener("click", () => {
        // 记录返回时间，并更新记录
        record.returnTime = new Date().toLocaleTimeString();
        records[index] = record;
        localStorage.setItem("leaveRecords", JSON.stringify(records));
        // 重新渲染记录列表
        renderRecords();
      });
      // 把按钮添加到 li 中
      li.appendChild(returnButton);
    } else {
      // 如果学生已返回，显示返回时间
      const returnTimeSpan = document.createElement("span");
      returnTimeSpan.textContent = ` - 返回: ${record.returnTime}`;
      li.appendChild(returnTimeSpan);
    }
    // 把 li 添加到列表容器中
    recordList.appendChild(li);
  });
}

// 切换侧边栏可见性按钮监听
document.getElementById("toggleButton").addEventListener("click", () => {
  // 获取侧边栏容器
  const sideContainer = document.getElementById("sideContainer");
  // 切换侧边栏可见性
  sideContainer.classList.toggle("visible");
  // 切换按钮隐藏状态
  document.getElementById("toggleButton").classList.toggle("hidden-toggle");
});

// 定义闲置计时器变量
let idleTimer;
// 重置闲置计时器函数
function resetIdleTimer() {
  // 清除计时器
  clearTimeout(idleTimer);
  // 设置新的计时器，在5秒后隐藏侧边栏
  idleTimer = setTimeout(() => {
    document.getElementById("sideContainer").classList.remove("visible");
    document.getElementById("toggleButton").classList.remove("hidden-toggle");
  }, 5000);
}

// 监听鼠标移动和键盘按下事件以重置闲置计时器
document.addEventListener("mousemove", resetIdleTimer);
document.addEventListener("keydown", resetIdleTimer);

// 双击时钟切换侧边栏可见性
document.getElementById("clock").addEventListener("dblclick", () => {
  const sideContainer = document.getElementById("sideContainer");
  sideContainer.classList.toggle("visible");
  document.getElementById("toggleButton").classList.toggle("hidden-toggle");
});

// 设置容器
const settingsContainer = document.getElementById("settingsContainer");
// 背景颜色选择器
const bgColorPicker = document.getElementById("bgColorPicker");
// 背景图片URL输入框
const bgImageUrl = document.getElementById("bgImageUrl");
// 应用背景图片按钮
const applyBgImageBtn = document.getElementById("applyBgImage");
// 重置默认按钮
const resetToDefaultBtn = document.getElementById("resetToDefault");

// 设置按钮点击监听
document.getElementById("settingsButton").addEventListener("click", () => {
  // 切换设置容器的可见性
  settingsContainer.classList.toggle("visible");
});

// 黑暗模式切换按钮监听
document.getElementById("darkModeToggle").addEventListener("click", () => {
  // 切换黑暗模式类
  document.body.classList.toggle("dark-mode");
  // 存储黑暗模式状态到本地存储
  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark-mode")
  );
});

// 背景颜色选择器变化监听
bgColorPicker.addEventListener("change", (e) => {
  // 设置背景颜色，并清除背景图片
  document.body.style.backgroundColor = e.target.value;
  document.body.style.backgroundImage = "none";
  // 存储背景颜色到本地存储
  localStorage.setItem("customBackground", e.target.value);
});

// 应用背景图片按钮监听
applyBgImageBtn.addEventListener("click", () => {
  // 获取用户输入的图片URL
  const imageUrl = bgImageUrl.value;
  if (imageUrl) {
    // 设置背景图片并调整大小及位置
    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    // 存储背景图片URL到本地存储
    localStorage.setItem("customBackground", imageUrl);
  }
});

// 重置默认按钮监听
resetToDefaultBtn.addEventListener("click", () => {
  // 清除背景颜色和背景图片
  document.body.style.backgroundColor = "";
  document.body.style.backgroundImage = "none";
  // 从本地存储中移除背景设置
  localStorage.removeItem("customBackground");
  // 重置颜色选择器和图片输入框值
  bgColorPicker.value = "#f0f0f0";
  bgImageUrl.value = "";
});

// 页面加载完成时执行
window.onload = () => {
  // 初始化更新时间
  updateTime();
  // 每秒调用 updateTime 函数
  setInterval(updateTime, 1000);
  // 渲染结束时间列表
  renderEndTimes();
  // 渲染记录列表
  renderRecords();

  // 如果本地存储中有黑暗模式标识，则应用黑暗模式
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }

  // 从本地存储恢复背景设置
  const savedBg = localStorage.getItem("customBackground");
  if (savedBg) {
    if (savedBg.startsWith("http") || savedBg.startsWith("https")) {
      // 如果是图片URL，则应用背景图片
      document.body.style.backgroundImage = `url(${savedBg})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      bgImageUrl.value = savedBg;
    } else {
      // 如果不是URL，则应用背景颜色
      document.body.style.backgroundColor = savedBg;
      document.body.style.backgroundImage = "none";
      bgColorPicker.value = savedBg;
    }
  }
};
