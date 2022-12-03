/**
 * @description 创建层级关系
 * @param tree 树
 * @param pathList 每一项的id组成的数组
 * @returns 创建层级关系后的树
 */
export const buildHierarchyTree = (tree: any[], pathList = []): any => {
	if (!Array.isArray(tree)) {
		console.warn('tree must be an array')
		return []
	}
	if (!tree || tree.length === 0) return []
	for (const iterator of tree.entries()) {
		const [key, node] = iterator
		node.id = key
		node.parentId = pathList.length ? pathList[pathList.length - 1] : null
		node.pathList = [...pathList, node.id]

		// 处理子树
		if (node.children) {
			buildHierarchyTree(node.children, node.pathList)
		}
	}
	return tree
}
