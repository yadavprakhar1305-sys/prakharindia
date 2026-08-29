// ══════════════════════════════════════
//  Prakhar India — 3D Interactive Hero Canvas
// ══════════════════════════════════════
(function () {
  const container = document.querySelector('.hero');
  if (!container) return;

  // Create canvas element
  const canvas = document.createElement('canvas');
  canvas.className = 'hero-canvas';
  container.insertBefore(canvas, container.firstChild);

  // Scene setup
  const scene = new THREE.Scene();
  
  // Camera
  const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 1, 1000);
  camera.position.z = 180;
  camera.position.y = 80;
  camera.lookAt(0, 0, 0);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Objects — 3D Isometric Building/Construction Blocks
  const group = new THREE.Group();
  scene.add(group);

  const cubesCount = 45;
  const cubes = [];
  const geometry = new THREE.BoxGeometry(10, 10, 10);
  
  // Custom material with wireframe + solid edges
  const material = new THREE.MeshBasicMaterial({
    color: 0x3b82f6, // Blue-500
    wireframe: true,
    transparent: true,
    opacity: 0.15
  });

  // Generate building columns of different heights in a grid
  const cols = 9;
  const rows = 5;
  const spacingX = 25;
  const spacingZ = 25;
  const startX = -((cols - 1) * spacingX) / 2;
  const startZ = -((rows - 1) * spacingZ) / 2;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const mesh = new THREE.Mesh(geometry, material);
      
      // Calculate position
      const posX = startX + i * spacingX;
      const posZ = startZ + j * spacingZ;
      const heightMultiplier = Math.random() * 4 + 1;
      
      mesh.position.set(posX, 0, posZ);
      mesh.scale.y = heightMultiplier;
      mesh.position.y = (heightMultiplier * 10) / 2 - 40; // Align base of building
      
      group.add(mesh);
      
      // Store original scale and position for animations
      cubes.push({
        mesh: mesh,
        originalHeight: heightMultiplier,
        baseY: (heightMultiplier * 10) / 2 - 40,
        speed: 0.001 + Math.random() * 0.002,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  // Floating particles representing workers / connection nodes
  const particleCount = 120;
  const particlesGeom = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const particleSpeeds = [];

  for (let i = 0; i < particleCount; i++) {
    // Spread in a large sphere
    const angle1 = Math.random() * Math.PI * 2;
    const angle2 = Math.random() * Math.PI;
    const radius = 100 + Math.random() * 80;

    positions[i * 3] = Math.sin(angle2) * Math.cos(angle1) * radius;
    positions[i * 3 + 1] = Math.cos(angle2) * radius;
    positions[i * 3 + 2] = Math.sin(angle2) * Math.sin(angle1) * radius;

    particleSpeeds.push({
      x: (Math.random() - 0.5) * 0.1,
      y: (Math.random() - 0.5) * 0.1,
      z: (Math.random() - 0.5) * 0.1
    });
  }

  particlesGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Orange and light-blue glowing particles
  const particleMat = new THREE.PointsMaterial({
    color: 0xf97316, // Orange-500
    size: 2.5,
    transparent: true,
    opacity: 0.8
  });

  const particleSystem = new THREE.Points(particlesGeom, particleMat);
  group.add(particleSystem);

  // Mouse Interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX) * 0.08;
    mouseY = (event.clientY - windowHalfY) * 0.08;
  });

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  // Animation Loop
  let clock = new THREE.Clock();
  
  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // 1. Gently animate the buildings (rising/falling sine wave)
    cubes.forEach((cube) => {
      cube.phase += cube.speed;
      const wave = Math.sin(elapsedTime * 1.5 + cube.phase) * 0.4 + 1.2;
      cube.mesh.scale.y = cube.originalHeight * wave;
      cube.mesh.position.y = (cube.originalHeight * wave * 10) / 2 - 40;
    });

    // 2. Rotate the entire scene slightly
    group.rotation.y = elapsedTime * 0.03;

    // 3. Move the particles slowly
    const posArr = particleSystem.geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      posArr[i * 3] += particleSpeeds[i].x;
      posArr[i * 3 + 1] += particleSpeeds[i].y;
      posArr[i * 3 + 2] += particleSpeeds[i].z;

      // Bounce back inside boundary
      const dist = Math.sqrt(posArr[i*3]**2 + posArr[i*3+1]**2 + posArr[i*3+2]**2);
      if (dist > 180 || dist < 80) {
        particleSpeeds[i].x *= -1;
        particleSpeeds[i].y *= -1;
        particleSpeeds[i].z *= -1;
      }
    }
    particleSystem.geometry.attributes.position.needsUpdate = true;

    // 4. Parallax Camera motion based on Mouse Position
    targetX = mouseX * .3;
    targetY = mouseY * .15;

    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (80 - targetY - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  animate();
})();
