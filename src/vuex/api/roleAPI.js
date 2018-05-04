import http from 'src/lib/utils/https'

/**
 * 角色列表 wbj
 * @param companyId 公司编号
 * @param companyType 公司类型 0电商 1店铺(可选 传入则带出默认角色本公司的用户)
 * @param roleName 根据角色名称查询(可选)
 * @param pageNo  第几页
 * @param pageSize 页大小
 * @return {[type]}
 */
export const _getCompanyRoleList = ({companyId,companyType,roleName,pageNo,pageSize}) => {
    return http.post('/roleMng/findList', {companyId,companyType,roleName,pageNo,pageSize});
};
/**
 * 角色列表 wbj
 * @param companyId 公司编号
 * @param roleId 角色编号
 * @return {[type]}
 */
export const _deleteCompanyRole = ({companyId,roleId}) => {
	return http.post('/roleMng/deleteCompanyRole', {companyId,roleId});
};
/**
 * 角色详情 wbj
 * @param roleId 角色编号
 * @return {[type]}
 */
export const _getCompanyRoleDetail = ({roleId}) => {
	return http.post('/roleMng/getCompanyRoleDetail', {roleId});
};

/**
 * 修改角色 wbj
 * @param companyId 公司编号
 * @param roleId 角色编号
 * @return {[type]}
 */
export const _modifyCompanyRole = ({roleId, roleName, sortIndex,statusCode,companyId}) => {
	return http.post('/roleMng/modifyCompanyRole', {roleId, roleName, sortIndex,statusCode,companyId});
};
/**
 * 新增角色 wbj
 * @param companyId 公司编号
 * @param roleId 角色编号
 * @return {[type]}
 */
export const _addCompanyRole = ({companyId, roleId, roleName, sortIndex}) => {
	return http.post('/roleMng/addCompanyRole', {companyId, roleId, roleName, sortIndex});
};
/**
 * 判断角色名是否存在 wbj
 * @param companyId 公司编号
 * @param roleName 角色名称
 * @param roleId 角色编号（可选，排除这个角色）
 * @return {[type]}
 */
export const _validCompanyRole = ({companyId, roleName,roleId}) => {
	return http.post('/roleMng/validCompanyRole', {companyId, roleName,roleId});
};
/**
 * 获取总权限 wbj
 * @param companyType 公司类型 0运营商 1店铺
 * @param isTree 传入1时返回树形
 * @return {[type]}
 */
export const _getCompanyRoleMenuFull = ({companyType, isTree}) => {
	return http.post('/roleMng/getCompanyRoleMenuFull', {companyType, isTree});
};
/**
 * 获取角色权限 wbj
 * @param companyId 公司编号
 * @param roleId 角色编号
 * @return {[type]}
 */
export const _getRoleMenu = ({companyId, roleId}) => {
	return http.post('/roleMng/getRoleMenu', {companyId, roleId});
};
/**
 * 角色名是否存在 wbj
 * @param companyId 公司编号
 * @param roleId 角色编号
 * @param onlyRoleUser 是否只加载角色用户  (可选)
 * @param searchValue 手机号/用户名查询 (可选)
 * @param pageNo
 * @param pageSize
 * @return {[type]}
 */
export const _getCompRoleUserPageList = ({companyId,roleId,onlyRoleUser,searchValue,pageNo,pageSize}) => {
	return http.post('/roleMng/getCompRoleUserPageList', {companyId,roleId,onlyRoleUser,searchValue,pageNo,pageSize});
};
/**
 *角色管理-新增用户到角色表
 * @param companyId
 * @param roleId
 * @param userId
 * @return {[type]}
 */
export const _addUserIntoRole = ({companyId,roleId,userId}) => {
	return http.post('/roleMng/addUserIntoRole', {companyId,roleId,userId});
};
/**
 *角色管理-删除角色用户表
 * @param companyId
 * @param roleId
 * @param userId
 * @return {[type]}
 */
export const _deleteRoleUser = ({companyId,roleId,userId}) => {
	return http.post('/roleMng/deleteRoleUser', {companyId,roleId,userId});
};
/**
 * 设置角色权限 wbj
 * @param companyId 公司编号
 * @param roleId 角色编号
 * @param functionIDs: 功能编号|操作码集(功能拥有操作码或运算，如7=0+1+2+4)，多个英文逗号隔开，比如：1087|0,1088|7,1091|31 
 * @return {[type]}
 */
export const _setUserRoleMenu = ({companyId,roleId,functionIDs}) => {
	return http.post('/roleMng/setUserRoleMenu', {companyId,roleId,functionIDs});
};
/**
 * 获取用户的权限 wbj
 * @param userId 目标用户id
 * @param companyId目标用户所在公司id
 * @param companyType 公司类型 0 供应商 1 店铺
 * @param isTree 是否返回树形结构
 * @return {[type]}
 */
export const _getUserPermission = ({userId,companyId,companyType,isTree}) => {
	return http.post('/roleMng/getUserPermission', {userId,companyId,companyType,isTree});
};