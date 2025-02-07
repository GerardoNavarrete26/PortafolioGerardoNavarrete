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
    shootingStarImg.src = "assets/shooting-star.png"; // Asegúrate de que esta imagen existe

    let shootingStars = [];
    const maxShootingStars = 3; // Máximo de estrellas fugaces activas

    function createShootingStar() {
        if (shootingStars.length >= maxShootingStars) return; // Evita crear demasiadas al mismo tiempo

        let startX = Math.random() * (canvas.width * 0.3); // Empieza en el 30% superior izquierdo
        let startY = Math.random() * (canvas.height * 0.3);
        let speed = Math.random() * 6 + 4; // Velocidad más estable
        let size = Math.random() * 120 + 80; // Tamaño más grande para más impacto
        let speedX = speed * 1.5; // Movimiento en X más rápido
        let speedY = speed * 0.8; // Movimiento en Y más controlado
        let lifetime = Math.random() * 2000 + 4000; // Siempre dura entre 4s y 6s

        shootingStars.push({
            x: startX,
            y: startY,
            speedX: speedX,
            speedY: speedY,
            size: size,
            alpha: 1,
            lifetime: Date.now() + lifetime // Guarda el tiempo de eliminación
        });
    }

    function drawShootingStars() {
        shootingStars.forEach(star => {
            ctx.globalAlpha = star.alpha;
            ctx.drawImage(shootingStarImg, star.x, star.y, star.size, star.size / 3);
        });
    }

    function updateShootingStars() {
        let now = Date.now();
        shootingStars = shootingStars.filter(star => now < star.lifetime); // Elimina solo cuando pasa su lifetime

        shootingStars.forEach(star => {
            star.x += star.speedX;
            star.y += star.speedY;
            star.alpha -= 0.004;
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

    // Generar estrellas fugaces de forma controlada
    setInterval(() => {
        createShootingStar();
    }, Math.random() * 4000 + 3000); // Siempre se generan cada 3s a 4s de manera equilibrada
});
