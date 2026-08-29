// ══════════════════════════════════════════════════════════════════════
//  Prakhar India — 3D Interactive Building Phase Inspector Engine
// ══════════════════════════════════════════════════════════════════════
(function loadThreeForInspector() {
  if (typeof THREE !== 'undefined') return;
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  script.onload = function () {
    if (document.getElementById('3d-inspector-container')) {
      init3dBuildingInspector('3d-inspector-container');
    }
  };
  script.onerror = function () {
    const backup = document.createElement('script');
    backup.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js';
    backup.onload = function () {
      if (document.getElementById('3d-inspector-container')) {
        init3dBuildingInspector('3d-inspector-container');
      }
    };
    document.head.appendChild(backup);
  };
  document.head.appendChild(script);
})();

function init3dBuildingInspector(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === 'undefined') return;

  container.innerHTML = ''; // Clear container

  // Canvas
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'width:100%;height:100%;border-radius:12px;background:#0f172a;cursor:grab;';
  container.appendChild(canvas);

  // Scene setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0f172a, 0.005);

  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 1, 500);
  camera.position.set(70, 45, 90);
  camera.lookAt(0, 15, 0);

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;

  // Lights
  const ambient = new THREE.AmbientLight(0xf8fafc, 0.9);
  scene.add(ambient);

  const dirLight = new THREE.DirectionalLight(0xfffaed, 1.2);
  dirLight.position.set(60, 100, 50);
  dirLight.castShadow = true;
  scene.add(dirLight);

  const blueLight = new THREE.PointLight(0x38bdf8, 1.5, 120);
  blueLight.position.set(-40, 50, -40);
  scene.add(blueLight);

  // Grid
  const grid = new THREE.GridHelper(120, 24, 0xf97316, 0x334155);
  grid.position.y = 0;
  scene.add(grid);

  // Building Parent Group
  const buildingGroup = new THREE.Group();
  scene.add(buildingGroup);

  // Materials
  const matConcrete = new THREE.MeshPhongMaterial({ color: 0x475569 });
  const matSteel = new THREE.MeshPhongMaterial({ color: 0xf59e0b, shininess: 90 });
  const matBrick = new THREE.MeshPhongMaterial({ color: 0xb45309 });
  const matGlass = new THREE.MeshPhongMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.45, shininess: 100 });
  const matFinish = new THREE.MeshPhongMaterial({ color: 0xf8fafc });
  const matRoof = new THREE.MeshPhongMaterial({ color: 0x0284c7 });
  const matRebarWire = new THREE.MeshBasicMaterial({ color: 0xea580c, wireframe: true });

  // Phase Sub-Groups
  const phase1Group = new THREE.Group();
  const phase2Group = new THREE.Group();
  const phase3Group = new THREE.Group();

  buildingGroup.add(phase1Group);
  buildingGroup.add(phase2Group);
  buildingGroup.add(phase3Group);

  // --- PHASE 1: Foundation & Steel Columns ---
  const basePad = new THREE.Mesh(new THREE.BoxGeometry(64, 4, 44), matConcrete);
  basePad.position.y = 2;
  basePad.castShadow = true;
  phase1Group.add(basePad);

  const pPositions = [
    [-26, -16], [0, -16], [26, -16],
    [-26, 16],  [0, 16],  [26, 16]
  ];

  pPositions.forEach(pos => {
    const col = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 32, 8), matConcrete);
    col.position.set(pos[0], 18, pos[1]);
    col.castShadow = true;
    phase1Group.add(col);

    const rebarTop = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 8, 6), matRebarWire);
    rebarTop.position.set(pos[0], 38, pos[1]);
    phase1Group.add(rebarTop);
  });

  const roofBeam1 = new THREE.Mesh(new THREE.BoxGeometry(56, 2, 2), matSteel);
  roofBeam1.position.set(0, 34, -16);
  phase1Group.add(roofBeam1);

  const roofBeam2 = new THREE.Mesh(new THREE.BoxGeometry(56, 2, 2), matSteel);
  roofBeam2.position.set(0, 34, 16);
  phase1Group.add(roofBeam2);

  // --- PHASE 2: Brickwork & Interior Walls ---
  const wall1 = new THREE.Mesh(new THREE.BoxGeometry(52, 28, 2), matBrick);
  wall1.position.set(0, 18, -15);
  phase2Group.add(wall1);

  const wall2 = new THREE.Mesh(new THREE.BoxGeometry(2, 28, 30), matBrick);
  wall2.position.set(-25, 18, 0);
  phase2Group.add(wall2);

  const wall3 = new THREE.Mesh(new THREE.BoxGeometry(2, 28, 30), matBrick);
  wall3.position.set(25, 18, 0);
  phase2Group.add(wall3);

  const midSlab = new THREE.Mesh(new THREE.BoxGeometry(54, 2, 32), matConcrete);
  midSlab.position.set(0, 18, 0);
  phase2Group.add(midSlab);

  // --- PHASE 3: Turnkey Architectural Finish & Glass Exterior ---
  const exteriorShell = new THREE.Mesh(new THREE.BoxGeometry(55, 30, 33), matFinish);
  exteriorShell.position.set(0, 19, 0);
  exteriorShell.castShadow = true;
  phase3Group.add(exteriorShell);

  const roofTop = new THREE.Mesh(new THREE.BoxGeometry(59, 3, 37), matRoof);
  roofTop.position.set(0, 35.5, 0);
  roofTop.castShadow = true;
  phase3Group.add(roofTop);

  const frontGlass = new THREE.Mesh(new THREE.BoxGeometry(36, 20, 1), matGlass);
  frontGlass.position.set(0, 19, 17);
  phase3Group.add(frontGlass);

  // Function to switch visible phase
  window.setBuildingPhase = function(phaseNum) {
    phase1Group.visible = true;
    phase2Group.visible = phaseNum >= 2;
    phase3Group.visible = phaseNum >= 3;

    document.querySelectorAll('.phase-btn').forEach((btn, idx) => {
      if (idx + 1 === phaseNum) {
        btn.classList.add('active');
        btn.style.background = '#f97316';
        btn.style.border = 'none';
      } else {
        btn.classList.remove('active');
        btn.style.background = '#1e293b';
        btn.style.border = '1px solid #334155';
      }
    });
  };

  window.setBuildingPhase(3);

  // Drag Orbit Interaction
  let isDragging = false;
  let previousMouseX = 0;
  let previousMouseY = 0;

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMouseX = e.clientX;
    previousMouseY = e.clientY;
    canvas.style.cursor = 'grabbing';
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    canvas.style.cursor = 'grab';
  });

  canvas.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - previousMouseX;
    const deltaY = e.clientY - previousMouseY;

    buildingGroup.rotation.y += deltaX * 0.01;
    buildingGroup.rotation.x = Math.max(-0.2, Math.min(0.6, buildingGroup.rotation.x + deltaY * 0.005));

    previousMouseX = e.clientX;
    previousMouseY = e.clientY;
  });

  // Touch Support
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      previousMouseX = e.touches[0].clientX;
      previousMouseY = e.touches[0].clientY;
    }
  });

  canvas.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - previousMouseX;
    const deltaY = e.touches[0].clientY - previousMouseY;

    buildingGroup.rotation.y += deltaX * 0.01;
    buildingGroup.rotation.x = Math.max(-0.2, Math.min(0.6, buildingGroup.rotation.x + deltaY * 0.005));

    previousMouseX = e.touches[0].clientX;
    previousMouseY = e.touches[0].clientY;
  });

  window.addEventListener('touchend', () => { isDragging = false; });

  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  function animate() {
    requestAnimationFrame(animate);
    if (!isDragging) {
      buildingGroup.rotation.y += 0.004;
    }
    renderer.render(scene, camera);
  }

  animate();
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('3d-inspector-container')) {
    init3dBuildingInspector('3d-inspector-container');
  }
});
