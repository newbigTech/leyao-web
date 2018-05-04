import http from 'src/lib/utils/https'

/**
 * ��ֵ���б� wbj
 * @param cardId ��ֵ�����κ�(��ѡ)
 * @param beginDaySt ��Ч����ʼ���ڷ�Χ��ʼ(��ѡ ��ʽ:yyyy-MM-dd)
 * @param beginDayEt ��Ч����ʼ���ڷ�Χ����(��ѡ ��ʽ:yyyy-MM-dd)
 * @param endDaySt ��Ч�ڽ�ֹ���ڷ�Χ��ʼ(��ѡ ��ʽ:yyyy-MM-dd)
 * @param endDayEt ��Ч�ڽ�ֹ���ڷ�Χ����(��ѡ ��ʽ:yyyy-MM-dd)
 * @param beginDay ��Ч����ʼ����(��ѡ ��ʽ:yyyy-MM-dd)
 * @param endDay ��Ч�ڽ�ֹ����(��ѡ ��ʽ:yyyy-MM-dd)
 * @param useStatus ��ֵ��ʹ�����(��ѡ  0δʹ�� 1ʹ���� 2������)
 * @param pageNo �ڼ�ҳ(����Ĭ��1)
 * @param pageSize ҳ��С(����Ĭ��20)
 * @param orderByKey �����ֶ�(��ѡ ����ֶ�)
 * @param orderByValue ����ֵ DESC/ASC(��ѡ)
 * @return {[type]}
 */
export const _getMallRechargeCardList = ({cardId,beginDaySt,beginDayEt,endDaySt,beginDay,endDay,endDayEt,useStatus,pageNo,pageSize,orderByKey,orderByValue}) => {
    return http.post('/mall/mallRechargeCardController/findMallRechargeCardList', {cardId,beginDaySt,beginDayEt,endDaySt,endDayEt,beginDay,endDay,useStatus,pageNo,pageSize,orderByKey,orderByValue});
};
/**
 * ��ֵ�����б� wbj
 * @param orderType ��������(��ѡ Ĭ�� 2��ֵ����)
 * @param asOrderType ������������(��ѡ Ĭ�� 3���Ͷ���)
 * @param orderCode ����״̬(��ѡ)
 * @param orderNo ��ֵ�����(��ѡ)
 * @param orderId ��Ӧ�������(��ѡ)
 * @param goodsName ��Ʒ����(��ѡ)
 * @param userMobile ��ֵ���ֻ���(��ѡ)
 * @param userAlias ��ֵ���û���(��ѡ)
 * @param realName ��ֵ������(��ѡ)
 * @param rechargeType  ��ֵ��ʽ(��ѡ)
 * @param createdDtmSt �µ�ʱ�䷶Χ��ʼ(��ѡ >= ��ʽ:yyyy-MM-dd HH:mm:ss)
 * @param createdDtmEt �µ�ʱ�䷶Χ����(��ѡ <= ��ʽ:yyyy-MM-dd HH:mm:ss)
 * @param pageNo �ڼ�ҳ(����Ĭ��1)
 * @param pageSize ҳ��С(����Ĭ��20)
 * @param orderByKey �����ֶ�(��ѡ ����ֶ�)
 * @param orderByValue ����ֵ DESC/ASC(��ѡ)
 * @return {[type]}
 */
export const _getMallRechargeOrderList = ({
	orderType,asOrderType,orderCode,orderNo,orderId,goodsName
	,userMobile,userAlias,realName
	,rechargeType,createdDtmSt,createdDtmEt
	,pageNo,pageSize,orderByKey,orderByValue}) => {
    return http.post('/mall/mallRechargeCardController/findMallRechargeOrderList', {
  orderType,asOrderType,orderCode,orderNo,orderId,goodsName
  ,userMobile,userAlias,realName
  ,rechargeType,createdDtmSt,createdDtmEt
  ,pageNo,pageSize,orderByKey,orderByValue});
};
/**
 * ��ֵ����ϸ�б� wbj
 * @param cardId ��ֵ�����κ�
 * @param cardItemId ��ֵ����ϸ���(��ѡ)
 * @param cardNo ����(��ѡ)
 * @param orderNo ��Ӧ����(��ѡ)
 * @param bindDtmSt ����ʱ�䷶Χ��ʼ(��ѡ ��ʽ:yyyy-MM-dd HH:mm:ss)
 * @param bindDtmEt ����ʱ�䷶Χ����(��ѡ ��ʽ:yyyy-MM-dd HH:mm:ss)
 * @param statusCode ״̬ 0 δ�� 1 �Ѱ�(��ѡ)
 * @param pageNo �ڼ�ҳ(����Ĭ��1)
 * @param pageSize ҳ��С(����Ĭ��20)
 * @param orderByKey �����ֶ�(��ѡ ����ֶ�)
 * @param orderByValue ����ֵ DESC/ASC(��ѡ)
 * @return {[type]}
 */
