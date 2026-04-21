let currentRotation = [
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 }
];

const faceCoords = [
    { x: 0, y: 0 },    // 1
    { x: 90, y: 0 },   // 5 (ajustado)
    { x: 0, y: 90 },   // 3
    { x: 0, y: -90 },  // 4
    { x: -90, y: 0 },  // 2
    { x: 180, y: 0 }   // 6
];

function lanzarDados() {
    const cubes = [document.getElementById('cube1'), document.getElementById('cube2')];
    const results = [];

    cubes.forEach((cube, i) => {
        if (cube.parentElement.classList.contains('hidden')) return;

        const valor = Math.floor(Math.random() * 6);
        results.push(valor + 1);

        // AÑADIR VUELTAS (mínimo 3 vueltas completas para que no se vea el salto)
        const vueltasX = (Math.floor(Math.random() * 4) + 5) * 360;
        const vueltasY = (Math.floor(Math.random() * 4) + 5) * 360;

        // Actualizamos la posición relativa
        currentRotation[i].x += vueltasX + faceCoords[valor].x;
        currentRotation[i].y += vueltasY + faceCoords[valor].y;
        currentRotation[i].z += Math.random() * 45;

        cube.style.transform = `rotateX(${currentRotation[i].x}deg) rotateY(${currentRotation[i].y}deg) rotateZ(${currentRotation[i].z}deg)`;
    });

    // Sonido y Vibración
    document.getElementById('dice-sound').play().catch(()=>{});
    if (navigator.vibrate) navigator.vibrate([30, 20, 30]);
    document.getElementById('history').innerText = `Resultado: ${results.join(' + ')}`;
}

document.getElementById('roll-btn').onclick = lanzarDados;

// Funciones de UI
function setDiceMode(n) {
    document.getElementById('scene2').classList.toggle('hidden', n === 1);
    document.getElementById('btn-1').classList.toggle('active', n === 1);
    document.getElementById('btn-2').classList.toggle('active', n === 2);
}

function setMaterial(mat) {
    document.querySelectorAll('.cube').forEach(c => {
        c.className = `cube ${mat}`;
    });
    document.querySelectorAll('.mat-btn').forEach(b => {
        b.classList.toggle('active', b.innerText.toLowerCase().includes(mat));
    });
}