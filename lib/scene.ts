import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const PAPER   = 0xebe5db;
const ACCENT  = 0xd65a1f;
const CREAM   = 0xf5efe3;
const SAGE    = 0x9aa68a;
const TERRA   = 0xb46742;

interface StageOpts {
  background?:       number;
  autoRotate?:       boolean;
  autoRotateSpeed?:  number;
  enableZoom?:       boolean;
  enablePan?:        boolean;
  cameraDistance?:   number;
  cameraHeight?:     number;
  minPolar?:         number;
  maxPolar?:         number;
  shadows?:          boolean;
}

export class Stage {
  canvas:   HTMLCanvasElement;
  opts:     Required<StageOpts>;
  scene:    THREE.Scene;
  camera:   THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  private ro: ResizeObserver;
  private rafId: number = 0;

  constructor(canvas: HTMLCanvasElement, opts: StageOpts = {}) {
    this.canvas = canvas;
    this.opts = {
      background:      PAPER,
      autoRotate:      true,
      autoRotateSpeed: 0.6,
      enableZoom:      false,
      enablePan:       false,
      cameraDistance:  5,
      cameraHeight:    1.4,
      minPolar:        0.3,
      maxPolar:        Math.PI - 0.3,
      shadows:         true,
      ...opts,
    };

    const w = canvas.clientWidth  || 600;
    const h = canvas.clientHeight || 600;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.opts.background);

    this.camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
    this.camera.position.set(
      this.opts.cameraDistance * 0.9,
      this.opts.cameraHeight,
      this.opts.cameraDistance
    );

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(w, h, false);
    this.renderer.shadowMap.enabled = this.opts.shadows;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;

    this._setupLights();
    this._setupGround();
    this.controls = this._setupControls();

    this.ro = new ResizeObserver(() => this._resize());
    this.ro.observe(canvas);

    canvas.addEventListener("pointerdown", () => {
      this.controls.autoRotate = false;
    });

    const animate = () => {
      this.rafId = requestAnimationFrame(animate);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }

  private _setupLights() {
    const ambient = new THREE.HemisphereLight(0xffffff, 0xd9c9a8, 0.45);
    this.scene.add(ambient);

    const key = new THREE.DirectionalLight(0xfff2dc, 2.3);
    key.position.set(4, 8, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far  = 25;
    key.shadow.camera.left   = -6;
    key.shadow.camera.right  = 6;
    key.shadow.camera.top    = 6;
    key.shadow.camera.bottom = -6;
    key.shadow.bias = -0.0005;
    key.shadow.radius = 6;
    this.scene.add(key);

    const rim  = new THREE.DirectionalLight(0xffd2a0, 0.6);
    rim.position.set(-4, 3, -3);
    this.scene.add(rim);

    const fill = new THREE.DirectionalLight(0xc2d4e8, 0.3);
    fill.position.set(-3, 2, 4);
    this.scene.add(fill);
  }

  private _setupGround() {
    const geo  = new THREE.CircleGeometry(20, 64);
    const mat  = new THREE.ShadowMaterial({ opacity: 0.18 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
  }

  private _setupControls(): OrbitControls {
    const controls = new OrbitControls(this.camera, this.canvas);
    controls.enableDamping    = true;
    controls.dampingFactor    = 0.07;
    controls.enablePan        = this.opts.enablePan;
    controls.enableZoom       = this.opts.enableZoom;
    controls.autoRotate       = this.opts.autoRotate;
    controls.autoRotateSpeed  = this.opts.autoRotateSpeed;
    controls.minPolarAngle    = this.opts.minPolar;
    controls.maxPolarAngle    = this.opts.maxPolar;
    controls.target.set(0, this.opts.cameraHeight * 0.55, 0);
    controls.update();
    return controls;
  }

  private _resize() {
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    if (w === 0 || h === 0) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
  }

  add(obj: THREE.Object3D) {
    this.scene.add(obj);
    return obj;
  }

  dispose() {
    cancelAnimationFrame(this.rafId);
    this.ro.disconnect();
    this.controls.dispose();
    this.renderer.dispose();
  }
}

// ── Material helpers ──────────────────────────────────────────────────────────
function matt(color: number, roughness = 0.7) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.05 });
}
function metallic(color: number, roughness = 0.35) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.85 });
}
function ceramic(color: number) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.25, metalness: 0.0 });
}

