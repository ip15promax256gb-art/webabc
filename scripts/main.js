document.addEventListener("DOMContentLoaded", function () {
    // --- SPEED TEST BUTTONS ---
    const speedButtons = document.querySelectorAll(".btn-speed");

    speedButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Nếu đang test thì bỏ qua (tránh spam click)
            if (button.dataset.testing === "1") return;

            const cardInner = button.closest(".route-card-inner");
            const latencyValue = cardInner.querySelector(".latency-value");

            if (!latencyValue) return;

            // Đánh dấu đang test
            button.dataset.testing = "1";
            button.classList.add("testing");
            cardInner.classList.add("testing");
            latencyValue.classList.add("latency-testing");

            // Màu vàng khi đang đo
            latencyValue.style.color = "#ffe066";

            // Hiệu ứng random liên tục lúc test
            let interval = setInterval(() => {
                const fakePing = Math.floor(Math.random() * 900) + 50;
                latencyValue.textContent = fakePing;
            }, 80);

            // Sau 1.3s trả kết quả "thật"
            setTimeout(() => {
                clearInterval(interval);

                const newPing = Math.floor(Math.random() * 350) + 50; // 50–499 ms
                latencyValue.textContent = newPing;

                // Đổi màu theo ping
                if (newPing < 120) {
                    latencyValue.style.color = "#39ff88";   // xanh
                } else if (newPing < 300) {
                    latencyValue.style.color = "#39ff88";   // xanh
                } else {
                    latencyValue.style.color = "#ff6b6b";   // đỏ
                }

                // Hết test – bỏ trạng thái
                button.dataset.testing = "0";
                button.classList.remove("testing");
                cardInner.classList.remove("testing");
                latencyValue.classList.remove("latency-testing");
            }, 300);
        });
    });
// --- ENTER BUTTON REDIRECT ---
const enterButtons = document.querySelectorAll(".btn-enter");

enterButtons.forEach(btn => {
    btn.addEventListener("click", function () {
        const url = btn.dataset.url;

        if (url) {
            window.open(url, "_blank");   // mở tab mới
        }
    });
});
// --- HEADER MENU CARD CLICK ---
const menuCards = document.querySelectorAll(".menu-card");

menuCards.forEach(card => {
    card.addEventListener("click", () => {
        const url = card.dataset.url;
        if (url) {
            // hoặc:  window.location.href = url;      // mở cùng tab
           window.open(url, "_blank"); // nếu muốn mở tab mới
        }
    });
});

});
