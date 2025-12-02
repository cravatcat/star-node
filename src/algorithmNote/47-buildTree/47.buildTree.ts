export class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
  }
}

export function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  const map = new Map<number, number>();
  
  // Map inorder values to their indices for O(1) access
  for (let i = 0; i < inorder.length; i++) {
    map.set(inorder[i], i);
  }
  
  return build(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1, map);
}

function build(
  preorder: number[], 
  preStart: number, 
  preEnd: number, 
  inorder: number[], 
  inStart: number, 
  inEnd: number, 
  map: Map<number, number>
): TreeNode | null {
  if (preStart > preEnd || inStart > inEnd) {
    return null;
  }

  // The first element in preorder is the root
  const rootVal = preorder[preStart];
  const root = new TreeNode(rootVal);
  
  // Find root position in inorder
  const inRoot = map.get(rootVal)!;
  const numsLeft = inRoot - inStart;

  // Recursively build left and right subtrees
  root.left = build(
    preorder, 
    preStart + 1, 
    preStart + numsLeft, 
    inorder, 
    inStart, 
    inRoot - 1, 
    map
  );
  
  root.right = build(
    preorder, 
    preStart + numsLeft + 1, 
    preEnd, 
    inorder, 
    inRoot + 1, 
    inEnd, 
    map
  );

  return root;
}