function applyShadows(obj: THREE.Object3D) {
  obj.traverse((o) => {
    if ((o as THREE.Mesh).isMesh) {
      (o as THREE.Mesh).castShadow    = true;
      (o as THREE.Mesh).receiveShadow = true;
    }
  });
}

// ── Models ────────────────────────────────────────────────────────────────────

export function buildMonolith(): THREE.Group {
  const g = new THREE.Group();

  const base = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.35, 0.18, 64), matt(0x2a2723, 0.55));
  base.position.y = 0.09;
  g.add(base);

  const mid = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.95, 1.5, 64), ceramic(CREAM));
  mid.position.y = 0.93;
  g.add(mid);

  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.78, 0.06, 16, 80), metallic(0xc7a36a, 0.3));
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 1.23;
  g.add(ring);

  const cone = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.7, 0.9, 64), matt(ACCENT, 0.5));
  cone.position.y = 2.13;
  g.add(cone);

  const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.18, 48, 32), metallic(0xe8d5a8, 0.25));
  sphere.position.y = 2.76;
  g.add(sphere);

  applyShadows(g);
  return g;
}

export function buildChair(): THREE.Group {
  const g = new THREE.Group();

  const seat = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.22, 1.3), matt(TERRA, 0.85));
  seat.position.set(0, 0.78, 0);
  g.add(seat);

  const back = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.0, 0.18), matt(TERRA, 0.85));
  back.position.set(0, 1.4, -0.56);
  back.rotation.x = -0.15;
  g.add(back);

  const backCushion = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.7, 0.12), matt(CREAM, 0.95));
  backCushion.position.set(0, 1.45, -0.45);
  backCushion.rotation.x = -0.15;
  g.add(backCushion);

  const topCushion = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.16, 1.15), matt(CREAM, 0.95));
  topCushion.position.set(0, 0.93, 0.05);
  g.add(topCushion);

  for (const x of [-0.78, 0.78]) {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.6, 1.2), matt(TERRA, 0.85));
    arm.position.set(x, 1.05, 0);
    g.add(arm);
  }

  const legMat = metallic(0x4a3a2a, 0.6);
  const legGeo = new THREE.CylinderGeometry(0.04, 0.025, 0.7, 16);
  for (const [x, z] of [[-0.55, -0.5], [0.55, -0.5], [-0.55, 0.5], [0.55, 0.5]]) {
    const leg = new THREE.Mesh(legGeo, legMat);
    leg.position.set(x, 0.35, z);
    g.add(leg);
  }

  g.position.y = -0.4;
  applyShadows(g);
  return g;
}

export function buildLamp(): THREE.Group {
  const g = new THREE.Group();

  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.55, 0.12, 48), metallic(0x2a2723, 0.4));
  base.position.y = 0.06;
  g.add(base);

  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.6, 24), metallic(0x3a3530, 0.3));
  post.position.set(0, 0.92, 0);
  g.add(post);

  const arc = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.04, 16, 60, Math.PI * 0.55), metallic(0x3a3530, 0.3));
  arc.position.set(0, 1.72, 0);
  arc.rotation.set(Math.PI / 2, 0, Math.PI * 0.55);
  g.add(arc);

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.24, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: 0xf2e2c4, roughness: 0.4, metalness: 0.0, side: THREE.DoubleSide })
  );
  head.position.set(0.93, 1.4, 0);
  head.rotation.x = Math.PI;
  g.add(head);

  const bulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 24, 16),
    new THREE.MeshStandardMaterial({ color: 0xfff2c0, emissive: 0xffd27a, emissiveIntensity: 1.4, roughness: 0.1 })
  );
  bulb.position.set(0.93, 1.2, 0);
  g.add(bulb);

  const pl = new THREE.PointLight(0xffd27a, 1.2, 4, 1.5);
  pl.position.copy(bulb.position);
  g.add(pl);

  g.position.y = -0.4;
  applyShadows(g);
  return g;
}

