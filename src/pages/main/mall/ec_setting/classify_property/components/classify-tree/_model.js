export default [
  {
    cid: 0,
    parentId: 0,
    level: 0,
    checked: 0,
    name: "默认分类",
  },
  {
    cid: 1,
    parentId: 0,
    level: 0,
    checked: 0,
    name: "蔬果",
    children: [
      {
        cid: 10,
        parentId: 1,
        level: 1,
        checked: 0,
        name: "蔬菜",
        children: [
          {
            cid: 100,
            parentId: 10,
            level: 2,
            checked: 0,
            name: "叶菜类",
            children: [
              {
                cid: 1000,
                parentId: 100,
                level: 3,
                checked: 0,
                name: "叶菜类-1",
              },
              {
                cid: 1001,
                parentId: 100,
                level: 3,
                checked: 0,
                name: "叶菜类-2",
              },
              {
                cid: 1002,
                parentId: 100,
                level: 3,
                checked: 0,
                name: "叶菜类-3",
              }
            ]
          },
          {
            cid: 101,
            parentId: 10,
            level: 2,
            checked: 0,
            name: "果实类"
          },
          {
            cid: 102,
            parentId: 10,
            level: 2,
            checked: 0,
            name: "根茎类"
          },
          {
            cid: 103,
            parentId: 10,
            level: 2,
            checked: 0,
            name: "菌菇类"
          },
        ],
      },
      {
        cid: 11,
        parentId: 1,
        level: 1,
        checked: 0,
        name: "水果",
        children: [
          {
            cid: 200,
            parentId: 11,
            level: 2,
            checked: 0,
            name: "柑橘类"
          },
          {
            cid: 201,
            parentId: 11,
            level: 2,
            checked: 0,
            name: "实果类"
          },
          {
            cid: 202,
            parentId: 11,
            level: 2,
            checked: 0,
            name: "浆果类"
          },
        ],
      },
      {
        cid: 12,
        parentId: 1,
        level: 1,
        checked: 0,
        name: "专柜",
        children: [],
      }
    ],
  },
  {
    cid: 2,
    parentId: 0,
    level: 0,
    checked: 0,
    name: "蛋类",
    children: [
      {
        cid: 20,
        parentId: 2,
        level: 2,
        checked: 0,
        name: "鲜蛋",
      },
      {
        cid: 21,
        parentId: 2,
        level: 1,
        checked: 0,
        name: "加工蛋",
      },
      {
        cid: 22,
        level: 1,
        checked: 0,
        parentId: 2,
        name: "精选蛋",
      },
    ],
  },
  {
    cid: 3,
    parentId: 0,
    level: 0,
    checked: 0,
    name: "电子产品",
    children: [
      {
        cid: 30,
        parentId: 3,
        level: 1,
        checked: 0,
        name: "手机",
        children: [
          {
            cid: 300,
            parentId: 30,
            level: 2,
            checked: 0,
            name: "苹果",
          },
          {
            cid: 301,
            parentId: 30,
            level: 2,
            checked: 0,
            name: "三星",
          },
          {
            cid: 302,
            parentId: 30,
            level: 2,
            checked: 0,
            name: "小米",
          },
        ],
      },
      {
        cid: 31,
        parentId: 3,
        level: 1,
        checked: 0,
        name: "电脑",
        children: [
          {
            cid: 310,
            level: 2,
            checked: 0,
            name: "苹果",
          },
          {
            cid: 311,
            level: 2,
            checked: 0,
            name: "联想",
          },
        ]
      },
    ],
  },
]
