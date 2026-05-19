import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'motion/react';

// Physics Constants
const PHYSICS = {
  STIFFNESS: 0.1,
  DAMPING: 0.8,
  MASS: 1.0,
  CONNECTION_RADIUS: 250,
  ATTRACTION_STRENGTH: 0.05
};

export const EthereaStartup: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [isExploding, setIsExploding] = useState(false);
  
  useEffect(() => {
    if (!canvasRef.current) return;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    camera.position.z = 5;

    // --- CONSTELLATION ASSETS ---
    const assets: { mesh: THREE.Mesh, originalPos: THREE.Vector3, velocity: THREE.Vector3 }[] = [];
    const geometry = new THREE.IcosahedronGeometry(0.1, 0);
    const material = new THREE.MeshBasicMaterial({ color: 0xcccccc, wireframe: true });

    for (let i = 0; i < 40; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5
      );
      mesh.position.copy(pos);
      scene.add(mesh);
      assets.push({ 
        mesh, 
        originalPos: pos.clone(),
        velocity: new THREE.Vector3() 
      });
    }

    // --- MOUSE TRACKING ---
    const mouse = new THREE.Vector2(-9999, -9999);
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- LINES (CONSTELLATION STRINGS) ---
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x444444, transparent: true, opacity: 0.3 });
    const lines: THREE.Line[] = [];

    // --- ANIMATION LOOP ---
    const animate = () => {
      const frameId = requestAnimationFrame(animate);

      // Clean up old lines
      lines.forEach(line => scene.remove(line));
      lines.length = 0;

      // Update assets
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const mouseWorldPos = new THREE.Vector3();
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      raycaster.ray.intersectPlane(plane, mouseWorldPos);

      assets.forEach(asset => {
        const dist = mouseWorldPos.distanceTo(asset.mesh.position);
        
        // Elastic physics
        const force = asset.originalPos.clone().sub(asset.mesh.position).multiplyScalar(PHYSICS.STIFFNESS);
        asset.velocity.add(force).multiplyScalar(PHYSICS.DAMPING);
        
        if (dist < 3) {
          // Pull and spin interaction
          const dir = mouseWorldPos.clone().sub(asset.mesh.position).normalize();
          asset.velocity.add(dir.multiplyScalar(PHYSICS.ATTRACTION_STRENGTH / PHYSICS.MASS));
          asset.mesh.rotation.x += 0.2;
          asset.mesh.rotation.y += 0.2;

          // Drawing strings
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([mouseWorldPos, asset.mesh.position]);
          const line = new THREE.Line(lineGeometry, lineMaterial);
          scene.add(line);
          lines.push(line);
        }

        asset.mesh.position.add(asset.velocity);
      });

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    const frameId = requestAnimationFrame(animate);

    // --- GSAP ENTRANCE ---
    gsap.fromTo(textRef.current, 
      { opacity: 0, y: 50, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 2, ease: "expo.out" }
    );

    // Auto advance after 4.5 seconds for better UX/SEO
    const autoAdvanceTimer = setTimeout(() => {
      handleStart();
    }, 4500);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      clearTimeout(autoAdvanceTimer);
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 5 && !isExploding) {
        handleStart();
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      if (Math.abs(deltaY) > 10 && !isExploding) {
        handleStart();
      }
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isExploding]);

  const handleStart = () => {
    if (isExploding) return;
    setIsExploding(true);
    
    // Kaleidoscope/Explosion Transition
    gsap.to(canvasRef.current, {
      scale: 2,
      opacity: 0,
      duration: 1.5,
      rotate: 180,
      ease: "power4.inOut"
    });

    gsap.to(textRef.current, {
      scale: 4,
      opacity: 0,
      duration: 1,
      letterSpacing: "2em",
      ease: "power4.in"
    });

    setTimeout(onComplete, 1200);
  };

  return (
    <motion.div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center cursor-pointer overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
      />
      
      {/* Kaleidoscope Overlay Slices (CSS implementation for the prism feel) */}
      <div className="absolute inset-0 z-1 pointer-events-none mix-blend-difference opacity-10">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute inset-0 border-r border-zinc-200"
            style={{ 
              transform: `rotate(${i * 45}deg)`,
              transformOrigin: 'center'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center select-none" onClick={handleStart}>
        <div 
          ref={textRef}
          className="text-8xl md:text-[12rem] font-script text-zinc-900 tracking-tighter"
        >
          Etherea
        </div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2 }}
          className="text-xs uppercase tracking-[0.5em] mt-8 text-zinc-500 font-mono"
        >
          Click or Scroll to Initialize
        </motion.p>
      </div>
    </motion.div>
  );
};