export function buildVase(): THREE.Group {
  const g = new THREE.Group();
  const profile: [number, number][] = [
    [0.40, 0.00], [0.55, 0.10], [0.62, 0.30], [0.55, 0.55],
    [0.42, 0.80], [0.38, 1.05], [0.45, 1.30], [0.55, 1.55],
    [0.42, 1.75], [0.30, 1.85], [0.32, 1.90],
  ];
  const pts = profile.map(([x, y]) => new THREE.Vector2(x, y));
  const vase = new THREE.Mesh(new THREE.LatheGeometry(pts, 80), ceramic(0xe8dcc4));
  g.add(vase);

  const branch = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.025, 1.3, 8), matt(0x6b4a2a, 0.7));
  branch.position.set(0.08, 2.4, 0);
  branch.rotation.z = -0.12;
  g.add(branch);

  for (let i = 0; i < 5; i++) {
    const leaf = new THREE.Mesh(
      new THREE.SphereGeometry(0.06 + Math.random() * 0.05, 16, 12),
      matt(SAGE, 0.7)
    );
    const t = 0.3 + i * 0.18;
    leaf.position.set(0.08 + Math.sin(i * 1.3) * 0.18, 2.0 + t, Math.cos(i * 1.3) * 0.18);
    g.add(leaf);
  }

  g.position.y = -0.4;
  applyShadows(g);
  return g;
}

export function buildSpeaker(): THREE.Group {
  const g = new THREE.Group();

  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 1.2, 64), matt(0x2a2723, 0.55));
  body.position.y = 0.6;
  g.add(body);

  for (const y of [0.05, 1.15]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.04, 16, 80), metallic(0xc7a36a, 0.3));
    ring.rotation.x = Math.PI / 2;
    ring.position.y = y;
    g.add(ring);
  }

  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.05, 64), matt(0x3a3530, 0.5));
  cap.position.y = 1.225;
  g.add(cap);

  const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.06, 48), metallic(0xc7a36a, 0.2));
  knob.position.y = 1.28;
  g.add(knob);

  for (let i = 0; i < 36; i++) {
    const a = (i / 36) * Math.PI * 2;
    const slat = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.0, 0.005), matt(0x1a1815, 0.8));
    slat.position.set(Math.cos(a) * 0.605, 0.6, Math.sin(a) * 0.605);
    slat.lookAt(0, 0.6, 0);
    g.add(slat);
  }

  const led = new THREE.Mesh(
    new THREE.SphereGeometry(0.015, 12, 8),
    new THREE.MeshStandardMaterial({ color: 0xff6b2c, emissive: 0xd65a1f, emissiveIntensity: 1.5 })
  );
  led.position.set(0, 0.95, 0.61);
  g.add(led);

  g.position.y = -0.5;
  applyShadows(g);
  return g;
}

export function buildStool(): THREE.Group {
  const g = new THREE.Group();

  const seat = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.5, 0.45, 64), matt(0xc69566, 0.85));
  seat.position.y = 0.95;
  g.add(seat);

  const dimple = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.05, 64), matt(0xa67847, 0.85));
  dimple.position.y = 1.16;
  g.add(dimple);

  const legMat = matt(0x2a1f17, 0.7);
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.025, 0.95, 14), legMat);
    leg.position.set(Math.cos(a) * 0.35, 0.48, Math.sin(a) * 0.35);
    leg.rotation.z = Math.cos(a) * 0.1;
    leg.rotation.x = Math.sin(a) * 0.1;
    g.add(leg);
  }

  g.position.y = -0.4;
  applyShadows(g);
  return g;
}

