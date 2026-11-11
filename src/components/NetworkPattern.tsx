/**
 * Motif de marque : un réseau de nœuds reliés, repris du logo DIGIT & TALENT.
 * Purement décoratif, à placer en absolu dans une section sombre.
 * Avec `animated`, les liens se tracent, les nœuds apparaissent puis le réseau ondule et pulse.
 */
const NODES: [number, number][] = [
  [40, 60], [150, 30], [260, 90], [380, 40], [470, 120],
  [90, 170], [210, 200], [330, 180], [440, 240], [30, 290],
  [140, 320], [270, 300], [390, 350], [480, 330], [200, 420],
  [320, 450], [60, 440], [440, 450],
];

const LINKS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [1, 6], [2, 6], [2, 7], [3, 7],
  [4, 8], [7, 8], [5, 6], [6, 7], [5, 9], [9, 10], [6, 10], [6, 11], [7, 11],
  [7, 12], [8, 12], [8, 13], [12, 13], [10, 11], [11, 12], [10, 14], [11, 14],
  [11, 15], [12, 15], [14, 15], [9, 16], [10, 16], [16, 14], [13, 17], [15, 17],
];

// Nœuds mis en avant en orange (ils pulsent quand le motif est animé)
const ACCENTS = [7, 14];

export function NetworkPattern({ className = "", animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg
      viewBox="0 0 520 490"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none select-none ${animated ? "network-animated" : ""} ${className}`}
    >
      <g className="network-drift">
        <g stroke="currentColor" strokeWidth="1" strokeOpacity="0.55">
          {LINKS.map(([a, b], i) => (
            <line
              key={`${a}-${b}`}
              x1={NODES[a][0]}
              y1={NODES[a][1]}
              x2={NODES[b][0]}
              y2={NODES[b][1]}
              pathLength={1}
              style={animated ? { animationDelay: `${i * 45}ms` } : undefined}
            />
          ))}
        </g>
        <g fill="currentColor">
          {NODES.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 5 : 3} style={animated ? { animationDelay: `${200 + i * 60}ms` } : undefined} />
          ))}
        </g>
        <g fill="var(--orange)">
          {ACCENTS.map((n, i) => (
            <g key={n}>
              {animated && (
                <circle
                  className="node-ping"
                  cx={NODES[n][0]}
                  cy={NODES[n][1]}
                  r={5}
                  style={{ animationDelay: `${1600 + i * 900}ms` }}
                />
              )}
              <circle cx={NODES[n][0]} cy={NODES[n][1]} r={i === 0 ? 6 : 4} style={animated ? { animationDelay: `${1200 + i * 200}ms` } : undefined} />
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}
