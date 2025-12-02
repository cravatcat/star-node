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

export function flatten(root: TreeNode | null): void {
  let curr = root;
  
  while (curr) {
    if (curr.left) {
      const next = curr.left;
      let predecessor = next;
      
      // Find the rightmost node in the left subtree
      while (predecessor.right) {
        predecessor = predecessor.right;
      }
      
      // Connect original right subtree to the rightmost node of left subtree
      predecessor.right = curr.right;
      
      // Move left subtree to right
      curr.left = null;
      curr.right = next;
    }
    // Move to the next node (which is now always to the right)
    curr = curr.right;
  }
}
