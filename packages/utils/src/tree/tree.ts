interface TreeNodeConf {
    id: string;
    children: string;
    parentId: string;
}

const DEFAULT_TREE_NODE_CONF: TreeNodeConf = {
    id: "id",
    children: "children",
    parentId: "parentId"
}

const getTreeNodeConf = (conf = {}) => {
    return Object.assign({}, DEFAULT_TREE_NODE_CONF, conf || {});
}

export function BFSTraversal<T>(root: T | T[], callback: (node: T) => void, conf?: Partial<TreeNodeConf>) {
    const nodeConf = getTreeNodeConf(conf);
    const queue: T[] = Array.isArray(root) ? [...root] : [root];

    while (queue.length > 0) {
        const node = queue.shift();

        if (!node) {
            continue;
        }

        callback(node);

        const children = node?.[nodeConf.children];
        if (children) {
            queue.push(...children);
        }
    }
}

export function DFSTraversal<T>(root: T | T[], callback: (node: T) => void, conf?: Partial<TreeNodeConf>) {

    const nodeConf = getTreeNodeConf(conf);
    const treeData: T[] = Array.isArray(root) ? [...root] : [root];

    treeData.forEach(node => {
        callback(node);

        if (node?.[nodeConf.children]) {
            DFSTraversal(node[nodeConf.children], callback, conf);
        }
    })
}

export function treeToListByBFS<T>(root: T | T[], conf?: Partial<TreeNodeConf>): T[] {
    const result: T[] = [];
    BFSTraversal(root, node => result.push(node), conf);
    return result;
}

export function treeToListByDFS<T>(root: T | T[], conf?: Partial<TreeNodeConf>): T[] {
    const result: T[] = [];
    DFSTraversal(root, node => result.push(node), conf);
    return result;
}

export function findTreeNode<T>(root: T | T[], callback: (node: T) => boolean, conf?: Partial<TreeNodeConf>): T | undefined {
    const nodeConf = getTreeNodeConf(conf);
    const treeData = Array.isArray(root) ? [...root] : [root];
    for (let node of treeData) {
        if (callback(node)) return node;
        if (node?.[nodeConf.children]) {
            treeData.push(...node[nodeConf.children]);
        }
    }

    return undefined;
}

export function findTreeNodeById<T>(root: T | T[], id: any, conf?: Partial<TreeNodeConf>): T | undefined {
    const nodeConf = getTreeNodeConf(conf);

    return findTreeNode(root, node => node?.[nodeConf.id] === id, nodeConf)
}

export function findAllTreeNode<T>(root: T | T[], callback: (node: T) => boolean, conf?: Partial<TreeNodeConf>): T[] {
    const result: T[] = [];
    BFSTraversal(root, node => {
        if (callback(node)) result.push(node);
    }, conf);
    return result;
}

export function findAllTreeNodePath<T>(tree: T[],
                                       predicate: (node: T) => boolean,
                                       keepSubTree = false, conf?: Partial<TreeNodeConf>): T[] {
    const nodeConf = getTreeNodeConf(conf);

    const filterHandler = keepSubTree ? filterWithSubTree : filterWithoutSubTree;

    function filter(nodes: T[] | undefined): T[] | undefined {
        if (!nodes?.length) {
            return nodes;
        }
        return nodes.filter(filterHandler);
    }

    function filterWithSubTree(it: T): boolean {
        if (predicate(it)) {
            return true;
        }

        if (it?.[nodeConf.children])
            it[nodeConf.children] = filter(it[nodeConf.children]);
        return !!it[nodeConf.children]?.length;
    }

    function filterWithoutSubTree(it: T): boolean {
        const children = filter(it?.[nodeConf.children] || []);
        if (predicate(it) || children?.length) {
            it[nodeConf.children] = children;
            return true
        }

        return false;
    }

    if (Array.isArray(tree)) {
        return filter(tree) ?? [];
    } else {
        return filter([tree]) ?? [];
    }
}