export const _getMallRechargeCardItemList = ({cardId,cardItemId,cardNo,orderNo,bindDtmSt,bindDtmEt,statusCode,pageNo,pageSize,orderByKey,orderByValue}) => {
    return http.post('/mall/mallRechargeCardController/findMallRechargeCardItemList', {cardId,cardItemId,cardNo,orderNo,bindDtmSt,bindDtmEt,statusCode,pageNo,pageSize,orderByKey,orderByValue});
};
/**
 * ��ҳ��ѯ����ʵ���ֵ�������б� wbj
 * @param cardItemId ��ֵ����ϸ���(��ѡ)
 * @param orderId ��Ӧ�������(��ѡ)
 * @param orderNo ��Ӧ������(��ѡ)
 * @param cardId ��ֵ�����κ�(��ѡ)
 * @param cardNo ����(��ѡ ģ��)
 * @param cardSeq �����(��ѡ)
 * @param createdDtmSt �µ�ʱ��ʱ�䷶Χ��ʼ(��ѡ>= ��ʽ:yyyy-MM-dd HH:mm:ss)
 * @param createdDtmEt �µ�ʱ��ʱ�䷶Χ����(��ѡ<= ��ʽ:yyyy-MM-dd HH:mm:ss)
 * @param statusCode ״̬ 0 ���� 1 ���׳ɹ�(��ѡ)
 * @param pageNo �ڼ�ҳ(����Ĭ��1)
 * @param pageSize ҳ��С(����Ĭ��20)
 * @param orderByKey �����ֶ�(��ѡ ����ֶ�)
 * @param orderByValue ����ֵ DESC/ASC(��ѡ)
 * @return {[type]}
 */
export const _getMallRechargeCardTradeList = ({
	 cardItemId,orderId,orderNo,cardId,cardNo
	,cardSeq,createdDtmSt,createdDtmEt,statusCode
	,pageNo,pageSize,orderByKey,orderByValue}) => {
  return http.post('/mall/mallRechargeCardController/findMallRechargeCardTradeList', {
  	 cardItemId,orderId,orderNo,cardId,cardNo
		,cardSeq,createdDtmSt,createdDtmEt,statusCode
		,pageNo,pageSize,orderByKey,orderByValue
	});
};
/**
 * ɾ����ֵ�� ֻ��ɾ��δʹ�õģ�ɾ��ʱ��ɾ��item��һ�� wbj
 * @param tradeId ��ֵ������� ���Ӣ�Ķ��Ÿ���
 * @return {[type]}
 */
export const _deleteMallRechargeCardTrade = ({tradeId}) => {
	return http.post('/mall/mallRechargeCardController/deleteMallRechargeCardTrade', {tradeId});
};
/**
 * ɾ����ֵ�� ֻ��ɾ��δʹ�õģ�ɾ��ʱ��ɾ��item��һ�� wbj
 * @param cardId ��ֵ�����κ� ���Ӣ�Ķ��Ÿ���
 * @return {[type]}
 */
export const _deleteMallRechargeCard = ({cardId}) => {
	return http.post('/mall/mallRechargeCardController/deleteMallRechargeCard', {cardId});
};

/**
 * ������ֵ�� wbj
 * @param cardNumber ����������
 * @param cardPrice ʵ�￨���
 * @param mPrice �г��۸�
 * @param beginDay ��Ч�� ��ʼ����
 * @param endDay ��Ч�� ��ֹ����
 * @return {[type]}
 */
export const _addMallRechargeCard = ({cardNumber, cardPrice, mPrice, beginDay,endDay}) => {
	return http.post('/mall/mallRechargeCardController/addMallRechargeCard', {cardNumber, cardPrice, mPrice, beginDay,endDay});
};