export function buildKettle(): THREE.Group {
  const g = new THREE.Group();

  const profile: [number, number][] = [
    [0.00, 0.00], [0.55, 0.00], [0.62, 0.10], [0.58, 0.45],
    [0.40, 0.62], [0.20, 0.70], [0.18, 0.78], [0.20, 0.82],
  ];
  const pts = profile.map(([x, y]) => new THREE.Vector2(x, y));
  const body = new THREE.Mesh(new THREE.LatheGeometry(pts, 64), metallic(0xd9b475, 0.18));
  g.add(body);

  const lid = new THREE.Mesh(
    new THREE.SphereGeometry(0.13, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2),
    metallic(0xd9b475, 0.18)
  );
  lid.position.y = 0.78;
  g.add(lid);

  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.04, 16, 12), matt(0x1a1815, 0.4));
  knob.position.y = 0.93;
  g.add(knob);

  const spout = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.04, 0.4, 24), metallic(0xd9b475, 0.18));
  spout.position.set(0.5, 0.6, 0);
  spout.rotation.z = -0.6;
  g.add(spout);

  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.025, 12, 32, Math.PI), matt(0x1a1815, 0.5));
  handle.position.set(0, 0.95, 0);
  g.add(handle);

  const wrap = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.045, 12, 16, Math.PI * 0.6), matt(0x6b4a2a, 0.7));
  wrap.position.set(0, 0.95, 0);
  wrap.rotation.z = 0.2;
  g.add(wrap);

  g.position.y = -0.4;
  g.scale.setScalar(1.35);
  applyShadows(g);
  return g;
}

