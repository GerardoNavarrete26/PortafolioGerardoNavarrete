document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("bgCanvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // ⭐ Lista de estrellas normales
    let stars = [];
    const numStars = 150;

    function createStars() {
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                speed: Math.random() * 0.5 + 0.2,
                alpha: Math.random() * 0.5 + 0.5,
                fade: (Math.random() * 0.05) - 0.025
            });
        }
    }

    function drawStars() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        stars.forEach(star => {
            ctx.globalAlpha = star.alpha;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function updateStars() {
        stars.forEach(star => {
            star.y += star.speed;
            star.alpha += star.fade;

            if (star.alpha <= 0.3 || star.alpha >= 1) {
                star.fade *= -1;
            }

            if (star.y > canvas.height) {
                star.y = 0;
            }
        });
    }

    // 🌠 Imagen de estrella fugaz
    const shootingStarImg = new Image();
    shootingStarImg.src = "shooting-star.png"; // Asegúrate de que esta imagen existe

    let shootingStars = [];

    function createShootingStar() {
        let startX = -150; // Comienza fuera de la pantalla
        let startY = Math.random() * (canvas.height / 2); // Posición aleatoria en la parte superior
        let speed = Math.random() * 10 + 5; // Velocidad más alta
        let size = Math.random() * 120 + 80; // Tamaño ajustado
        let angle = Math.random() * 15 - 10; // Variación en el ángulo

        shootingStars.push({
            x: startX,
            y: startY,
            speedX: speed,
            speedY: speed / 3, // Movimiento diagonal
            size: size,
            angle: angle,
            alpha: 1
        });

        // Ajustamos el tiempo de eliminación para asegurarnos de que llegue al final de la pantalla
        setTimeout(() => {
            shootingStars.shift();
        }, 5000); // Dura 5 segundos en cruzar la pantalla
    }

    function drawShootingStars() {
        shootingStars.forEach(star => {
            ctx.globalAlpha = star.alpha;
            ctx.save();
            ctx.translate(star.x, star.y);
            ctx.rotate((star.angle * Math.PI) / 180);
            ctx.drawImage(shootingStarImg, 0, 0, star.size, star.size / 3);
            ctx.restore();
        });
    }

    function updateShootingStars() {
        shootingStars.forEach(star => {
            star.x += star.speedX;
            star.y += star.speedY;
            star.alpha -= 0.005; // Se desvanece gradualmente

            if (star.alpha <= 0) {
                shootingStars.shift();
            }
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawStars();
        updateStars();
        drawShootingStars();
        updateShootingStars();
        requestAnimationFrame(animate);
    }

    createStars();
    animate();

    // Generar estrellas fugaces con más frecuencia y duración
    setInterval(() => {
        createShootingStar();
    }, Math.random() * 3000 + 1500); // Aparecen cada 1.5s - 3s
});
