import {expect, test} from "vitest";
import {
    findAllTreeNode,
    findAllTreeNodePath,
    findTreeNode,
    findTreeNodeById,
    treeToListByBFS,
    treeToListByDFS
} from "../tree";

const tree = {
    id: 'root',
    children: [
        {id: 'child1'},
        {id: 'child2', children: [{id: 'grandChild1'}]},
        {id: 'child3'}
    ]
};

test('Test treeToListByBFS function', () => {
    const result = treeToListByBFS(tree);

    expect(result.length).toBe(5);
    expect(result[0].id).toBe('root');
    expect(result[1].id).toBe('child1');
    expect(result[2].id).toBe('child2');
    expect(result[3].id).toBe('child3');
    expect(result[4].id).toBe('grandChild1');
});

test('Test treeToListByDFS function', () => {
    const result = treeToListByDFS(tree);

    expect(result.length).toBe(5);
    expect(result[0].id).toBe('root');
    expect(result[1].id).toBe('child1');
    expect(result[2].id).toBe('child2');
    expect(result[3].id).toBe('grandChild1');
    expect(result[4].id).toBe('child3');
});

test('Test findTreeNode function', () => {
    const result = findTreeNode(tree, (node) => node.id === 'child2');

    expect(result.id).toBe("child2");
});

test('Test findTreeNodeById function', () => {
    const result = findTreeNodeById(tree, "child2");

    expect(result?.children?.[0].id).toBe("grandChild1");
});


test('Test findAllTreeNode function', () => {
    const result = findAllTreeNode(tree, (node) => node.id.includes("1"));

    expect(result[0].id).toBe("child1");
    expect(result[1].id).toBe("grandChild1");
});


const treeNodes = [
    {
        "id": 1,
        "parentId": 0,
        "label": "8WUg35y",
        "children": [
            {
                "id": 2,
                "parentId": 1,
                "label": "Pms1S5Mx",
                "children": [
                    {
                        "id": 9,
                        "parentId": 2,
                        "label": "glcR5yGx"
                    }
                ]
            },
            {
                "id": 3,
                "parentId": 1,
                "label": "RUTKSF"
            },
            {
                "id": 4,
                "parentId": 1,
                "label": "IYkxXlhmU12x",
                "children": [
                    {
                        "id": 5,
                        "parentId": 4,
                        "label": "p2Luabg9mK2",
                        "children": [
                            {
                                "id": 13,
                                "parentId": 5,
                                "label": "LbpWq",
                                "children": [
                                    {
                                        "id": 18,
                                        "parentId": 13,
                                        "label": "03X6e4UT"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": 7,
                "parentId": 1,
                "label": "yluJgpnqKthR",
                "children": [
                    {
                        "id": 12,
                        "parentId": 7,
                        "label": "5W6vy0EuvOjN"
                    },
                    {
                        "id": 19,
                        "parentId": 7,
                        "label": "LTJTeF",
                        "children": [
                            {
                                "id": 20,
                                "parentId": 19,
                                "label": "3rqUqE3MLShh"
                            }
                        ]
                    }
                ]
            },
            {
                "id": 11,
                "parentId": 1,
                "label": "r7ClxBCQS6"
            }
        ]
    },
    {
        "id": 6,
        "parentId": 0,
        "label": "P6mtcgfCD",
        "children": [
            {
                "id": 8,
                "parentId": 6,
                "label": "m6o5UsytQ0",
                "children": [
                    {
                        "id": 15,
                        "parentId": 8,
                        "label": "R2PmAh1"
                    }
                ]
            },
            {
                "id": 14,
                "parentId": 6,
                "label": "ysYwG8EFLAu1a"
            }
        ]
    },
    {
        "id": 10,
        "parentId": 0,
        "label": "lhDGTNeeSxLNJ",
        "children": [
            {
                "id": 16,
                "parentId": 10,
                "label": "RKuQs4ki65wo"
            },
            {
                "id": 17,
                "parentId": 10,
                "label": "YN88ixWO1PY7f4"
            }
        ]
    }
]

test('Test findAllTreeNodePath function', () => {
    const result = findAllTreeNodePath(treeNodes, (node) => node.id % 4 === 0,true);

    console.log((JSON.stringify(result)))
});
