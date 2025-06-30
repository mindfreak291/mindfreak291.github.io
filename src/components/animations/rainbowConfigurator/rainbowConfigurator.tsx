import React, { useState, useEffect, useRef } from 'react';
import styles from './RainbowConfigurator.module.css';

interface RainbowConfig {
  density: number;
  rows: number;
  operation: 'modern' | 'classic';
  edges: 'round' | 'square';
  showConfigurator: boolean;
}

interface RainbowSegment {
  id: string;
  x: number;
  y: number;
  hue: number;
  row: number;
  index: number;
  delay: number;
  mouseDistance: number;
  isHovered: boolean;
}

const InteractiveRainbow: React.FC = () => {
  const [config, setConfig] = useState<RainbowConfig>({
    density: 50,
    rows: 12,
    operation: 'modern',
    edges: 'round',
    showConfigurator: false
  });

  const [segments, setSegments] = useState<RainbowSegment[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [colorShift, setColorShift] = useState(0);
  const rainbowRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  // Generate rainbow segments
  useEffect(() => {
    const generateSegments = () => {
      const newSegments: RainbowSegment[] = [];
      const totalSegments = config.density;
      const totalRows = config.rows;

      for (let row = 0; row < totalRows; row++) {
        for (let i = 0; i < totalSegments; i++) {
          const angle = (i / totalSegments) * 180;
          const hue = (i / totalSegments) * 360;
          const radius = 200 + row * 15;

          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = -Math.sin((angle * Math.PI) / 180) * radius;

          const randomOffset =
            config.operation === 'modern'
              ? { x: (Math.random() - 0.5) * 10, y: (Math.random() - 0.5) * 10 }
              : { x: 0, y: 0 };

          newSegments.push({
            id: `${row}-${i}`,
            x: x + randomOffset.x,
            y: y + randomOffset.y,
            hue,
            row,
            index: i,
            delay: row * 0.1 + i * 0.01,
            mouseDistance: 1000,
            isHovered: false
          });
        }
      }

      setSegments(newSegments);
    };

    generateSegments();
  }, [config.density, config.rows, config.operation]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!rainbowRef.current) return;

      const rect = rainbowRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      if (isHovering) {
        setSegments((prev) =>
          prev.map((segment) => {
            const distance = Math.sqrt(
              Math.pow(segment.x - mouseX, 2) + Math.pow(segment.y - mouseY, 2)
            );

            return {
              ...segment,
              mouseDistance: distance,
              isHovered: distance < 80
            };
          })
        );
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isHovering]);

  // Color animation
  useEffect(() => {
    if (isHovering) {
      const animate = () => {
        setColorShift((prev) => (prev + 1) % 360);
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setColorShift(0);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovering]);

  const randomizeRainbow = () => {
    setConfig((prev) => ({
      ...prev,
      density: Math.floor(Math.random() * 50) + 30,
      rows: Math.floor(Math.random() * 8) + 8,
      operation: Math.random() > 0.5 ? 'modern' : 'classic',
      edges: Math.random() > 0.5 ? 'round' : 'square'
    }));
  };

  const resetRainbow = () => {
    setConfig((prev) => ({
      ...prev,
      density: 50,
      rows: 12,
      operation: 'modern',
      edges: 'round'
    }));
  };

  const updateConfig = (updates: Partial<RainbowConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const getSegmentProps = (segment: RainbowSegment) => {
    const baseHue = (segment.hue + colorShift) % 360;
    const distance = segment.mouseDistance;

    const proximity = Math.max(0, 1 - distance / 150);
    const scale = 1 + proximity * 0.8;
    const brightness = 60 + proximity * 30;
    const saturation = 70 + proximity * 20;

    const rippleIntensity = isHovering
      ? Math.sin(Date.now() * 0.005 + distance * 0.01) * proximity * 0.5
      : 0;
    const rippleScale = scale + rippleIntensity;

    return {
      fill: `hsl(${baseHue}, ${saturation}%, ${brightness}%)`,
      transform: `scale(${Math.max(0.5, rippleScale)})`,
      opacity: Math.max(0.3, 0.7 + proximity * 0.3),
      filter: segment.isHovered ? 'drop-shadow(0 0 15px currentColor)' : 'none'
    };
  };

  return (
    <div className={styles['rainbowContainer']}>
      <div
        ref={rainbowRef}
        className={styles['rainbowDisplay']}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={randomizeRainbow}
        title="Click or hover to interact with the rainbow!"
      >
        <svg
          width="800"
          height="400"
          viewBox="-400 -300 800 400"
          className={styles['rainbowSvg']}
        >
          {segments.map((segment) => {
            const props = getSegmentProps(segment);
            return (
              <rect
                key={segment.id}
                x={segment.x - 8}
                y={segment.y - 4}
                width="16"
                height="8"
                rx={config.edges === 'round' ? '4' : '0'}
                fill={props.fill}
                opacity={props.opacity}
                style={{
                  transform: props.transform,
                  transformOrigin: 'center',
                  filter: props.filter,
                  animationDelay: `${segment.delay}s`
                }}
                className={`${styles['rainbowSegment']} ${
                  config.operation === 'modern' ? styles.modern : ''
                }`}
              />
            );
          })}
        </svg>

        <div className={styles['avatarContainer']}>
          <img
            className={styles['avatarImage']}
            src="/avatar.png"
            alt="Avatar Image"
          />
        </div>
      </div>

      <div
        className={`${styles['configuratorPanel']} ${
          config.showConfigurator ? styles.open : ''
        }`}
      >
        <div className={styles['panelHeader']}>
          <h3>Rainbow Configurator</h3>
          <button
            className={styles['closeBtn']}
            onClick={() => updateConfig({ showConfigurator: false })}
          >
            ×
          </button>
        </div>

        <div className={styles['panelContent']}>
          <div className={styles['controlGroup']}>
            <label>DENSITY</label>
            <input
              type="range"
              min="20"
              max="80"
              value={config.density}
              onChange={(e) =>
                updateConfig({ density: parseInt(e.target.value) })
              }
              className={styles.slider}
            />
          </div>

          <div className={styles['controlGroup']}>
            <label>ROWS</label>
            <input
              type="range"
              min="6"
              max="20"
              value={config.rows}
              onChange={(e) =>
                updateConfig({ rows: parseInt(e.target.value) })
              }
              className={styles.slider}
            />
          </div>

          <div className={styles['controlGroup']}>
            <label>OPERATION</label>
            <div className={styles['buttonGroup']}>
              <button
                className={
                  config.operation === 'modern' ? styles.active : ''
                }
                onClick={() => updateConfig({ operation: 'modern' })}
              >
                modern
              </button>
              <button
                className={
                  config.operation === 'classic' ? styles.active : ''
                }
                onClick={() => updateConfig({ operation: 'classic' })}
              >
                classic
              </button>
            </div>
          </div>

          <div className={styles['controlGroup']}>
            <label>EDGES</label>
            <div className={styles['buttonGroup']}>
              <button
                className={config.edges === 'round' ? styles.active : ''}
                onClick={() => updateConfig({ edges: 'round' })}
              >
                round
              </button>
              <button
                className={config.edges === 'square' ? styles.active : ''}
                onClick={() => updateConfig({ edges: 'square' })}
              >
                square
              </button>
            </div>
          </div>

          <div className={styles['panelDescription']}>
            <p>
              <strong>Interactive Rainbow:</strong> Hover and move your mouse
              around the rainbow for dynamic effects! Click anywhere on the
              rainbow to randomize it.
            </p>
            <p>Built with React, TypeScript, and mouse interaction magic.</p>
          </div>

          <div className={styles['panel-actions']}>
            <button
              className={`${styles['actionBtn']} ${styles.random}`}
              onClick={randomizeRainbow}
            >
              RANDOM
            </button>
            <button
              className={`${styles['actionBtn']} ${styles.reset}`}
              onClick={resetRainbow}
            >
              RESET
            </button>
          </div>
        </div>
      </div>

      <button
        className={styles['settingsIcon']}
        onClick={() =>
          updateConfig({ showConfigurator: !config.showConfigurator })
        }
        title="Configure Rainbow"
      >
        ⚙️
      </button>
    </div>
  );
};

export default InteractiveRainbow;