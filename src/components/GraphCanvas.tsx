import { useRef, useCallback, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import type { ForceGraphMethods, NodeObject } from 'react-force-graph-2d';
import type { GraphData, GraphNode } from '../hooks/useNexusGraph';

interface GraphCanvasProps {
  data: GraphData;
  activeNodeId: string | null;
  onNodeClick: (id: string) => void;
}

export const GraphCanvas = ({ data, activeNodeId, onNodeClick }: GraphCanvasProps) => {
  const fgRef = useRef<ForceGraphMethods | undefined>(undefined);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle resize
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleNodeClick = useCallback((node: NodeObject) => {
    const gn = node as GraphNode;
    if (gn.id) {
      onNodeClick(gn.id.replace('phantom-', ''));
    }
  }, [onNodeClick]);

  const paintNode = useCallback((node: NodeObject, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const gn = node as GraphNode & { x: number, y: number };
    const label = gn.name;
    const isPhantom = gn.id.startsWith('phantom-');
    const isActive = gn.id.replace('phantom-', '') === activeNodeId || gn.id === activeNodeId;
    
    const nodeRadius = isPhantom ? 3 : 6;
    const fontSize = isPhantom ? 4 : 5;
    const color = isActive ? '#00f0ff' : (isPhantom ? '#475569' : '#bd00ff');

    // Draw Glow
    if (isActive) {
      ctx.beginPath();
      ctx.arc(gn.x, gn.y, nodeRadius * 2.5, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'rgba(0, 240, 255, 0.2)';
      ctx.fill();
    }

    // Draw Node
    ctx.beginPath();
    ctx.arc(gn.x, gn.y, nodeRadius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = isActive ? '#fff' : 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Draw Label
    if (globalScale > 1.5 || isActive) {
      ctx.font = `${isActive ? 'bold' : 'normal'} ${fontSize}px Inter, Sans-Serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = isActive ? '#fff' : (isPhantom ? '#94a3b8' : '#e2e8f0');
      ctx.fillText(label, gn.x, gn.y + nodeRadius + fontSize);
    }
  }, [activeNodeId]);

  return (
    <div ref={containerRef} className="graph-container h-full w-full animate-fade-in" style={{ zIndex: 1 }}>
      {dimensions.width > 0 && (
        <ForceGraph2D
          ref={fgRef as any}
          width={dimensions.width}
          height={dimensions.height}
          graphData={data}
          nodeCanvasObject={paintNode}
          linkColor={() => '#45a29e'}
          linkWidth={() => 1}
          linkDirectionalParticles={2}
          linkDirectionalParticleSpeed={0.005}
          linkDirectionalParticleWidth={2}
          onNodeClick={handleNodeClick}
          d3AlphaDecay={0.02}
          d3VelocityDecay={0.1}
          backgroundColor="#050510" // var(--bg-primary)
        />
      )}
      
      {/* Overlay Title */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '2rem',
        pointerEvents: 'none',
        opacity: 0.3
      }}>
        <h1 style={{ fontSize: '4rem', margin: 0, color: 'white', letterSpacing: '-0.05em' }}>NEXUS</h1>
        <p style={{ margin: 0, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent-cyan)' }}>Local Graph Network</p>
      </div>
    </div>
  );
};
