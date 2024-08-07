function updateTime() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    checkEndTime(now);
}

function checkEndTime(now) {
    let endTimes = JSON.parse(localStorage.getItem('endTimes')) || [];
    endTimes.forEach(endTime => {
        const [endHours, endMinutes] = endTime.split(':').map(Number);
        if (now.getHours() === endHours && now.getMinutes() === endMinutes && now.getSeconds() === 0) {
            alert("下课时间到了！");
            const audio = new Audio('alert.mp3');
            audio.play();
        }
    });
}

document.getElementById('addEndTime').addEventListener('click', () => {
    const endTime = document.getElementById('endTime').value;
    if (endTime) {
        let endTimes = JSON.parse(localStorage.getItem('endTimes')) || [];
        endTimes.push(endTime);
        localStorage.setItem('endTimes', JSON.stringify(endTimes));
        renderEndTimes();
    }
});

function renderEndTimes() {
    const endTimesList = document.getElementById('endTimesList');
    endTimesList.innerHTML = '';
    let endTimes = JSON.parse(localStorage.getItem('endTimes')) || [];
    endTimes.forEach((endTime, index) => {
        const div = document.createElement('div');
        div.textContent = endTime;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '删除';
        deleteButton.addEventListener('click', () => {
            endTimes.splice(index, 1);
            localStorage.setItem('endTimes', JSON.stringify(endTimes));
            renderEndTimes();
        });
        div.appendChild(deleteButton);
        endTimesList.appendChild(div);
    });
}

document.getElementById('leaveForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('studentName').value;
    const reason = document.getElementById('reason').value;
    const leaveTime = new Date().toLocaleTimeString();
    const record = { name, reason, leaveTime, returnTime: null };
    let records = JSON.parse(localStorage.getItem('leaveRecords')) || [];
    records.push(record);
    localStorage.setItem('leaveRecords', JSON.stringify(records));
    renderRecords();
    document.getElementById('leaveForm').reset();
});

function renderRecords() {
    const recordList = document.getElementById('recordList');
    recordList.innerHTML = '';
    let records = JSON.parse(localStorage.getItem('leaveRecords')) || [];
    records.forEach((record, index) => {
        const li = document.createElement('li');
        li.textContent = `${record.name} - ${record.reason} - 离开时间: ${record.leaveTime}`;
        if (!record.returnTime) {
            const returnButton = document.createElement('button');
            returnButton.textContent = '登记返回';
            returnButton.addEventListener('click', () => {
                record.returnTime = new Date().toLocaleTimeString();
                records[index] = record;
                localStorage.setItem('leaveRecords', JSON.stringify(records));
                renderRecords();
            });
            li.appendChild(returnButton);
        } else {
            const returnTimeSpan = document.createElement('span');
            returnTimeSpan.textContent = ` - 返回时间: ${record.returnTime}`;
            li.appendChild(returnTimeSpan);
        }
        recordList.appendChild(li);
    });
}

document.getElementById('toggleButton').addEventListener('click', () => {
    const sideContainer = document.getElementById('sideContainer');
    sideContainer.classList.toggle('visible');
    document.getElementById('toggleButton').classList.toggle('hidden-toggle');
});

let idleTimer;
function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
        document.getElementById('sideContainer').classList.remove('visible');
        document.getElementById('toggleButton').classList.remove('hidden-toggle');
    }, 5000);
}

document.addEventListener('mousemove', resetIdleTimer);
document.addEventListener('keydown', resetIdleTimer);

document.getElementById('clock').addEventListener('dblclick', () => {
    const sideContainer = document.getElementById('sideContainer');
    sideContainer.classList.toggle('visible');
    document.getElementById('toggleButton').classList.toggle('hidden-toggle');
});

const settingsContainer = document.getElementById('settingsContainer');
const bgColorPicker = document.getElementById('bgColorPicker');
const bgImageUrl = document.getElementById('bgImageUrl');
const applyBgImageBtn = document.getElementById('applyBgImage');
const resetToDefaultBtn = document.getElementById('resetToDefault');

document.getElementById('settingsButton').addEventListener('click', () => {
    settingsContainer.classList.toggle('visible');
});

document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

bgColorPicker.addEventListener('change', (e) => {
    document.body.style.backgroundColor = e.target.value;
    document.body.style.backgroundImage = 'none';
    localStorage.setItem('customBackground', e.target.value);
});

applyBgImageBtn.addEventListener('click', () => {
    const imageUrl = bgImageUrl.value;
    if (imageUrl) {
        document.body.style.backgroundImage = `url(${imageUrl})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        localStorage.setItem('customBackground', imageUrl);
    }
});

resetToDefaultBtn.addEventListener('click', () => {
    document.body.style.backgroundColor = '';
    document.body.style.backgroundImage = 'none';
    localStorage.removeItem('customBackground');
    bgColorPicker.value = '#f0f0f0';
    bgImageUrl.value = '';
});

window.onload = () => {
    updateTime();
    setInterval(updateTime, 1000);
    renderEndTimes();
    renderRecords();
    
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
    
    const savedBg = localStorage.getItem('customBackground');
    if (savedBg) {
        if (savedBg.startsWith('http') || savedBg.startsWith('https')) {
            document.body.style.backgroundImage = `url(${savedBg})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            bgImageUrl.value = savedBg;
        } else {
            document.body.style.backgroundColor = savedBg;
            document.body.style.backgroundImage = 'none';
            bgColorPicker.value = savedBg;
        }
    }
};