# Next.js ReactFlow Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a minimal Next.js 15 App Router + TypeScript project that renders an interactive ReactFlow canvas full-screen.

**Architecture:** Single `app/page.tsx` client component holds all ReactFlow state and renders the canvas. Root layout sets full-viewport height via `globals.css`. No custom nodes — uses built-in ReactFlow defaults.

**Tech Stack:** Next.js 15, React 19, TypeScript, @xyflow/react

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `package.json` | Create | Project deps |
| `tsconfig.json` | Create | TypeScript config |
| `next.config.ts` | Create | Next.js config |
| `app/globals.css` | Create | Full-viewport body/html |
| `app/layout.tsx` | Create | Root layout |
| `app/page.tsx` | Create | ReactFlow canvas (client component) |

---

### Task 1: Initialize project files

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "canvas",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@xyflow/react": "^12.0.0",
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.0.0"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create `next.config.ts`**

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {};

export default nextConfig;
```

- [ ] **Step 4: Install dependencies**

Run from project root (`/Users/ake/Downloads/canvas`):
```bash
npm install
```

Expected: `node_modules/` created, no errors.

- [ ] **Step 5: Commit**

```bash
git init
git add package.json tsconfig.json next.config.ts package-lock.json
git commit -m "chore: initialize Next.js 15 + TypeScript project"
```

---

### Task 2: Create app layout and global styles

**Files:**
- Create: `app/globals.css`
- Create: `app/layout.tsx`

- [ ] **Step 1: Create `app/globals.css`**

```css
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

main {
  width: 100%;
  height: 100vh;
}
```

- [ ] **Step 2: Create `app/layout.tsx`**

```typescript
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ReactFlow Demo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: add root layout with full-viewport styles"
```

---

### Task 3: Create ReactFlow page component

**Files:**
- Create: `app/page.tsx`

- [ ] **Step 1: Create `app/page.tsx`**

```typescript
'use client';

import { useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  type OnConnect,
  type Node,
  type Edge,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
  { id: '2', position: { x: 200, y: 100 }, data: { label: 'Node 2' } },
  { id: '3', position: { x: 0, y: 200 }, data: { label: 'Node 3' } },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
];

export default function Page() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add ReactFlow canvas page"
```

---

### Task 4: Verify dev server

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

Expected output includes:
```
▲ Next.js 15.x.x
- Local: http://localhost:3000
✓ Ready
```

- [ ] **Step 2: Open browser and verify**

Navigate to `http://localhost:3000`.

Expected:
- Full-screen ReactFlow canvas renders
- 3 nodes visible: "Node 1", "Node 2", "Node 3"
- Edges connect Node 1 → Node 2 and Node 1 → Node 3
- MiniMap visible (bottom-right)
- Controls visible (bottom-left)
- Background grid visible
- Nodes are draggable
- Can draw new edges by dragging from node handles

- [ ] **Step 3: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit final**

```bash
git add .
git commit -m "feat: Next.js ReactFlow demo complete"
```
