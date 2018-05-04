import { _getClassifyTree,_getClassifyList2zTree} from 'src/vuex/api/goodsClassifyAPI'

/**
 * 获取商品分类树
 * @return {[type]} [description]
 */
export const getClassifyTree=()=>{
	return _getClassifyList2zTree({}).then((data) => Promise.resolve(data));
}

/**
 * 获取运营商下商品分类列表
 * @return {[type]} [Json]
 */
export const getClassifyList2zTree=(params)=>{
	let p=params||{}
  return _getClassifyList2zTree(p).then((data) => Promise.resolve(data));
}

/**
 * 获取运营商下商品分类列表 checkBox使用 只有子节点显示复选框
 * @return {[type]} [Json]
 */
export const getClassifyList2zTree2=(params)=>{
  return _getClassifyList2zTree(params).then((data) =>{
		if(data.length==0)return Promise.resolve(data)
		data.forEach(function(item){
			if(item.childNumber>0){
				item.nocheck=true
				item.open=true
			}
		})
		return Promise.resolve(data)
	});
}
