// ======================================================================
//  Prakhar India — Mirzapur Architectural 3D Masterplan & Plot Dossier
//  Restrained Oxford Navy, Limestone & Burnished Bronze Spatial Model
// ======================================================================
(function () {
  'use strict';

  const MIRZAPUR_PLOTS = [
    {
      id: 'vindhyachal',
      type: 'residential',
      badge: 'RERA Approved · Plotted Enclave',
      zoneLabel: 'Vindhyachal Temple Road',
      title: 'Vindhya Greens Gated Enclave',
      rate: '₹1,350 / sq.ft',
      priceFrom: '₹16.2 Lakh onwards',
      sizes: '1,200 – 2,400 sq.ft',
      estSqft: 1500,
      road: '40 ft Blacktop Avenue',
      legal: 'Immediate Registry & Dakhil Kharij',
      financing: 'SBI & HDFC Approved',
      summary: '1.8 km from Vindhyachal Corridor & Ganga Ghats. Underground drainage, perimeter wall, solar lighting, and park.',
      img: 'images/re-township.jpg',
      imgAlt: 'Vindhya Greens gated residential plot enclave on Vindhyachal Road, Mirzapur',
      pos3d: { x: -24, z: -12, w: 14, d: 11, h: 3.2, hex: 0xc8a873 }
    },
    {
      id: 'natwa-cantt',
      type: 'villa',
      badge: 'New Phase · Villa Enclave',
      zoneLabel: 'Natwa Crossing, Mirzapur',
      title: 'Natwa Cantt Luxury Plot Enclave',
      rate: '₹1,450 / sq.ft',
      priceFrom: '₹21.7 Lakh onwards',
      sizes: '1,500 – 3,000 sq.ft',
      estSqft: 1800,
      road: '35 ft Internal Concrete Road',
      legal: 'Freehold 143 Clear Title',
      financing: 'Turnkey Villa Build Optional',
      summary: 'Mirzapur’s established civil bungalow district with elevated drainage levels, landscaped lawns, and fixed-rate custom home construction.',
      img: 'images/re-villa.jpg',
      imgAlt: 'Luxury villa plots inside Natwa Cantt Enclave in Mirzapur',
      pos3d: { x: -4, z: -8, w: 13, d: 12, h: 4.0, hex: 0xd6c3a1 }
    },
    {
      id: 'highway',
      type: 'commercial',
      badge: 'Commercial · NH Frontage',
      zoneLabel: 'Adalhat & Kailahat NH Corridor',
      title: 'Mirzapur-Varanasi Highway Commercial Land',
      rate: '₹2,200 / sq.ft',
      priceFrom: 'Showroom / Hospital / Logistics',
      sizes: '3,000 – 15,000 sq.ft',
      estSqft: 3200,
      road: '60 ft Main Highway Access',
      legal: 'Non-Agricultural (Section 143 Certified)',
      financing: 'Commercial Bank & Lease Ready',
      summary: 'High-visibility frontage parcels connecting Mirzapur and Varanasi for healthcare centres, automotive showrooms, and warehousing.',
      img: 'images/re-commercial.jpg',
      imgAlt: 'Mirzapur Varanasi highway commercial plots at Adalhat and Kailahat',
      pos3d: { x: 24, z: -6, w: 16, d: 11, h: 4.8, hex: 0xb4915a }
    },
    {
      id: 'shastri-bridge',
      type: 'residential',
      badge: 'Ready Possession · Central',
      zoneLabel: 'Shastri Bridge Approach Road',
      title: 'Shastri Bridge City Enclave',
      rate: '₹1,600 / sq.ft',
      priceFrom: '₹16.0 Lakh onwards',
      sizes: '1,000 – 2,000 sq.ft',
      estSqft: 1250,
      road: '30 ft Paved City Road',
      legal: 'Immediate Handover & Demarcation',
      financing: 'All Nationalized Banks Eligible',
      summary: 'Central city connectivity minutes from Aurai-Bhadohi bridge and collectorate with electricity infrastructure and sweet groundwater table.',
      img: 'images/re-hero-tower.jpg',
      imgAlt: 'Residential city plots near Shastri Bridge approach road in Mirzapur',
      pos3d: { x: -16, z: 12, w: 12, d: 10, h: 3.4, hex: 0x8ea9c4 }
    },
    {
      id: 'chunar',
      type: 'farmhouse',
      badge: 'Green Belt · Retreat Plots',
      zoneLabel: 'Chunar Heritage & Ganga Belt',
      title: 'Chunar Eco Green Villa & Farm Plots',
      rate: '₹1,150 / sq.ft',
      priceFrom: '₹23.0 Lakh onwards',
      sizes: '2,000 – 10,000 sq.ft',
      estSqft: 2400,
      road: '35 ft Tree-Lined Avenue',
      legal: 'Gated Perimeter & Mutation Ready',
      financing: 'Turnkey Villa Package Available',
      summary: 'Low-density Vindhya foothill greenery and river air near Chunar Fort belt — suited for retirement homes, resorts, and farmhouse retreats.',
      img: 'images/mirzapur-chunar.jpg',
      imgAlt: 'Chunar green farmhouse and weekend villa plots near Ganga belt, Mirzapur',
      pos3d: { x: 6, z: 14, w: 15, d: 11, h: 2.8, hex: 0x4b7f63 }
    },
    {
      id: 'station',
      type: 'commercial',
      badge: 'Retail Bay · High Yield',
      zoneLabel: 'Mirzapur Railway Station Corridor',
      title: 'Station Road Retail Shop Plots',
      rate: '₹2,450 / sq.ft',
      priceFrom: 'High-Yield Commercial Plots',
      sizes: '1,000 – 2,500 sq.ft',
      estSqft: 1400,
      road: '45 ft Commercial Frontage',
      legal: 'Commercial Approved & Freehold',
      financing: '8–10% Estimated Rental Yield',
      summary: 'High-footfall retail bays, clinics, and office plot frontages walking distance from Mirzapur Junction.',
      img: 'images/re-interior.jpg',
      imgAlt: 'Commercial shop plots on Mirzapur Station Road corridor',
      pos3d: { x: 25, z: 13, w: 11, d: 9, h: 4.3, hex: 0xd6ba88 }
    }
  ];

  function getPrefix(rootEl) {
    if (rootEl && rootEl.dataset && rootEl.dataset.prefix !== undefined) return rootEl.dataset.prefix;
    const p = window.location.pathname;
    return (p.indexOf('/pages/') !== -1 || p.indexOf('/blog/') !== -1) ? '../' : '';
  }

  function loadThreeLib(onReady) {
    if (typeof window.THREE !== 'undefined') { onReady(); return; }
    const existing = document.querySelector('script[data-three-loader="1"]');
    if (existing) { existing.addEventListener('load', onReady); return; }
    const s = document.createElement('script');
    s.dataset.threeLoader = '1';
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    s.onload = onReady;
    s.onerror = function () {
      const b = document.createElement('script');
      b.dataset.threeLoader = '1';
      b.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js';
      b.onload = onReady;
      document.head.appendChild(b);
    };
    document.head.appendChild(s);
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (ch) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch];
    });
  }

  function createPlotExperience(rootEl) {
    const prefix = getPrefix(rootEl);
    const canvasHost = rootEl.querySelector('#mzp3dCanvas');
    const inspectorHost = rootEl.querySelector('#mzp3dInspector');
    const cardsHost = rootEl.querySelector('#mzp3dCards');
    const filterButtons = rootEl.querySelectorAll('[data-mzp-filter]');
    const zoneButtons = rootEl.querySelectorAll('[data-mzp-zone]');

    let selectedId = 'vindhyachal';
    let activeFilter = 'all';
    let orbitPaused = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let sceneController = null;

    function getPlot(id) {
      return MIRZAPUR_PLOTS.find(function (p) { return p.id === id; }) || MIRZAPUR_PLOTS[0];
    }

    function renderInspector(id) {
      if (!inspectorHost) return;
      const plot = getPlot(id);
      const hasEstimator = Boolean(document.getElementById('estimator'));
      const visitHref = document.getElementById('enquiryForm') ? '#enquire' : (document.getElementById('siteVisitForm') ? '#siteVisitForm' : prefix + 'index.html#enquire');

      inspectorHost.innerHTML =
        '<div>' +
          '<span class="mzp3d-ins-tag">' + escapeHtml(plot.badge) + '</span>' +
          '<h3>' + escapeHtml(plot.title) + '</h3>' +
          '<div class="mzp3d-ins-price">' + escapeHtml(plot.rate) + ' <span style="font-size:0.84rem;color:var(--mnc-muted);font-weight:500;">(' + escapeHtml(plot.priceFrom) + ')</span></div>' +
          '<p class="mzp3d-ins-desc">' + escapeHtml(plot.summary) + '</p>' +
        '</div>' +
        '<div class="mzp3d-ins-specs">' +
          '<div class="mzp3d-spec-box"><span>Corridor</span><b>' + escapeHtml(plot.zoneLabel) + '</b></div>' +
          '<div class="mzp3d-spec-box"><span>Plot Dimensions</span><b>' + escapeHtml(plot.sizes) + '</b></div>' +
          '<div class="mzp3d-spec-box"><span>Road Width</span><b>' + escapeHtml(plot.road) + '</b></div>' +
          '<div class="mzp3d-spec-box"><span>Title &amp; Approvals</span><b>' + escapeHtml(plot.legal) + '</b></div>' +
        '</div>' +
        '<div class="mzp3d-ins-actions">' +
          '<button type="button" class="btn btn-dark btn-sm mzp-action-est">' + (hasEstimator ? 'Estimate Build Cost' : 'Go to Estimator') + '</button>' +
          '<a href="' + visitHref + '" class="btn btn-gold btn-sm mzp-action-visit">Schedule Inspection</a>' +
        '</div>';

      const estBtn = inspectorHost.querySelector('.mzp-action-est');
      if (estBtn) {
        estBtn.addEventListener('click', function () {
          const estArea = document.getElementById('estArea');
          const estSection = document.getElementById('estimator');
          if (estArea && estSection) {
            estArea.value = String(plot.estSqft);
            estArea.dispatchEvent(new Event('input', { bubbles: true }));
            estSection.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.location.href = prefix + 'index.html#estimator';
          }
        });
      }

      const visitBtn = inspectorHost.querySelector('.mzp-action-visit');
      if (visitBtn) {
        visitBtn.addEventListener('click', function () {
          const msgField = document.getElementById('eMsg') || document.getElementById('svMsg');
          const interestField = document.getElementById('eInterest');
          if (interestField) {
            for (let i = 0; i < interestField.options.length; i++) {
              if (interestField.options[i].value.toLowerCase().indexOf('plot') !== -1) {
                interestField.selectedIndex = i;
                break;
              }
            }
          }
          if (msgField) {
            msgField.value = 'Requesting private site inspection for ' + plot.title + ' (' + plot.rate + ', ' + plot.sizes + ') in Mirzapur.';
          }
        });
      }
    }

    function renderCards() {
      if (!cardsHost) return;
      const list = MIRZAPUR_PLOTS.filter(function (p) { return activeFilter === 'all' || p.type === activeFilter; });
      cardsHost.innerHTML = list.map(function (p) {
        const cls = p.id === selectedId ? ' selected' : '';
        return (
          '<article class="mzp3d-card' + cls + '" data-plot-id="' + p.id + '" tabindex="0" role="button" aria-label="Focus ' + escapeHtml(p.title) + ' in architectural masterplan">' +
            '<div class="mzp3d-card-img">' +
              '<img src="' + prefix + p.img + '" alt="' + escapeHtml(p.imgAlt) + '" width="400" height="260" loading="lazy">' +
              '<span class="mzp3d-card-tag">' + escapeHtml(p.badge) + '</span>' +
            '</div>' +
            '<div class="mzp3d-card-body">' +
              '<div class="mzp3d-card-loc">' + escapeHtml(p.zoneLabel) + '</div>' +
              '<h4>' + escapeHtml(p.title) + '</h4>' +
              '<div class="mzp3d-card-price">' + escapeHtml(p.rate) + ' &middot; ' + escapeHtml(p.priceFrom) + '</div>' +
              '<div class="mzp3d-card-meta">' +
                '<span>' + escapeHtml(p.sizes) + '</span>' +
                '<span>' + escapeHtml(p.road) + '</span>' +
                '<span>' + escapeHtml(p.financing) + '</span>' +
              '</div>' +
              '<div class="mzp3d-card-foot">' +
                '<span>Select to focus masterplan</span>' +
                '<strong style="color:var(--mnc-bronze);">Dossier &rarr;</strong>' +
              '</div>' +
            '</div>' +
          '</article>'
        );
      }).join('');

      cardsHost.querySelectorAll('.mzp3d-card').forEach(function (card) {
        function activate() { selectZone(card.getAttribute('data-plot-id')); }
        card.addEventListener('click', activate);
        card.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
        });
      });
    }

    function selectZone(id) {
      selectedId = id;
      renderInspector(id);
      renderCards();
      zoneButtons.forEach(function (btn) {
        const active = btn.getAttribute('data-mzp-zone') === id;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', String(active));
      });
      const activeBadge = rootEl.querySelector('#mzpActiveZoneName');
      if (activeBadge) activeBadge.textContent = getPlot(id).zoneLabel;
      if (sceneController) sceneController.focusZone(id);
      rootEl.querySelectorAll('.mzp3d-iso-lot').forEach(function (lot) {
        lot.classList.toggle('active', lot.getAttribute('data-iso-id') === id);
      });
    }

    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeFilter = btn.getAttribute('data-mzp-filter');
        filterButtons.forEach(function (b) {
          b.classList.toggle('active', b === btn);
          b.setAttribute('aria-pressed', String(b === btn));
        });
        const firstVisible = MIRZAPUR_PLOTS.find(function (p) { return activeFilter === 'all' || p.type === activeFilter; });
        if (firstVisible) selectedId = firstVisible.id;
        renderCards();
        renderInspector(selectedId);
        if (sceneController) sceneController.focusZone(selectedId);
      });
    });

    zoneButtons.forEach(function (btn) {
      btn.addEventListener('click', function () { selectZone(btn.getAttribute('data-mzp-zone')); });
    });

    function renderIsoFallback() {
      if (!canvasHost) return;
      canvasHost.innerHTML =
        '<div class="mzp3d-iso-fallback">' +
          '<div class="mzp3d-iso-plane">' +
            MIRZAPUR_PLOTS.map(function (p) {
              const cls = p.id === selectedId ? ' active' : '';
              return '<button type="button" class="mzp3d-iso-lot' + cls + '" data-iso-id="' + p.id + '">' +
                '<div style="color:#d6ba88;font-size:0.68rem;">' + escapeHtml(p.rate) + '</div>' +
                '<div>' + escapeHtml(p.zoneLabel) + '</div>' +
              '</button>';
            }).join('') +
          '</div>' +
        '</div>';
      canvasHost.querySelectorAll('.mzp3d-iso-lot').forEach(function (btn) {
        btn.addEventListener('click', function () { selectZone(btn.getAttribute('data-iso-id')); });
      });
    }

    function initWebGLMasterplan() {
      if (!canvasHost || typeof window.THREE === 'undefined') { renderIsoFallback(); return; }
      const w = Math.max(canvasHost.clientWidth || 0, 560);
      const h = Math.max(canvasHost.clientHeight || 0, 430);

      let renderer;
      try {
        renderer = new window.THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch (e) {
        renderIsoFallback();
        return;
      }

      const THREE = window.THREE;
      canvasHost.innerHTML = '';
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.shadowMap.enabled = true;
      renderer.domElement.style.cssText = 'width:100%;height:100%;display:block;cursor:grab;touch-action:pan-y;';
      canvasHost.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x0d1b2a, 0.0055);

      const camera = new THREE.PerspectiveCamera(42, w / h, 0.5, 400);
      let camTheta = -0.58;
      let camPhi = 0.72;
      let camRadius = 66;
      const targetLook = new THREE.Vector3(0, 1, 0);
      const desiredLook = new THREE.Vector3(0, 1, 0);

      function updateCamera() {
        camera.position.x = targetLook.x + camRadius * Math.sin(camPhi) * Math.sin(camTheta);
        camera.position.y = Math.max(8, targetLook.y + camRadius * Math.cos(camPhi));
        camera.position.z = targetLook.z + camRadius * Math.sin(camPhi) * Math.cos(camTheta);
        camera.lookAt(targetLook);
      }

      scene.add(new THREE.AmbientLight(0xf6f4ef, 0.85));
      const keyLight = new THREE.DirectionalLight(0xfff5e4, 1.35);
      keyLight.position.set(35, 65, 35);
      keyLight.castShadow = true;
      scene.add(keyLight);

      // Architectural Oxford Navy Plinth & Fine Bronze CAD Grid
      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(110, 74),
        new THREE.MeshStandardMaterial({ color: 0x0d1b2a, roughness: 0.9, metalness: 0.1 })
      );
      ground.rotation.x = -Math.PI / 2;
      ground.receiveShadow = true;
      scene.add(ground);

      const grid = new THREE.GridHelper(104, 34, 0x8f6e3e, 0x1a2e45);
      grid.position.y = 0.05;
      scene.add(grid);

      // Holy Ganga Channel
      const river = new THREE.Mesh(
        new THREE.BoxGeometry(108, 0.25, 7.5),
        new THREE.MeshStandardMaterial({ color: 0x16425b, roughness: 0.35, metalness: 0.4 })
      );
      river.position.set(0, 0.15, -26);
      scene.add(river);

      // Primary Collector Roads & Forest Park Spine
      const roadMat = new THREE.MeshStandardMaterial({ color: 0x243447, roughness: 0.85 });
      const ewRoad = new THREE.Mesh(new THREE.BoxGeometry(92, 0.16, 4.2), roadMat);
      ewRoad.position.set(0, 0.1, 2);
      scene.add(ewRoad);

      const nsRoad = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.16, 50), roadMat);
      nsRoad.position.set(-14, 0.1, 0);
      scene.add(nsRoad);

      const park = new THREE.Mesh(
        new THREE.BoxGeometry(10, 0.26, 8),
        new THREE.MeshStandardMaterial({ color: 0x1a4731, roughness: 0.85 })
      );
      park.position.set(-4, 0.14, 2);
      scene.add(park);

      const interactiveMeshes = [];
      const zoneNodes = {};

      MIRZAPUR_PLOTS.forEach(function (plot) {
        const g = new THREE.Group();
        g.position.set(plot.pos3d.x, 0, plot.pos3d.z);

        const padMat = new THREE.MeshStandardMaterial({
          color: 0x182b3e,
          emissive: 0x8f6e3e,
          emissiveIntensity: 0.08,
          roughness: 0.55,
          metalness: 0.25
        });
        const pad = new THREE.Mesh(new THREE.BoxGeometry(plot.pos3d.w, 0.65, plot.pos3d.d), padMat);
        pad.position.y = 0.32;
        pad.userData.plotId = plot.id;
        g.add(pad);
        interactiveMeshes.push(pad);

        const cols = 3, rows = 2;
        const subW = (plot.pos3d.w - 2.4) / cols;
        const subD = (plot.pos3d.d - 2.4) / rows;
        const parcelBlocks = [];

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const bx = -plot.pos3d.w / 2 + 1.2 + subW / 2 + c * subW;
            const bz = -plot.pos3d.d / 2 + 1.2 + subD / 2 + r * subD;
            const bh = plot.pos3d.h * (0.72 + ((r + c) % 2) * 0.28);

            const bMat = new THREE.MeshStandardMaterial({
              color: 0xeae5db,
              emissive: 0x8f6e3e,
              emissiveIntensity: 0.05,
              roughness: 0.5,
              metalness: 0.15
            });
            const block = new THREE.Mesh(new THREE.BoxGeometry(subW * 0.84, bh, subD * 0.82), bMat);
            block.position.set(bx, 0.65 + bh / 2, bz);
            block.userData.plotId = plot.id;
            g.add(block);
            interactiveMeshes.push(block);
            parcelBlocks.push(block);

            const wire = new THREE.LineSegments(
              new THREE.EdgesGeometry(block.geometry),
              new THREE.LineBasicMaterial({ color: 0xb4915a, transparent: true, opacity: 0.65 })
            );
            wire.position.copy(block.position);
            g.add(wire);
          }
        }

        const beacon = new THREE.Mesh(
          new THREE.CylinderGeometry(0.16, 0.16, 8.5, 12),
          new THREE.MeshBasicMaterial({ color: 0xd6ba88, transparent: true, opacity: 0.0 })
        );
        beacon.position.y = 5.8;
        g.add(beacon);

        scene.add(g);
        zoneNodes[plot.id] = { group: g, pad: pad, blocks: parcelBlocks, beacon: beacon, plot: plot };
      });

      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();
      let dragging = false, dragMoved = 0, prevX = 0, prevY = 0;

      renderer.domElement.addEventListener('pointerdown', function (e) {
        dragging = true; dragMoved = 0; prevX = e.clientX; prevY = e.clientY;
        renderer.domElement.style.cursor = 'grabbing';
      });
      window.addEventListener('pointerup', function (e) {
        if (!dragging) return;
        dragging = false; renderer.domElement.style.cursor = 'grab';
        if (dragMoved < 6) {
          const rect = renderer.domElement.getBoundingClientRect();
          pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
          raycaster.setFromCamera(pointer, camera);
          const hits = raycaster.intersectObjects(interactiveMeshes, false);
          if (hits.length > 0 && hits[0].object.userData.plotId) {
            selectZone(hits[0].object.userData.plotId);
          }
        }
      });
      renderer.domElement.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        const dx = e.clientX - prevX, dy = e.clientY - prevY;
        dragMoved += Math.abs(dx) + Math.abs(dy);
        camTheta -= dx * 0.008;
        camPhi = Math.max(0.32, Math.min(1.18, camPhi - dy * 0.006));
        prevX = e.clientX; prevY = e.clientY;
      });

      const zoomInBtn = rootEl.querySelector('#mzp3dZoomIn');
      const zoomOutBtn = rootEl.querySelector('#mzp3dZoomOut');
      const resetBtn = rootEl.querySelector('#mzp3dReset');
      const pauseBtn = rootEl.querySelector('#mzp3dPause');

      if (zoomInBtn) zoomInBtn.addEventListener('click', function () { camRadius = Math.max(32, camRadius - 8); });
      if (zoomOutBtn) zoomOutBtn.addEventListener('click', function () { camRadius = Math.min(92, camRadius + 8); });
      if (resetBtn) resetBtn.addEventListener('click', function () {
        camTheta = -0.58; camPhi = 0.72; camRadius = 66; desiredLook.set(0, 1, 0);
      });
      if (pauseBtn) {
        pauseBtn.textContent = orbitPaused ? 'Play Orbit' : 'Pause Orbit';
        pauseBtn.setAttribute('aria-pressed', String(orbitPaused));
        pauseBtn.addEventListener('click', function () {
          orbitPaused = !orbitPaused;
          pauseBtn.textContent = orbitPaused ? 'Play Orbit' : 'Pause Orbit';
          pauseBtn.setAttribute('aria-pressed', String(orbitPaused));
        });
      }

      sceneController = {
        focusZone: function (id) {
          const zNode = zoneNodes[id];
          if (!zNode) return;
          desiredLook.set(zNode.plot.pos3d.x * 0.45, 1.5, zNode.plot.pos3d.z * 0.45);
          Object.keys(zoneNodes).forEach(function (key) {
            const active = key === id;
            const node = zoneNodes[key];
            node.pad.material.emissiveIntensity = active ? 0.55 : 0.08;
            node.beacon.material.opacity = active ? 0.72 : 0.0;
            node.blocks.forEach(function (blk) {
              blk.material.emissiveIntensity = active ? 0.48 : 0.04;
            });
          });
        }
      };

      sceneController.focusZone(selectedId);

      function onResize() {
        const nw = canvasHost.clientWidth, nh = canvasHost.clientHeight;
        if (nw > 0 && nh > 0) {
          camera.aspect = nw / nh;
          camera.updateProjectionMatrix();
          renderer.setSize(nw, nh);
        }
      }
      window.addEventListener('resize', onResize);

      function animate() {
        requestAnimationFrame(animate);
        if (!dragging && !orbitPaused) camTheta += 0.0014;
        targetLook.lerp(desiredLook, 0.08);
        updateCamera();
        renderer.render(scene, camera);
      }
      animate();
    }

    renderCards();
    renderInspector(selectedId);
    renderIsoFallback();
    loadThreeLib(initWebGLMasterplan);
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.mzp3d-root').forEach(createPlotExperience);
  });
})();
