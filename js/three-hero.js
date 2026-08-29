// ══════════════════════════════════════════════════════════════════════
//  Prakhar India — Realistic 3D Interactive Construction Engine (Three.js)
// ══════════════════════════════════════════════════════════════════════
(function loadThreeAndInit() {
  if (typeof THREE !== 'undefined') {
    initHero3D();
    return;
  }
  // Robust CDN Fallback Chain
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  script.onload = function () { initHero3D(); };
  script.onerror = function () {
    const backup = document.createElement('script');
    backup.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js';
    backup.onload = function () { initHero3D(); };
    document.head.appendChild(backup);
  };
  document.head.appendChild(script);
})();

function initHero3D() {
  const container = document.querySelector('.hero');
  if (!container || typeof THREE === 'undefined') return;

  // Remove existing canvas if any
  const oldCanvas = container.querySelector('.hero-canvas');
  if (oldCanvas) oldCanvas.remove();

  // Create canvas element
  const canvas = document.createElement('canvas');
  canvas.className = 'hero-canvas';
  canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;pointer-events:none;';
  container.insertBefore(canvas, container.firstChild);

  // 1. Scene & Atmosphere Setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x090d16, 0.003);

  // 2. Camera Setup
  const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 1, 1000);
  camera.position.set(160, 110, 220);
  camera.lookAt(0, 35, 0);

  // 3. Renderer Setup with Soft Shadows
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // 4. Lighting Engine
  const ambientLight = new THREE.AmbientLight(0x94a3b8, 0.9);
  scene.add(ambientLight);

  // Sun Light (Directional with Shadows)
  const sunLight = new THREE.DirectionalLight(0xfffaed, 1.5);
  sunLight.position.set(150, 250, 120);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;
  sunLight.shadow.camera.near = 10;
  sunLight.shadow.camera.far = 600;
  const d = 150;
  sunLight.shadow.camera.left = -d;
  sunLight.shadow.camera.right = d;
  sunLight.shadow.camera.top = d;
  sunLight.shadow.camera.bottom = -d;
  scene.add(sunLight);

  // Warm Construction Site Worklights
  const siteLight = new THREE.PointLight(0xf97316, 2.5, 280);
  siteLight.position.set(0, 90, 0);
  scene.add(siteLight);

  const blueFillLight = new THREE.DirectionalLight(0x38bdf8, 0.6);
  blueFillLight.position.set(-100, 50, -100);
  scene.add(blueFillLight);

  // 5. Materials Palette
  const matConcrete = new THREE.MeshPhongMaterial({ color: 0x475569, flatShading: true });
  const matConcreteLight = new THREE.MeshPhongMaterial({ color: 0x94a3b8, flatShading: true });
  const matSteelYellow = new THREE.MeshPhongMaterial({ color: 0xf59e0b, shininess: 80, specular: 0xffffff });
  const matSteelDark = new THREE.MeshPhongMaterial({ color: 0x334155, shininess: 60 });
  const matGlass = new THREE.MeshPhongMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.45, shininess: 100 });
  const matScaffolding = new THREE.MeshBasicMaterial({ color: 0x94a3b8, wireframe: true });
  const matOrangeHighlight = new THREE.MeshBasicMaterial({ color: 0xea580c, wireframe: true });

  // 6. Master Site Group
  const siteGroup = new THREE.Group();
  scene.add(siteGroup);

  // A. Ground & Blueprint Engineering Grid
  const groundGeo = new THREE.PlaneGeometry(500, 500);
  const groundMat = new THREE.MeshPhongMaterial({ color: 0x090d16, depthWrite: true });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1;
  ground.receiveShadow = true;
  siteGroup.add(ground);

  const gridHelper = new THREE.GridHelper(400, 40, 0xf97316, 0x1e293b);
  gridHelper.position.y = 0.2;
  siteGroup.add(gridHelper);

  // B. Building Foundation Slabs & Podium
  const foundationBox = new THREE.Mesh(new THREE.BoxGeometry(110, 6, 90), matConcrete);
  foundationBox.position.set(0, 3, 0);
  foundationBox.castShadow = true;
  foundationBox.receiveShadow = true;
  siteGroup.add(foundationBox);

  // C. Multi-Story Structure Pillars & Floor Decks
  const floorHeights = [6, 30, 54, 78, 102];
  const numColsX = 4;
  const numColsZ = 3;
  const spacingX = 28;
  const spacingZ = 28;
  const startX = -((numColsX - 1) * spacingX) / 2;
  const startZ = -((numColsZ - 1) * spacingZ) / 2;

  floorHeights.forEach((h, idx) => {
    if (idx === 0) return;
    const width = idx === 4 ? 60 : 100;
    const depth = idx === 4 ? 50 : 80;
    const slab = new THREE.Mesh(new THREE.BoxGeometry(width, 3, depth), idx % 2 === 0 ? matConcrete : matConcreteLight);
    slab.position.set(idx === 4 ? -15 : 0, h, 0);
    slab.castShadow = true;
    slab.receiveShadow = true;
    siteGroup.add(slab);

    if (idx === 1 || idx === 2) {
      const glassWall = new THREE.Mesh(new THREE.BoxGeometry(width - 2, 21, depth - 2), matGlass);
      glassWall.position.set(0, h - 11, 0);
      siteGroup.add(glassWall);
    }
  });

  for (let i = 0; i < numColsX; i++) {
    for (let j = 0; j < numColsZ; j++) {
      const colX = startX + i * spacingX;
      const colZ = startZ + j * spacingZ;

      const colHeight = (i === numColsX - 1 && j === numColsZ - 1) ? 80 : 115;
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.5, colHeight, 8), matConcrete);
      pillar.position.set(colX, colHeight / 2, colZ);
      pillar.castShadow = true;
      pillar.receiveShadow = true;
      siteGroup.add(pillar);

      const rebar = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.8, 16, 6), matOrangeHighlight);
      rebar.position.set(colX, colHeight + 8, colZ);
      siteGroup.add(rebar);
    }
  }

  floorHeights.forEach((h) => {
    for (let j = 0; j < numColsZ; j++) {
      const colZ = startZ + j * spacingZ;
      const beam = new THREE.Mesh(new THREE.BoxGeometry(90, 2.5, 2.5), matSteelDark);
      beam.position.set(0, h + 1.5, colZ);
      beam.castShadow = true;
      siteGroup.add(beam);
    }
    for (let i = 0; i < numColsX; i++) {
      const colX = startX + i * spacingX;
      const beam = new THREE.Mesh(new THREE.BoxGeometry(2.5, 2.5, 60), matSteelDark);
      beam.position.set(colX, h + 1.5, 0);
      beam.castShadow = true;
      siteGroup.add(beam);
    }
  });

  const scaffoldGeo = new THREE.BoxGeometry(106, 36, 86);
  const scaffold = new THREE.Mesh(scaffoldGeo, matScaffolding);
  scaffold.position.set(0, 96, 0);
  siteGroup.add(scaffold);

  // Tower Crane
  const craneGroup = new THREE.Group();
  craneGroup.position.set(65, 0, -45);
  siteGroup.add(craneGroup);

  const craneBase = new THREE.Mesh(new THREE.BoxGeometry(16, 8, 16), matSteelDark);
  craneBase.position.y = 4;
  craneGroup.add(craneBase);

  const mastHeight = 160;
  const craneMast = new THREE.Mesh(new THREE.BoxGeometry(8, mastHeight, 8), matSteelYellow);
  craneMast.position.y = mastHeight / 2 + 8;
  craneMast.castShadow = true;
  craneGroup.add(craneMast);

  const craneRingGroup = new THREE.Group();
  craneRingGroup.position.y = mastHeight + 4;
  craneGroup.add(craneRingGroup);

  const cab = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 12), matSteelDark);
  cab.position.set(2, 4, 0);
  craneRingGroup.add(cab);

  const jibLength = 130;
  const jib = new THREE.Mesh(new THREE.BoxGeometry(jibLength, 6, 6), matSteelYellow);
  jib.position.set(jibLength / 2 - 25, 10, 0);
  jib.castShadow = true;
  craneRingGroup.add(jib);

  const counterWeight = new THREE.Mesh(new THREE.BoxGeometry(18, 10, 10), matConcrete);
  counterWeight.position.set(-20, 11, 0);
  craneRingGroup.add(counterWeight);

  const apex = new THREE.Mesh(new THREE.ConeGeometry(5, 16, 4), matSteelYellow);
  apex.position.set(0, 18, 0);
  craneRingGroup.add(apex);

  const cableMat = new THREE.LineBasicMaterial({ color: 0x0f172a, linewidth: 2 });
  const cableGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-20, 16, 0),
    new THREE.Vector3(0, 26, 0),
    new THREE.Vector3(65, 13, 0)
  ]);
  const cableLine = new THREE.Line(cableGeo, cableMat);
  craneRingGroup.add(cableLine);

  const trolleyGroup = new THREE.Group();
  trolleyGroup.position.set(50, 7, 0);
  craneRingGroup.add(trolleyGroup);

  const trolley = new THREE.Mesh(new THREE.BoxGeometry(6, 3, 7), matSteelDark);
  trolleyGroup.add(trolley);

  const hoistLineGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, -45, 0)
  ]);
  const hoistLine = new THREE.Line(hoistLineGeo, new THREE.LineBasicMaterial({ color: 0x1e293b }));
  trolleyGroup.add(hoistLine);

  const payloadGroup = new THREE.Group();
  payloadGroup.position.set(0, -47, 0);
  trolleyGroup.add(payloadGroup);

  const liftedBeam = new THREE.Mesh(new THREE.BoxGeometry(36, 4, 4), matSteelYellow);
  liftedBeam.castShadow = true;
  payloadGroup.add(liftedBeam);

  // Mixer truck
  const truckGroup = new THREE.Group();
  truckGroup.position.set(-75, 0, 50);
  truckGroup.rotation.y = Math.PI / 4;
  siteGroup.add(truckGroup);

  const truckChassis = new THREE.Mesh(new THREE.BoxGeometry(32, 6, 14), matSteelDark);
  truckChassis.position.y = 5;
  truckGroup.add(truckChassis);

  const truckCab = new THREE.Mesh(new THREE.BoxGeometry(10, 12, 14), matSteelYellow);
  truckCab.position.set(-10, 12, 0);
  truckGroup.add(truckCab);

  const drum = new THREE.Mesh(new THREE.CylinderGeometry(7, 7, 18, 12), matConcreteLight);
  drum.rotation.z = Math.PI / 3;
  drum.position.set(6, 13, 0);
  truckGroup.add(drum);

  // Particles
  const particleCount = 140;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleSpeeds = [];

  for (let p = 0; p < particleCount; p++) {
    particlePositions[p * 3] = (Math.random() - 0.5) * 220;
    particlePositions[p * 3 + 1] = Math.random() * 140;
    particlePositions[p * 3 + 2] = (Math.random() - 0.5) * 220;

    particleSpeeds.push({
      y: 0.05 + Math.random() * 0.1,
      x: (Math.random() - 0.5) * 0.05
    });
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMat = new THREE.PointsMaterial({ color: 0xf97316, size: 2.5, transparent: true, opacity: 0.8 });
  const particleSystem = new THREE.Points(particleGeo, particleMat);
  siteGroup.add(particleSystem);

  // Interactive Mouse Parallax
  let mouseX = 0;
  let mouseY = 0;
  let targetCamX = 160;
  let targetCamY = 110;

  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - windowHalfX) * 0.05;
    mouseY = (e.clientY - windowHalfY) * 0.05;
  });

  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  // Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();

    craneRingGroup.rotation.y = Math.sin(elapsed * 0.4) * 0.6 + 0.2;
    payloadGroup.rotation.z = Math.sin(elapsed * 1.5) * 0.08;
    payloadGroup.rotation.x = Math.cos(elapsed * 1.2) * 0.05;
    drum.rotation.x = elapsed * 2;
    siteGroup.rotation.y = elapsed * 0.025;

    const posArr = particleSystem.geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      posArr[i * 3 + 1] += particleSpeeds[i].y;
      posArr[i * 3] += particleSpeeds[i].x;

      if (posArr[i * 3 + 1] > 150) {
        posArr[i * 3 + 1] = 0;
        posArr[i * 3] = (Math.random() - 0.5) * 220;
      }
    }
    particleSystem.geometry.attributes.position.needsUpdate = true;

    targetCamX = 160 + mouseX * 0.5;
    targetCamY = Math.max(40, 110 - mouseY * 0.4);

    camera.position.x += (targetCamX - camera.position.x) * 0.04;
    camera.position.y += (targetCamY - camera.position.y) * 0.04;
    camera.lookAt(0, 45, 0);

    renderer.render(scene, camera);
  }

  animate();
}
