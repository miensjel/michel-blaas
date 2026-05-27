import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type { ModelName } from "@/content/home";

export type { ModelName };

// ── Colour palette ────────────────────────────────────────────────────────────
const PAPER   = 0xebe5db;
const ACCENT  = 0xd65a1f;
const CREAM   = 0xf5efe3;
const SAGE    = 0x9aa68a;
const TERRA   = 0xb46742;

// ── Stage options ─────────────────────────────────────────────────────────────
interface StageOptions {
  background?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  enableZoom?: boolean;
  enablePan?: boolean;
  cameraDistance?: number;
  cameraHeight?: number;
  minPolar?: number;
  maxPolar?: number;
  shadows?: boolean;
}

// ── Stage class ───────────────────────────────────────────────────────────────
export class Stage {
  private canvas: HTMLCanvasElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private ro: ResizeObserver;
  private rafId = 0;

  constructor(canvas: HTMLCanvasElement, opts: StageOptions = {}) {
    this.canvas = canvas;

    const o = {
      background: PAPER,
      autoRotate: true,
      autoRotateSpeed: 0.6,
      enableZoom: false,
      enablePan: false,
      cameraDistance: 5,
      cameraHeight: 1.4,
      minPolar: 0.3,
      maxPolar: Math.PI - 0.3,
      shadows: true,
      ...opts,
    };

    const w = canvas.clientWidth || 600;
    const h = canvas.clientHeight || 600;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(o.background);

    this.camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
    this.camera.position.set(o.cameraDistance * 0.9, o.cameraHeight, o.cameraDistance);

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(w, h, false);
    this.renderer.shadowMap.enabled = o.shadows;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;

    this.setupLights();
    this.setupGround();

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.07;
    this.controls.enablePan = o.enablePan;
    this.controls.enableZoom = o.enableZoom;
    this.controls.autoRotate = o.autoRotate;
    this.controls.autoRotateSpeed = o.autoRotateSpeed;
    this.controls.minPolarAngle = o.minPolar;
    this.controls.maxPolarAngle = o.maxPolar;
    this.controls.target.set(0, o.cameraHeight * 0.55, 0);
    this.controls.update();

    canvas.addEventListener("pointerdown", () => { this.controls.autoRotate = false; });

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas);

    this.animate();
  }

  private setupLights() {
    this.scene.add(new THREE.HemisphereLight(0xffffff, 0xd9c9a8, 0.45));

    const key = new THREE.DirectionalLight(0xfff2dc, 2.3);
    key.position.set(4, 8, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 25;
    key.shadow.camera.left = -6;
    key.shadow.camera.right = 6;
    key.shadow.camera.top = 6;
    key.shadow.camera.bottom = -6;
    key.shadow.bias = -0.0005;
    key.shadow.radius = 6;
    this.scene.add(key);

    const rim = new THREE.DirectionalLight(0xffd2a0, 0.6);
    rim.position.set(-4, 3, -3);
    this.scene.add(rim);

    const fill = new THREE.DirectionalLight(0xc2d4e8, 0.3);
    fill.position.set(-3, 2, 4);
    this.scene.add(fill);
  }

  private setupGround() {
    const mesh = new THREE.Mesh(
      new THREE.CircleGeometry(20, 64),
      new THREE.ShadowMaterial({ opacity: 0.18 })
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
  }

  private resize() {
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    if (!w || !h) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
  }

  add(obj: THREE.Object3D) {
    this.scene.add(obj);
    return obj;
  }

  private animate() {
    this.rafId = requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    cancelAnimationFrame(this.rafId);
    this.ro.disconnect();
    this.controls.dispose();
    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach((m) => m.dispose());
      }
    });
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
    if (o instanceof THREE.Mesh) { o.castShadow = true; o.receiveShadow = true; }
  });
}

// ── Model builders ────────────────────────────────────────────────────────────

function buildMonolith(): THREE.Group {
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

function buildChair(): THREE.Group {
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

function buildLamp(): THREE.Group {
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

function buildVase(): THREE.Group {
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

function buildSpeaker(): THREE.Group {
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

function buildStool(): THREE.Group {
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

function buildKettle(): THREE.Group {
  const g = new THREE.Group();

  const profile: [number, number][] = [
    [0.00, 0.00], [0.55, 0.00], [0.62, 0.10],
    [0.58, 0.45], [0.40, 0.62], [0.20, 0.70],
    [0.18, 0.78], [0.20, 0.82],
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

function buildBust(): THREE.Group {
  const g = new THREE.Group();

  const plinth = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.3, 1.0), matt(0xebe5db, 0.7));
  plinth.position.y = 0.15;
  g.add(plinth);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.25, 0.4, 24), matt(0xd9c4a3, 0.7));
  neck.position.y = 0.5;
  g.add(neck);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.45, 48, 48), matt(0xd9c4a3, 0.65));
  head.scale.set(1, 1.25, 1.0);
  head.position.y = 1.1;
  g.add(head);

  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 12), matt(0xc9b393, 0.65));
  nose.scale.set(0.7, 1.4, 1);
  nose.position.set(0, 1.05, 0.42);
  g.add(nose);

  g.position.y = -0.4;
  applyShadows(g);
  return g;
}

// ── Builders registry ─────────────────────────────────────────────────────────
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