export function buildBust(): THREE.Group {
  const g = new THREE.Group();
  const skinMat = matt(0xeed0aa, 0.55);

  const plinth = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.3, 1.0), matt(0xebe5db, 0.7));
  plinth.position.y = 0.15;
  g.add(plinth);

  const shoulders = new THREE.Mesh(
    new THREE.SphereGeometry(0.65, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2),
    matt(0x3a3a32, 0.85)
  );
  shoulders.scale.set(1.1, 0.55, 0.85);
  shoulders.position.y = 0.30;
  g.add(shoulders);

  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.04, 12, 32), matt(0x2a2a24, 0.85));
  collar.rotation.x = Math.PI / 2;
  collar.position.y = 0.58;
  collar.scale.set(1, 1, 0.6);
  g.add(collar);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.20, 0.32, 28), matt(0xeed0aa, 0.7));
  neck.position.y = 0.68;
  g.add(neck);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.42, 64, 48), skinMat);
  head.scale.set(1, 1.18, 0.97);
  head.position.y = 1.16;
  g.add(head);

  const chin = new THREE.Mesh(new THREE.SphereGeometry(0.16, 24, 16), skinMat);
  chin.scale.set(1.2, 0.6, 0.7);
  chin.position.set(0, 0.85, 0.18);
  g.add(chin);

  // Hair colours
  const hairColors = [0xddb966, 0xc9a04f, 0xeac989];
  const hairMats = hairColors.map((c) => matt(c, 0.85));

  function strand(
    points: [number, number, number][],
    radius: number,
    taper = true,
    matIdx = 0
  ): THREE.Group {
    const sg = new THREE.Group();
    const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
    const geo = new THREE.TubeGeometry(curve, 14, radius, 6, false);
    const mesh = new THREE.Mesh(geo, hairMats[matIdx % hairMats.length]);
    sg.add(mesh);
    if (taper) {
      const last = points[points.length - 1];
      const prev = points[points.length - 2];
      const dir = new THREE.Vector3(last[0] - prev[0], last[1] - prev[1], last[2] - prev[2]).normalize();
      const tip = new THREE.Mesh(
        new THREE.ConeGeometry(radius * 1.1, radius * 4, 6),
        hairMats[matIdx % hairMats.length]
      );
      tip.position.set(last[0] + dir.x * radius, last[1] + dir.y * radius, last[2] + dir.z * radius);
      tip.lookAt(last[0] + dir.x * 2, last[1] + dir.y * 2, last[2] + dir.z * 2);
      tip.rotateX(Math.PI / 2);
      sg.add(tip);
    }
    return sg;
  }

  // Crown tufts
  const topY = 1.46, topRadius = 0.4, crownCount = 38;
  for (let i = 0; i < crownCount; i++) {
    const a = (i / crownCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.15;
    const r = topRadius * (0.85 + Math.random() * 0.15);
    const bx = Math.cos(a) * r * 0.55, bz = Math.sin(a) * r * 0.55, by = topY + (Math.random() - 0.4) * 0.04;
    const len = 0.12 + Math.random() * 0.1;
    const dx = Math.cos(a) * 0.35 + (Math.random() - 0.5) * 0.2;
    const dz = Math.sin(a) * 0.35 + (Math.random() - 0.5) * 0.2;
    const dy = 0.7 + Math.random() * 0.4;
    g.add(strand([[bx, by - 0.04, bz], [bx + dx * len * 0.5, by + dy * len * 0.5, bz + dz * len * 0.5], [bx + dx * len, by + dy * len, bz + dz * len]], 0.016 + Math.random() * 0.004, true, i % 3));
  }
  for (let i = 0; i < 60; i++) {
    const a = Math.random() * Math.PI * 2, r = topRadius * (0.6 + Math.random() * 0.4);
    const bx = Math.cos(a) * r * 0.5, bz = Math.sin(a) * r * 0.5, by = topY - 0.04 + Math.random() * 0.06;
    const len = 0.05 + Math.random() * 0.06;
    g.add(strand([[bx, by - 0.03, bz], [bx, by + len * 0.6, bz], [bx + (Math.random() - 0.5) * 0.04, by + len, bz + (Math.random() - 0.5) * 0.04]], 0.022, false, i % 3));
  }

  // Fringe
  for (let i = 0; i < 14; i++) {
    const t = i / 13, x = (t - 0.5) * 0.5;
    const sy = 1.50, ey = 1.30 - Math.abs(t - 0.55) * 0.08;
    const sz = 0.32 + Math.random() * 0.02, ez = 0.42 + Math.random() * 0.03;
    g.add(strand([[x, sy + 0.02, sz - 0.05], [x + (Math.random() - 0.5) * 0.04, (sy + ey) / 2 + 0.04, (sz + ez) / 2], [x + (Math.random() - 0.5) * 0.05, ey, ez]], 0.018 + Math.random() * 0.004, true, i % 3));
  }

  // Side hair
  for (const sx of [-1, 1] as const) {
    for (let i = 0; i < 14; i++) {
      const angle = (i / 13) * Math.PI - Math.PI / 2;
      const bx = sx * (0.43 * Math.cos(angle) * 0.8), by = 1.35 + Math.sin(angle) * 0.2, bz = -0.1;
      const ex = bx + sx * 0.05, ey = by - 0.18 + Math.random() * 0.04, ez = bz + (Math.random() - 0.5) * 0.04;
      g.add(strand([[bx, by, bz], [(bx + ex) / 2, (by + ey) / 2, (bz + ez) / 2], [ex, ey, ez]], 0.018 + Math.random() * 0.003, true, i % 3));
    }
  }

  // Mullet
  for (let i = 0; i < 26; i++) {
    const t = i / 25, x = (t - 0.5) * 0.55 + (Math.random() - 0.5) * 0.04;
    const by = 1.40 + Math.random() * 0.06, bz = -0.32 - Math.random() * 0.03;
    const len = 0.45 + Math.random() * 0.18, ey = by - len, ez = bz - 0.08 + Math.random() * 0.04;
    g.add(strand([[x, by + 0.04, bz + 0.04], [x, by - len * 0.25, bz - 0.02], [x * 1.05, by - len * 0.55, bz - 0.04], [x * 1.1, ey, ez]], 0.018 + Math.random() * 0.005, true, i % 3));
  }
  for (let i = 0; i < 30; i++) {
    const a = Math.PI + (Math.random() - 0.5) * Math.PI;
    const bx = Math.cos(a) * 0.32 * 0.7, bz = Math.sin(a) * 0.32 * 0.7, by = 1.32 + Math.random() * 0.16;
    const len = 0.18 + Math.random() * 0.12;
    g.add(strand([[bx, by, bz - 0.02], [bx + (Math.random() - 0.5) * 0.02, by - len * 0.5, bz - 0.04], [bx + (Math.random() - 0.5) * 0.03, by - len, bz - 0.05]], 0.018, true, i % 3));
  }

  // Eyes
  const eyeWhiteMat = new THREE.MeshStandardMaterial({ color: 0xfff8f0, roughness: 0.3 });
  const irisMat     = new THREE.MeshStandardMaterial({ color: 0x3a7fc4, roughness: 0.12 });
  const pupilMat    = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.2 });
  for (const ex of [-0.13, 0.13]) {
    const lid = new THREE.Mesh(new THREE.SphereGeometry(0.078, 24, 16), matt(0xd9b894, 0.7));
    lid.scale.set(1.15, 0.5, 0.55); lid.position.set(ex, 1.20, 0.39); g.add(lid);
    const white = new THREE.Mesh(new THREE.SphereGeometry(0.055, 24, 16), eyeWhiteMat);
    white.scale.set(1.1, 0.7, 0.6); white.position.set(ex, 1.20, 0.415); g.add(white);
    const iris = new THREE.Mesh(new THREE.SphereGeometry(0.03, 18, 14), irisMat);
    iris.position.set(ex, 1.20, 0.455); g.add(iris);
    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.012, 12, 8), pupilMat);
    pupil.position.set(ex, 1.20, 0.471); g.add(pupil);
    const hl = new THREE.Mesh(
      new THREE.SphereGeometry(0.0075, 8, 8),
      new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.7 })
    );
    hl.position.set(ex + 0.009, 1.214, 0.477); g.add(hl);
    for (let j = 0; j < 5; j++) {
      const bt = j / 4, bx = ex + (bt - 0.5) * 0.11 * (ex > 0 ? 1 : -1);
      g.add(strand([[bx, 1.275 + (bt - 0.5) * 0.012, 0.385], [bx, 1.28, 0.40]], 0.0095, false, 1));
    }
  }

  // Nose
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.06, 24, 18), skinMat);
  nose.scale.set(0.7, 1.5, 1); nose.position.set(0, 1.075, 0.44); g.add(nose);
  const noseTip = new THREE.Mesh(new THREE.SphereGeometry(0.045, 18, 14), matt(0xe8c89e, 0.55));
  noseTip.position.set(0, 1.025, 0.475); g.add(noseTip);
  for (const sx of [-1, 1] as const) {
    const nostril = new THREE.Mesh(new THREE.SphereGeometry(0.011, 8, 8), matt(0x6a4830, 0.6));
    nostril.position.set(sx * 0.024, 0.998, 0.484); g.add(nostril);
  }

  // Smile
  const lipMat = matt(0xb56757, 0.45);
  const smileL = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.014, 12, 28, Math.PI * 0.45), lipMat);
  smileL.position.set(0, 0.99, 0.435); smileL.rotation.z = Math.PI; g.add(smileL);
  const smileR = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.014, 12, 28, Math.PI * 0.45), lipMat);
  smileR.position.set(0, 0.99, 0.435); smileR.rotation.set(Math.PI, Math.PI, 0); g.add(smileR);
  const upperLip = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.008, 8, 24, Math.PI * 0.95), matt(0xc9876f, 0.5));
  upperLip.position.set(0, 1.005, 0.44); g.add(upperLip);
  for (const sx of [-1, 1] as const) {
    const cheek = new THREE.Mesh(new THREE.SphereGeometry(0.09, 20, 16), matt(0xeec6a4, 0.65));
    cheek.scale.set(1, 0.7, 0.5); cheek.position.set(sx * 0.23, 1.035, 0.39); g.add(cheek);
  }

  // Ears
  for (const sx of [-1, 1] as const) {
    const ear = new THREE.Mesh(new THREE.SphereGeometry(0.075, 18, 14), matt(0xe5c294, 0.62));
    ear.scale.set(0.5, 1.1, 1); ear.position.set(sx * 0.43, 1.16, 0); g.add(ear);
    const innerEar = new THREE.Mesh(new THREE.SphereGeometry(0.04, 14, 10), matt(0xb88860, 0.7));
    innerEar.scale.set(0.3, 0.9, 0.6); innerEar.position.set(sx * 0.44, 1.16, 0.015); g.add(innerEar);
  }

  g.position.y = -0.4;
  applyShadows(g);
  return g;
}

export type ModelName = "monolith" | "chair" | "lamp" | "vase" | "speaker" | "stool" | "kettle" | "bust";

export const builders: Record<ModelName, () => THREE.Group> = {
  monolith: buildMonolith,
  chair:    buildChair,
  lamp:     buildLamp,
  vase:     buildVase,
  speaker:  buildSpeaker,
  stool:    buildStool,
  kettle:   buildKettle,
  bust:     buildBust,
};
