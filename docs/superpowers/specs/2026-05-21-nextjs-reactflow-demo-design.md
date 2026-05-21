# Next.js ReactFlow Demo — Design Spec

**Date:** 2026-05-21  
**Status:** Approved

## Goal

Scaffold a minimal Next.js 15 (App Router, TypeScript) project that demonstrates `@xyflow/react` with a basic interactive canvas.

## Architecture

```
canvas/
├── app/
│   ├── layout.tsx         # root layout — full-height body
│   ├── page.tsx           # 'use client' ReactFlow canvas
│   └── globals.css        # minimal CSS (html/body 100vh, main 100%)
├── package.json
├── tsconfig.json
└── next.config.ts
```

## Component Design

### `app/layout.tsx`
- Standard Next.js root layout
- Sets `html` and `body` to `height: 100%` via `globals.css`

### `app/page.tsx`
- `'use client'` directive (required — ReactFlow uses browser APIs)
- Imports `ReactFlow`, `MiniMap`, `Controls`, `Background`, `useNodesState`, `useEdgesState`, `addEdge` from `@xyflow/react`
- Imports `@xyflow/react/dist/style.css`
- Hardcoded initial nodes (3 nodes) and edges (2 edges) inline
- `useCallback` on `onConnect` to add edges
- Returns `<main>` wrapping `<ReactFlow>` with `fitView`

## Data

Initial nodes (inline in `page.tsx`):
- Node 1: position (0, 0), label "Node 1"
- Node 2: position (200, 100), label "Node 2"
- Node 3: position (0, 200), label "Node 3"

Initial edges:
- Edge 1→2
- Edge 1→3

## Styling

Plain CSS in `globals.css`:
```css
html, body { height: 100%; margin: 0; }
main { width: 100%; height: 100vh; }
```

No Tailwind — keeps dependencies minimal for a demo.

## Dependencies

- `next` (latest)
- `react`, `react-dom`
- `@xyflow/react`
- TypeScript + `@types/react`, `@types/node`

## Success Criteria

- `npm run dev` starts without errors
- ReactFlow canvas renders full-screen at `localhost:3000`
- Nodes are draggable
- New edges can be created by dragging between node handles
- MiniMap, Controls, and Background are visible
