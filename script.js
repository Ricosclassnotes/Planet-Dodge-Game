// Game loop
function gameLoop() {
    if (!running) return;

    // Clear canvas
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Move rocket
    rocketX += rocketSpeedX;
    rocketY += rocketSpeedY;

    // Draw rocket
    ctx.drawImage(rocketImg, rocketX - rocketSize / 2, rocketY - rocketSize / 2, rocketSize, rocketSize);

    // Move and draw planets
    for (let i = 0; i < planets.length; i++) {
        const planet = planets[i];
        planet.x += planetSpeed;
        ctx.drawImage(planetImg, planet.x - planetSize / 2, planet.y - planetSize / 2, planetSize, planetSize);

        // Check for collision
        const distanceX = Math.abs(rocketX - (planet.x + planetSize / 2));
        const distanceY = Math.abs(rocketY - (planet.y + planetSize / 2));
        const distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));

        if (distance <= (rocketSize / 2) + (planetSize / 2)) {
            running = false;
            break;
        }

        // Check if planet goes out of bounds
        if (planet.x + planetSize < 0) {
            planets.splice(i, 1);
        }
    }

    // Spawn new planets
    spawnTimer++;
    if (spawnTimer >= spawnRate) {
        spawnPlanet();
        spawnTimer = 0;
    }

    // Draw score
    ctx.fillStyle = "white";
    ctx.font = font;
    ctx.fillText("Score: " + score, 10, 40);

    requestAnimationFrame(gameLoop);
}