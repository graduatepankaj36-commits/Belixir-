import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// Pre-allocated math helpers outside animation loop (zero GC)
const _dummy = new THREE.Object3D();
const _color = new THREE.Color();

function createParticleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.28, 'rgba(216, 180, 254, 0.85)');
    grad.addColorStop(0.65, 'rgba(56, 189, 248, 0.25)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createExtrudedPrismRing(innerR: number, outerR: number, depth: number): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outerR, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, innerR, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.035,
    bevelSegments: 3,
    curveSegments: 64,
  });
  geo.center();
  return geo;
}

export function ThreeHeroCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isSoftwareGl = (() => {
      try {
        const probeCanvas = document.createElement('canvas');
        const gl = probeCanvas.getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param) || '');
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06060a);
    scene.fog = new THREE.FogExp2(0x06060a, 0.055);

    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 100);
    camera.position.set(0, 0.25, 10.5);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = false;
    container.appendChild(renderer.domElement);

    // Studio environment map for crisp metallic and crystalline highlights
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    roomEnv.dispose();
    pmremGenerator.dispose();

    // 3-point studio lighting rig + warm/cool contrast
    const hemiLight = new THREE.HemisphereLight(0x93c5fd, 0x1e1b4b, 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xe0e7ff, 2.4);
    keyLight.position.set(6, 7, 8);
    scene.add(keyLight);

    const violetRim = new THREE.PointLight(0x8b5cf6, 18, 22, 1.4);
    violetRim.position.set(-4.5, 2.2, 3.5);
    scene.add(violetRim);

    const blueRim = new THREE.PointLight(0x38bdf8, 16, 22, 1.4);
    blueRim.position.set(4.8, -2.0, 3.8);
    scene.add(blueRim);

    // Disposables registry
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const textures: THREE.Texture[] = [];

    // Composite architectural 3D hero sculpture (placed right of center on desktop)
    const sculptureGroup = new THREE.Group();
    const updateSculptureAnchor = (w: number) => {
      if (w >= 1024) {
        sculptureGroup.position.set(2.35, 0.1, 0);
        sculptureGroup.scale.setScalar(1.0);
      } else {
        sculptureGroup.position.set(0, 0.5, -1.2);
        sculptureGroup.scale.setScalar(0.78);
      }
    };
    updateSculptureAnchor(width);
    scene.add(sculptureGroup);

    // Part 1: Core faceted obsidian crystal prism
    const coreGeo = new THREE.IcosahedronGeometry(1.18, 0);
    geometries.push(coreGeo);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f1020,
      metalness: 0.35,
      roughness: 0.14,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      iridescence: 0.65,
      iridescenceIOR: 1.38,
      emissive: 0x2e1065,
      emissiveIntensity: 0.35,
    });
    materials.push(coreMat);
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    sculptureGroup.add(coreMesh);

    // Part 2: Precision wireframe lattice shell around core
    const cageGeo = new THREE.IcosahedronGeometry(1.44, 1);
    geometries.push(cageGeo);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: 0.24,
    });
    materials.push(cageMat);
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    sculptureGroup.add(cageMesh);

    // Part 3: Primary beveled titanium gyroscope ring
    const outerRingGeo = createExtrudedPrismRing(2.15, 2.34, 0.14);
    geometries.push(outerRingGeo);
    const outerRingMat = new THREE.MeshStandardMaterial({
      color: 0x27273a,
      metalness: 0.94,
      roughness: 0.22,
    });
    materials.push(outerRingMat);
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.set(Math.PI * 0.28, Math.PI * 0.14, 0);
    sculptureGroup.add(outerRing);

    // Part 4: Electric purple inner orbital collar
    const midRingGeo = new THREE.TorusGeometry(1.82, 0.045, 20, 96);
    geometries.push(midRingGeo);
    const midRingMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      metalness: 0.65,
      roughness: 0.28,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.95,
    });
    materials.push(midRingMat);
    const midRing = new THREE.Mesh(midRingGeo, midRingMat);
    midRing.rotation.set(-Math.PI * 0.32, Math.PI * 0.22, 0);
    sculptureGroup.add(midRing);

    // Part 5: Neon blue sweeping outer vector arc
    const blueRingGeo = new THREE.TorusGeometry(2.72, 0.028, 16, 100);
    geometries.push(blueRingGeo);
    const blueRingMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.5,
      roughness: 0.35,
      emissive: 0x2563eb,
      emissiveIntensity: 1.15,
    });
    materials.push(blueRingMat);
    const blueRing = new THREE.Mesh(blueRingGeo, blueRingMat);
    blueRing.rotation.set(Math.PI * 0.42, -Math.PI * 0.18, 0.2);
    sculptureGroup.add(blueRing);

    // Part 6: Collar bracket accents on outer gyroscope
    const bracketGeo = new THREE.BoxGeometry(0.14, 0.32, 0.28);
    geometries.push(bracketGeo);
    const bracketMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.96,
      roughness: 0.18,
    });
    materials.push(bracketMat);
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const bracket = new THREE.Mesh(bracketGeo, bracketMat);
      bracket.position.set(Math.cos(angle) * 2.25, Math.sin(angle) * 2.25, 0);
      bracket.rotation.z = angle;
      outerRing.add(bracket);
    }

    // Part 7: Instanced floating digital nodes orbiting the core
    const NODE_COUNT = 32;
    const nodeGeo = new THREE.OctahedronGeometry(0.085, 0);
    geometries.push(nodeGeo);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.75,
      roughness: 0.2,
      emissive: 0x4f46e5,
      emissiveIntensity: 0.6,
    });
    materials.push(nodeMat);
    const instancedNodes = new THREE.InstancedMesh(nodeGeo, nodeMat, NODE_COUNT);
    instancedNodes.frustumCulled = false;

    const nodeOrbits: {
      radius: number;
      speed: number;
      phase: number;
      tiltX: number;
      tiltZ: number;
      scale: number;
    }[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      const radius = 2.0 + (i % 6) * 0.38;
      const speed = (i % 2 === 0 ? 1 : -1) * (0.18 + (i % 5) * 0.05);
      const phase = (i / NODE_COUNT) * Math.PI * 2;
      const tiltX = ((i % 7) - 3) * 0.24;
      const tiltZ = ((i % 5) - 2) * 0.28;
      const scale = 0.65 + (i % 4) * 0.28;
      nodeOrbits.push({ radius, speed, phase, tiltX, tiltZ, scale });

      _color.setHex(i % 2 === 0 ? 0xa78bfa : 0x38bdf8);
      instancedNodes.setColorAt(i, _color);
    }
    if (instancedNodes.instanceColor) instancedNodes.instanceColor.needsUpdate = true;
    sculptureGroup.add(instancedNodes);

    // Part 8: Atmospheric glowing particle field
    const PARTICLE_COUNT = 420;
    const particlePositions = new Float32Array(PARTICLE_COUNT * 3);
    const particleColors = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      particlePositions[idx] = (Math.random() - 0.5) * 22;
      particlePositions[idx + 1] = (Math.random() - 0.5) * 14;
      particlePositions[idx + 2] = (Math.random() - 0.5) * 14 - 2;

      const c = i % 3 === 0 ? 0x8b5cf6 : i % 3 === 1 ? 0x38bdf8 : 0xc4b5fd;
      _color.setHex(c);
      particleColors[idx] = _color.r;
      particleColors[idx + 1] = _color.g;
      particleColors[idx + 2] = _color.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    geometries.push(particleGeo);

    const particleTex = createParticleTexture();
    textures.push(particleTex);

    const particleMat = new THREE.PointsMaterial({
      size: 0.14,
      map: particleTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.78,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    materials.push(particleMat);

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Part 9: Subtle architectural perspective grid floor
    const gridHelper = new THREE.GridHelper(32, 32, 0x4c1d95, 0x171726);
    gridHelper.position.set(0, -3.6, -2);
    const gridMat = gridHelper.material as THREE.Material;
    gridMat.transparent = true;
    gridMat.opacity = 0.25;
    scene.add(gridHelper);

    // Pre-warm shaders when hardware WebGL is active
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Pointer + scroll tracking (no React state re-renders)
    let targetPointerX = 0;
    let targetPointerY = 0;
    let currentPointerX = 0;
    let currentPointerY = 0;
    let scrollRatio = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      targetPointerX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetPointerY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const onScroll = () => {
      scrollRatio = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    const onResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
      updateSculptureAnchor(w);
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let frameId = 0;
    let disposed = false;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || typeof gl.fenceSync !== 'function') {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) {
          if (sync) gl.deleteSync(sync);
          return;
        }
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function updateScene(elapsed: number, delta: number) {
      // Smooth exponential damping for mouse parallax
      currentPointerX = THREE.MathUtils.damp(currentPointerX, targetPointerX, 4.5, delta);
      currentPointerY = THREE.MathUtils.damp(currentPointerY, targetPointerY, 4.5, delta);

      camera.position.x = THREE.MathUtils.damp(camera.position.x, currentPointerX * 0.65, 3.5, delta);
      camera.position.y = THREE.MathUtils.damp(
        camera.position.y,
        0.25 + currentPointerY * 0.4 - scrollRatio * 1.1,
        3.5,
        delta,
      );
      camera.lookAt(0.6, -scrollRatio * 0.5, 0);

      if (!prefersReducedMotion) {
        coreMesh.rotation.y = elapsed * 0.24;
        coreMesh.rotation.x = Math.sin(elapsed * 0.35) * 0.22;

        cageMesh.rotation.y = -elapsed * 0.16;
        cageMesh.rotation.z = elapsed * 0.12;

        outerRing.rotation.z = elapsed * 0.18;
        outerRing.rotation.x = Math.PI * 0.28 + Math.sin(elapsed * 0.4) * 0.12;

        midRing.rotation.y = -elapsed * 0.28;
        midRing.rotation.x = -Math.PI * 0.32 + Math.cos(elapsed * 0.32) * 0.15;

        blueRing.rotation.z = -elapsed * 0.22;
        blueRing.rotation.y = -Math.PI * 0.18 + Math.sin(elapsed * 0.25) * 0.18;

        particles.rotation.y = elapsed * 0.025 + currentPointerX * 0.08;
        particles.rotation.x = currentPointerY * 0.04;
      }

      // Update instanced orbiting digital nodes
      const animT = prefersReducedMotion ? 0 : elapsed;
      for (let i = 0; i < NODE_COUNT; i++) {
        const orbit = nodeOrbits[i];
        const angle = orbit.phase + animT * orbit.speed;
        const x = Math.cos(angle) * orbit.radius;
        const z = Math.sin(angle) * orbit.radius;
        const y = Math.sin(angle * 2 + orbit.tiltX) * 0.85;

        _dummy.position.set(x, y, z);
        _dummy.rotation.set(animT * 0.7 + i, animT * 0.5, orbit.tiltZ);
        _dummy.scale.setScalar(orbit.scale);
        _dummy.updateMatrix();
        instancedNodes.setMatrixAt(i, _dummy.matrix);
      }
      instancedNodes.instanceMatrix.needsUpdate = true;
    }

    function tick() {
      if (disposed) return;
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();
      updateScene(elapsed, delta);
      renderer.render(scene, camera);

      if (prefersReducedMotion) return;
      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);

      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      gridHelper.geometry.dispose();
      if (Array.isArray(gridHelper.material)) {
        gridHelper.material.forEach((m) => m.dispose());
      } else {
        gridHelper.material.dispose();
      }
      envTarget.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
    />
  );
}
