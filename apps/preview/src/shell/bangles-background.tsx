/** @jsxImportSource react */

import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const COLORS = [0xe63946, 0x1fc8b8, 0xffc857, 0xff4d9d, 0x9b5de5, 0x3ddc84];
const RING_COUNT = 24;

export function BanglesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 14;

    scene.add(new THREE.AmbientLight(0xffffff, 1.4));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(5, 8, 10);
    scene.add(key);

    const geometry = new THREE.TorusGeometry(1, 0.16, 16, 72);
    const materials = COLORS.map(
      (color) => new THREE.MeshStandardMaterial({ color, metalness: 0.6, roughness: 0.3 })
    );
    const tweens: gsap.core.Animation[] = [];

    for (let i = 0; i < RING_COUNT; i++) {
      const ring = new THREE.Mesh(geometry, materials[i % materials.length]);
      const s = 0.5 + Math.random() * 1.3;
      // rings stay on the left and right edges so the player in the middle stays clear
      const side = i % 2 === 0 ? -1 : 1;
      ring.position.set(
        side * (7 + Math.random() * 9),
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 8 - 2
      );
      ring.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      ring.scale.setScalar(s);
      scene.add(ring);

      if (!calm) {
        tweens.push(
          gsap.from(ring.scale, { x: 0, y: 0, z: 0, duration: 1.2, delay: i * 0.04, ease: 'back.out(1.7)' }),
          gsap.to(ring.rotation, {
            x: '+=6.283',
            y: '+=6.283',
            duration: 14 + Math.random() * 12,
            repeat: -1,
            ease: 'none',
          }),
          gsap.to(ring.position, {
            y: `+=${0.5 + Math.random()}`,
            duration: 3 + Math.random() * 3,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
          })
        );
      }
    }

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      gsap.to(camera.position, { x: nx * 2, y: -ny * 1.5, duration: 1.2, ease: 'power2.out' });
    };
    if (!calm) window.addEventListener('pointermove', onMove);

    const render = () => {
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    gsap.ticker.add(render);

    return () => {
      gsap.ticker.remove(render);
      tweens.forEach((t) => t.kill());
      gsap.killTweensOf(camera.position);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      geometry.dispose();
      materials.forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 30% 20%, #3a1466 0%, #1b0a2e 55%, #0d0518 100%)',
      }}
    />
  );
}