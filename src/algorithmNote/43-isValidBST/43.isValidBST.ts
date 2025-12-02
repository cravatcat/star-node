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

export function isValidBST(root: TreeNode | null): boolean {
  return validate(root, -Infinity, Infinity);
}

function validate(node: TreeNode | null, min: number, max: number): boolean {
  if (!node) {
    return true;
  }

  if (node.val <= min || node.val >= max) {
    return false;
  }

  return validate(node.left, min, node.val) && validate(node.right, node.val, max);
}
