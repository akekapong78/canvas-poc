import ExtractionNode from '@/components/canvas/nodes/ExtractionNode';
import ProductionNode from '@/components/canvas/nodes/ProductionNode';
import PackagingNode from '@/components/canvas/nodes/PackagingNode';

export const nodeTypes = {
  extraction: ExtractionNode,
  production: ProductionNode,
  packaging: PackagingNode,
  logistics: ExtractionNode,
};
