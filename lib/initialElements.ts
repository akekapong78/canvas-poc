import type { Node, Edge } from '@xyflow/react';

export const initialNodes: Node[] = [
  {
    id: '1',
    type: 'extraction',
    position: { x: 100, y: 200 },
    data: {
      label: 'Extraction',
      subtitle: 'Raw Coconut Harvest',
      outputLabel: 'RAW_01',
      outputCount: 12,
    },
  },
  {
    id: '2',
    type: 'production',
    position: { x: 420, y: 180 },
    data: {
      label: 'Production',
      subtitle: 'Pasteurization & Bottling',
      loadMetric: 82,
    },
  },
  {
    id: '3',
    type: 'packaging',
    position: { x: 740, y: 200 },
    data: {
      label: 'Packaging',
      subtitle: 'Primary & Secondary',
      units: 10000,
      kgCo2e: 0.12,
    },
  },
];

export const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
  { id: 'e2-3', source: '2', target: '3', type: 'smoothstep' },
];
