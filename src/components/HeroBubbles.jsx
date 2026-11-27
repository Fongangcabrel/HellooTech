import { useEffect, useRef } from "react";

/**
 * Bulles 3D brillantes (three.js) qui flottent et réagissent à la souris.
 *
 * props
 *  - bubbles : [{ x, y, r, color }]  x / y en coordonnées normalisées (-1 → 1) du conteneur,
 *              r = rayon (unités 3D, ~0.2 à 1)
 *  - depth   : force de la parallaxe souris (plus grand = bouge plus)
 *  - style   : style du conteneur (position absolue par défaut, plein cadre)
 *
 * three.js est chargé à la demande, l'animation se met en pause hors écran
 * et respecte "prefers-reduced-motion".
 */
export default function HeroBubbles({ bubbles, depth = 0.35, style }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;
    let cleanup = () => {};

    Promise.all([
      import("three"),
      import("three/examples/jsm/environments/RoomEnvironment.js"),
    ]).then(([THREE, { RoomEnvironment }]) => {
      if (disposed) return;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      /* ---------- Scène ---------- */
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.z = 14;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      Object.assign(renderer.domElement.style, { width: "100%", height: "100%", display: "block" });
      mount.appendChild(renderer.domElement);

      // Reflets réalistes : environnement "studio" généré par three.js (aucune image externe)
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = envTex;

      const key = new THREE.DirectionalLight(0xffffff, 2.2);
      key.position.set(-4, 6, 8);
      scene.add(key, new THREE.AmbientLight(0xffffff, 0.35));

      /* ---------- Bulles ---------- */
      const geo = new THREE.SphereGeometry(1, 48, 48);
      const materials = [];
      const group = new THREE.Group();
      scene.add(group);

      const items = bubbles.map((b, i) => {
        const mat = new THREE.MeshPhysicalMaterial({
          color: b.color,
          roughness: 0.18,
          metalness: 0.2,
          clearcoat: 1,
          clearcoatRoughness: 0.08,
        });
        materials.push(mat);
        const mesh = new THREE.Mesh(geo, mat);
        mesh.scale.setScalar(b.r);
        group.add(mesh);
        return {
          mesh, b,
          phase: i * 1.7,
          speed: 0.5 + (i % 4) * 0.12,
          amp: 0.12 + (i % 3) * 0.06,
        };
      });

      // Convertit les coordonnées normalisées en coordonnées 3D visibles au plan z=0
      let halfW = 1, halfH = 1;
      const place = (t) => {
        for (const it of items) {
          it.mesh.position.set(
            it.b.x * halfW + Math.cos(t * it.speed * 0.6 + it.phase) * it.amp * 0.6,
            it.b.y * halfH + Math.sin(t * it.speed + it.phase) * it.amp,
            0
          );
        }
      };

      /* ---------- Taille ---------- */
      const resize = () => {
        const w = mount.clientWidth, h = mount.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
        halfW = halfH * camera.aspect;
        place(0);
        renderer.render(scene, camera);
      };
      const ro = new ResizeObserver(resize);
      ro.observe(mount);
      resize();

      /* ---------- Parallaxe souris ---------- */
      const mouse = { x: 0, y: 0 };
      const onMove = (e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      /* ---------- Boucle (pause hors écran) ---------- */
      const clock = new THREE.Clock();
      let raf = 0;
      let visible = true;
      const loop = () => {
        raf = requestAnimationFrame(loop);
        if (!visible) return;
        place(clock.getElapsedTime());
        group.position.x += (mouse.x * depth - group.position.x) * 0.04;
        group.position.y += (-mouse.y * depth - group.position.y) * 0.04;
        renderer.render(scene, camera);
      };
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
      io.observe(mount);
      if (!reduceMotion) loop();

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onMove);
        geo.dispose();
        materials.forEach((m) => m.dispose());
        envTex.dispose();
        pmrem.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => { disposed = true; cleanup(); };
  }, [bubbles, depth]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, pointerEvents: "none", ...style }}
    />
  );
}
