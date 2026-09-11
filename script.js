const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');

const colorPicker = document.getElementById('colorPicker');
const lineWidthInput = document.getElementById('lineWidth');
const sizeValue = document.getElementById('sizeValue');
const clearBtn = document.getElementById('clearBtn');

// 그림 그리기 상태 변수
let isDrawing = false;

// 캔버스 초기 설정 (선 끝을 둥글게 처리하여 부드럽게 표현)
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.strokeStyle = colorPicker.value;
ctx.lineWidth = lineWidthInput.value;

// 그리기 시작
function startDrawing(e) {
    isDrawing = true;
    draw(e); // 클릭한 지점에 바로 점이 찍히도록 설정
}

// 그리기 종료
function stopDrawing() {
    isDrawing = false;
    ctx.beginPath(); // 선 그리기를 새로 시작하도록 경로를 초기화
}

// 선 그리기 동작
function draw(e) {
    if (!isDrawing) return;

    // 캔버스 내에서의 정확한 마우스 좌표 계산
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath(); // 부드러운 연결을 위해 경로 갱신
    ctx.moveTo(x, y);
}

// 이벤트 리스너 등록
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing); // 마우스가 캔버스를 벗어났을 때

// 툴바 설정 변경 이벤트
colorPicker.addEventListener('input', (e) => {
    ctx.strokeStyle = e.target.value;
});

lineWidthInput.addEventListener('input', (e) => {
    ctx.lineWidth = e.target.value;
    sizeValue.textContent = `${e.target.value}px`;
});

// 전체 초기화 (지우기)
clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
