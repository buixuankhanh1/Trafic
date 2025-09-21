// script.js

// --- Dark Mode Functionality ---
// Lấy các phần tử DOM một lần duy nhất
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Tối ưu hóa: Sử dụng một hàm duy nhất để quản lý Dark Mode
function toggleDarkMode() {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    // Sử dụng toán tử 3 ngôi (ternary operator) để gọn hơn
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
}

// Tối ưu hóa: Đơn giản hóa việc kiểm tra ban đầu
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'enabled') {
    body.classList.add('dark-mode');
}

// Xử lý sự kiện click chỉ khi phần tử tồn tại
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        toggleDarkMode();
    });
}

// --- Quiz Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        // Dữ liệu câu hỏi không thay đổi
        {
            question: "Biển báo này có ý nghĩa gì?",
            image: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Vietnam_road_sign_P103a.svg",
            options: ["Cấm xe mô tô", "Cấm ô tô", "Cấm xe đạp", "Cấm xe buýt"],
            answer: "Cấm ô tô"
        },
        {
            question: "Biển báo hình tam giác viền đỏ, nền vàng và có hình trẻ em bên trong báo hiệu điều gì?",
            image: "https://upload.wikimedia.org/wikipedia/commons/1/14/Vietnam_road_sign_W225.svg",
            options: ["Cấm trẻ em đi vào", "Khu vực có trẻ em chơi đùa", "Trường học, khu vực có trẻ em qua lại", "Đường dành cho trẻ em"],
            answer: "Trường học, khu vực có trẻ em qua lại"
        },
        {
            question: "Biển báo này có ý nghĩa gì?",
            image: "https://upload.wikimedia.org/wikipedia/commons/6/63/Vietnam_road_sign_S502.svg",
            options: ["Giới hạn tốc độ", "Khoảng cách đến đối tượng báo hiệu", "Cấm dừng đỗ", "Đoạn đường nguy hiểm"],
            answer: "Khoảng cách đến đối tượng báo hiệu"
        },
        {
            question: "Biển báo nào sau đây báo hiệu 'Bắt đầu đường cao tốc'?",
            image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Vietnam_road_sign_IE452.svg",
            options: ["Biển báo hình tròn nền xanh có mũi tên đi thẳng", "Biển báo hình chữ nhật nền xanh lá cây có biểu tượng đường cao tốc", "Biển báo hình tam giác viền đỏ", "Biển báo hình vuông nền xanh có số km"],
            answer: "Biển báo hình chữ nhật nền xanh lá cây có biểu tượng đường cao tốc"
        },
        {
            question: "Khi gặp biển báo 'Dừng lại' (Stop), người lái xe phải làm gì?",
            image: "https://upload.wikimedia.org/wikipedia/commons/7/76/Vietnam_road_sign_P122.svg",
            options: ["Giảm tốc độ và đi chậm", "Dừng hẳn xe trước vạch dừng hoặc biển", "Nhường đường cho xe từ đường khác", "Cả A và C"],
            answer: "Dừng hẳn xe trước vạch dừng hoặc biển"
        },
        {
            question: "Khi gặp biển báo này thì người lái xe cần chú ý điều gì?",
            image: "https://upload.wikimedia.org/wikipedia/commons/2/28/Vietnam_road_sign_IE472b.svg",
            options: ["Giảm tốc độ, chuẩn bị dừng lại", "Tăng tốc độ để vượt qua", "Không cần chú ý gì đặc biệt", "Chỉ cần quan sát phía trước"],
            answer: "Giảm tốc độ, chuẩn bị dừng lại"}
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    
    // Tối ưu hóa: Lấy tất cả các phần tử DOM một lần
    const domElements = {
        questionDisplay: document.getElementById('current-question'),
        answerOptions: document.getElementById('answer-options'),
        submitBtn: document.getElementById('submit-btn'),
        nextBtn: document.getElementById('next-btn'),
        restartBtn: document.getElementById('restart-btn'),
        resultDisplay: document.getElementById('result'),
        feedbackDisplay: document.getElementById('feedback'),
    };
    
    // Tối ưu hóa: Tạo hàm để ẩn/hiện nút gọn hơn
    function updateButtonVisibility(submit, next, restart) {
        domElements.submitBtn.style.display = submit ? 'block' : 'none';
        domElements.nextBtn.style.display = next ? 'block' : 'none';
        domElements.restartBtn.style.display = restart ? 'block' : 'none';
    }

    // Tối ưu hóa: Gom các thao tác DOM
    function loadQuestion() {
        const { questionDisplay, answerOptions, feedbackDisplay } = domElements;
        
        feedbackDisplay.textContent = '';
        feedbackDisplay.className = '';
        updateButtonVisibility(true, false, false);

        if (currentQuestionIndex < questions.length) {
            const q = questions[currentQuestionIndex];
            
            // Tối ưu hóa: Sử dụng template literal gọn gàng hơn
            questionDisplay.innerHTML = `
                <img src="${q.image}" alt="Biển báo" style="max-width: 100px; height: auto; display: block; margin: 0 auto 15px auto;">
                ${q.question}
            `;
            
            // Tối ưu hóa: Sử dụng map và join để tạo HTML nhanh hơn
            answerOptions.innerHTML = q.options.map(option => `
                <label><input type="radio" name="answer" value="${option}"> ${option}</label>
            `).join('');
            
        } else {
            showResult();
        }
    }

    function checkAnswer() {
        const selectedRadio = document.querySelector('input[name="answer"]:checked');
        
        if (!selectedRadio) {
            alert("Vui lòng chọn một đáp án!");
            return;
        }

        const selectedAnswer = selectedRadio.value;
        const correctAnswer = questions[currentQuestionIndex].answer;
        const { feedbackDisplay } = domElements;

        if (selectedAnswer === correctAnswer) {
            score++;
            feedbackDisplay.textContent = 'Đúng rồi!';
            feedbackDisplay.className = 'feedback correct';
        } else {
            feedbackDisplay.textContent = `Sai rồi. Đáp án đúng là: ${correctAnswer}`;
            feedbackDisplay.className = 'feedback incorrect';
        }

        updateButtonVisibility(false, true, false);
        
        // Vô hiệu hóa các lựa chọn
        document.querySelectorAll('input[name="answer"]').forEach(radio => radio.disabled = true);
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        const { questionDisplay, answerOptions, feedbackDisplay, resultDisplay } = domElements;
        questionDisplay.innerHTML = '';
        answerOptions.innerHTML = '';
        feedbackDisplay.textContent = '';
        updateButtonVisibility(false, false, true);

        resultDisplay.textContent = `Bạn đã trả lời đúng ${score} trên tổng số ${questions.length} câu!`;
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        domElements.resultDisplay.textContent = '';
        updateButtonVisibility(false, false, false);
        loadQuestion();
    }

    // Gắn sự kiện cho các nút
    domElements.submitBtn.addEventListener('click', checkAnswer);
    domElements.nextBtn.addEventListener('click', nextQuestion);
    domElements.restartBtn.addEventListener('click', restartQuiz);

    // Tải câu hỏi đầu tiên khi trang được tải
    loadQuestion();
});