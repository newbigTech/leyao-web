import Vue from 'vue'
import Router from 'vue-router'
import Main from 'pages/main'
import Dashboard from 'pages/main/dashboard'
import LoginPage from 'pages/login'

// 商城
import mall_index from "pages/main/mall/index.vue"
import mall_shop from "pages/main/mall/shop/shop_index.vue"
import mall_add_shop from "pages/main/mall/shop/addShop.vue"
import mall_update_shop from "pages/main/mall/shop/updateShop.vue"

import shop_file from "pages/main/mall/shop/shop_file_index.vue"

// 运营商会员设置
import ly_supplier_user_list from "pages/main/mall/supplier/ly-supplier-user-list.vue"
// 商城 基础设置
//用户管理
import mall_basic_setting_user_list from "pages/main/mall/basic_setting/userIndex.vue"
// 角色管理
import mall_basic_setting_role_list from "pages/main/mall/basic_setting/roleIndex.vue"
// 店铺 基础设置
//用户管理
import shop_basic_setting_user_list from "pages/main/mall/shop/userIndex.vue"
// 角色管理
import shop_basic_setting_role_list from "pages/main/mall/shop/roleIndex.vue"
// 已使用外部cdn,不再需要Vue.use(Router)
// Vue.use(Router)

export default new Router({
    mode: 'hash',
    linkActiveClass: 'active',
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: [
        // 主模块
        {
            name: 'Main',
            path: '/',
            component: Main,
            redirect: '/mall',
            meta: {
                auth: true
            },
            children: [

                // 商城
                {
                    path: '/mall',
                    component: mall_index,
                    name: 'mall',
                    //redirect: "/mall/shop_management",
                    children: [
                        // {
                        //   path: 'shop',
                        //   component: mall_shop
                        // },
                        {
                            path: 'addShop',
                            component: mall_add_shop
                        }, {
                            path: 'updateShop/:mallShopId',
                            component: mall_update_shop
                        }, {
                            name: 'shopClassify',
                            path: 'shopClassify',
                            component: require(
                                'pages/main/mall/shop_custom_classify'),
                            meta: {
                                auth: true
                            }
                        }, {
                            name: 'shopMallTag',
                            path: 'mall_tag',
                            component: require(
                                'pages/main/mall/shop/tag'),
                            meta: {
                                auth: true
                            }
                        }, { // 电铺sku属性管理
                            name: 'shopClassifySku',
                            path: 'shop_classify_sku',
                            component: require("pages/main/mall/shop/classify_sku"),
                            meta: {
                                auth: true
                            }
                        }, {
                            name: 'shopGoods',
                            path: 'shop_goods',
                            component: require('pages/main/mall/shop/goods'),
                            meta: {
                                auth: true
                            }
                        }, {
                            name: 'gift_goods',
                            path: 'gift_goods',
                            component: require('pages/main/mall/shop/gift'),
                            meta: {
                                auth: true
                            }
                        }, {
                            name: 'supplierOrder',
                            path: 'supplier_order',
                            component: require('pages/main/mall/supplier/order'),
                            meta: {
                                auth: true
                            }
                        }, {
                            name: 'supplierOrderList',
                            path: 'supplier_order_list',
                            component: require('pages/main/mall/supplier/order/order_list'),
                            meta: {
                                auth: true
                            }
                        }, {
                            name: 'viewSupplierOrder',
                            path: 'supplier_order_view',
                            component: require('pages/main/mall/supplier/order/order_view'),
                            meta: {
                                auth: true
                            }
                        }, {
                            name: 'shopGoodStock',
                            path: 'shop_goods_stock',
                            component: require('pages/main/mall/shop/goods_stock'),
                            // component: require.ensure(["pages/main/mall/shop/goods_stock"], function() {
                            //     require("pages/main/mall/shop/goods_stock");
                            // }),
                            meta: {
                                auth: true
                            }
                        }, {
                            name: 'supplierDaySubject',
                            path: 'supplier_day_subject',
                            component: require('pages/main/mall/supplier/day_subject'),
                            meta: {
                                auth: true
                            }
                        }, {
                            name: 'supplierDayHome',
                            path: 'supplier_day_home',
                            component: require('pages/main/mall/supplier/day_home'),
                            meta: {
                                auth: true
                            }
                        }, {
                            name: 'supplierPageNavbar',
                            path: 'supplier_page_navbar',
                            component: require('pages/main/mall/supplier/page_navbar'),
                            meta: {
                                auth: true
                            }
                        }, {
                            name: 'shopFrancoRendu',
                            path: 'shop_franco_rendu',
                            component: require('pages/main/mall/shop/franco_rendu'),
                            meta: {
                                auth: true
                            }
                        }, {
                            name: 'supplierVipPrivilege',
                            path: 'supplier_vip_privilege',
                            component: require('pages/main/mall/supplier/vip_privilege'),
                            meta: {
                                auth: true
                            }
                        }, {
                            name: 'classifyPageAd',
                            path: 'classify_page_ad',
                            component: require('pages/main/mall/supplier/classify_ad'),
                            meta: {
                                auth: true
                            }
                        }, {
                            name: 'supplierManagement',
                            path: 'supplier_management',
                            component: require('pages/main/mall/supplier/supplier_management'),
                            meta: {
                                auth: true
                            }
                        }, {
                            name: 'supplierHelp',
                            path: 'supplier_help',
                            component: require('pages/main/mall/supplier/help'),
                            meta: {
                                auth: true
                            }
                        }, {
                            name: 'shopOpenAPI',
                            path: 'mall_open_api',
                            component: require('pages/main/mall/shop/open_api'),
                            meta: {
                                auth: true
                            }
                        }, {
                            path: 'shopFile',
                            component: shop_file
                        }, {
                            name: 'shop_address',
                            path: 'shop_address',
                            component: require('pages/main/mall/shop_address')
                        }, {
                            name: 'order_manage',
                            path: 'order_manage',
                            component: require('pages/main/mall/shop/shop_order')
                            //component: require('pages/main/mall/order_manage')
                        }, {
                            name: 'shopOrderView',
                            path: 'order_manage_order_view',
                            component: require('pages/main/mall/shop/shop_order/order_view')
                            //component: require('pages/main/mall/order_manage')
                        },
                        // 基础设置
                        {
                            path: 'mall_basic_user', //列表
                            component: mall_basic_setting_user_list
                        }, {
                            path: 'mall_basic_role', //列表
                            component: mall_basic_setting_role_list
                        },
                        //店铺基础设置
                        {
                            path: 'shop_basic_user', //列表
                            component: shop_basic_setting_user_list
                        }, {
                            path: 'shop_basic_role', //列表
                            component: shop_basic_setting_role_list
                        }, {
                            path: 'shop_basic_set', //列表
                            component:  require('pages/main/mall/shop/shopIndex.vue')
                        }, {
                            path: 'shop_message_center', //消息中心
                            component:  require('pages/main/mall/message_center/shopMessageIndex.vue')
                        },
                        // 运营商会员
                        {
                            path: 'supplier_user', //列表
                            name: 'supplier_user', //列表
                            component: ly_supplier_user_list
                        },
                        //充值卡设置
                        {
                            path: 'mall_recharge_card_set',
                            component: require("pages/main/mall/recharge_set/rechargeCardIndex.vue")
                        },
                        //充值订单管理
                        {
                            path: 'mall_recharge_trade_mng',
                            component: require("pages/main/mall/recharge_set/rechargeCardTradeIndex.vue")
                        },
                        //充值规则设置
                        {
                            path: 'mall_recharge_goods_set',
                            component: require("pages/main/mall/recharge_set/rechargeGoodsIndex.vue")
                        },
                        //网销订单管理
                        {
                            path: 'mall_recharge_sale_trade_mng',
                            component: require("pages/main/mall/recharge_set/rechargeSaleCardTradeIndex.vue")
                        },
                        //网销卡设置
                        {
                            path: 'mall_recharge_sale_card_set',
                            component: require("pages/main/mall/recharge_set/rechargeSaleCardIndex.vue")
                        },
                        //专题管理
                        {
                            path: 'shop_special_activity_mng',
                            component: require("pages/main/mall/activity_mng/specialActivityIndex.vue")
                        },
                        //活动管理
                        {
                            path: 'shop_general_activity_mng',
                            component: require("pages/main/mall/activity_mng/generalActivityIndex.vue")
                        },
                        //拼团活动管理
                        {
                            path: 'shop_groupon_activity',
                            component: require("pages/main/mall/shop/groupon_activity")
                        },
                        //拼团订单
                        {
                            path: 'groupon_order',
                            component: require("pages/main/mall/shop/groupon_open")
                        },
                        // 电商设置
                        { // 商品分类设置
                            path: 'classify_management',
                            component: require("pages/main/mall/ec_setting/classify_management")
                        }, { // 分类属性管理 add by cypeng
                            path: 'classify_property',
                            component: require("pages/main/mall/ec_setting/classify_property")
                        }, { // sku属性管理 add by cypeng
                            path: 'classify_sku',
                            component: require("pages/main/mall/ec_setting/classify_sku")
                        }, { // 商品品牌管理
                            path: 'brand_management',
                            component: require("pages/main/mall/ec_setting/brand_management")
                        }, { //电商店铺管理
                            path: 'shop_management',
                            component: require("pages/main/mall/ec_setting/shop_management")
                        }, { //电商开店
                            path: 'shop_add',
                            component: require("pages/main/mall/ec_setting/shop_add")
                        },

                        { // 店铺用户管理
                            path: 'shop_user',
                            component: require(
                                "pages/main/mall/shop_user/shop-user-index.vue")
                        }, { // 店铺关注用户
                            path: 'user_enshrine_shop',
                            component: require(
                                "pages/main/mall/shop_user/user-enshrine-shop.vue")
                        }, { // 商品关注用户
                            path: 'user_enshrine_goods',
                            component: require(
                                "pages/main/mall/shop_user/user-enshrine-goods.vue")
                        }, { // 优惠券管理
                            path: 'shop_coupons',
                            component: require(
                                "pages/main/mall/coupon/shop-coupon-index.vue")
                        }, { // 评论管理
                            path: 'shop_voucher_mng',
                            component: require(
                                "pages/main/mall/shop/voucher_mng/goodsVoucherIndex.vue")
                        },

                        // 运营商资金管理 支付 xwen 2016.12.01
                        {
                            name: 'viewPayOrder',
                            path: 'view_pay_order',
                            component: require('pages/main/mall/pay/order/order_view'),
                            meta: {
                                auth: true
                            }
                        }, {   // 我的收入
                            path: 'pay/supplier/pay_account',
                            component: require(
                                "pages/main/mall/pay/supplier/pay_account")
                        },{ // 交易记录
                            name: 'transaction_supplier_record',
                            path: 'pay/supplier/transaction_record',
                            component: require(
                                "pages/main/mall/pay/supplier/transaction_record")
                        }, { // 对账单管理
                            path: 'pay/supplier/pay_bill',
                            component: require(
                                "pages/main/mall/pay/supplier/pay_bill")
                        }, { // 资金明细
                            name: 'financial_supplier_detail',
                            path: 'pay/supplier/financial_detail',
                            component: require(
                                "pages/main/mall/pay/supplier/financial_detail")
                        }, { // 提现记录
                            path: 'pay/supplier/withdraws_cash',
                            component: require(
                                "pages/main/mall/pay/supplier/withdraws_cash")
                        }, { // 收款帐号
                            path: 'pay/supplier/bank_account',
                            component: require(
                                "pages/main/mall/pay/supplier/bank_account")
                        },{ // 用户列表余额
                            path: 'pay/supplier/user_account',
                            component: require(
                                "pages/main/mall/pay/supplier/user_account")
                        },{ // 发票管理
                            path: 'pay/invoice/supplier_invoice',
                            component: require(
                                "pages/main/mall/pay/invoice/supplier_invoice")
                        },

                        // 店铺资金管理 支付 xwen 2016.12.01
                        {   // 我的收入
                            path: 'pay/shop/pay_account',
                            component: require(
                                "pages/main/mall/pay/shop/pay_account")
                        },{ // 交易记录
                            name: 'transaction_shop_record',
                            path: 'pay/shop/transaction_record',
                            component: require(
                                "pages/main/mall/pay/shop/transaction_record")
                        }, { // 对账单管理
                            path: 'pay/shop/pay_bill',
                            component: require(
                                "pages/main/mall/pay/shop/pay_bill")
                        }, { // 资金明细
                            name: 'financial_shop_detail',
                            path: 'pay/shop/financial_detail',
                            component: require(
                                "pages/main/mall/pay/shop/financial_detail")
                        }, { // 提现记录
                            path: 'pay/shop/withdraws_cash',
                            component: require(
                                "pages/main/mall/pay/shop/withdraws_cash")
                        }, { // 收款帐号
                            path: 'pay/shop/bank_account',
                            component: require(
                                "pages/main/mall/pay/shop/bank_account")
                        },


                        // 退订单收货地址管理
                        {
                            path: 'back/shop/back_address',
                            component: require("pages/main/mall/back/shop/back_address")
                        },{
                            path: 'back/shop/back_order',
                            component: require("pages/main/mall/back/shop/back_order")
                        },{
                            path: 'back/shop/back_order_receipt',
                            component: require("pages/main/mall/back/shop/back_order_receipt")
                        },{
                            path: 'back/shop/back_order_pickup',
                            component: require("pages/main/mall/back/shop/back_pickup")
                        },

                        // 广告弹出管理
                        {
                            path: 'ad/shop/pop_add',
                            component: require("pages/main/mall/ad/adpop")
                        },
                        // 营销广告管理
                        {
                            path: 'ad/shop/ad_sale',
                            component: require("pages/main/mall/ad/adsale")
                        },   
                        
                        //营销统计 店铺
                        {
                            path: 'shop/marketingStats',
                            component: require("pages/main/mall/stats/marketingStats/shop_index.vue")
                        },   
                        //销售数据 店铺
                        {
                            path: 'shop/saleData',
                            component: require("pages/main/mall/stats/saleData/shop_index.vue")
                        },     
                        //销售明细 店铺
                        {
                            path: 'shop/saleDetail',
                            component: require("pages/main/mall/stats/saleDetail/shop_index.vue")
                        },    
                        //销售数据 运营商
                        {
                            path: 'saleData',
                            component: require("pages/main/mall/stats/saleData/supplier_index.vue")
                        },     
                        //充值统计 运营商
                        {
                            path: 'rechargeStats',
                            component: require("pages/main/mall/stats/rechargeStats/supplier_index.vue")
                        },      
                        //用户余额 运营商
                        {
                            path: 'userBalance',
                            component: require("pages/main/mall/stats/userBalance/supplier_index.vue")
                        },             

                        // 促销人员管理
                        {
                            name: 'recharge/shop/promotion',
                            path: 'recharge/shop/promotion',
                            component: require("pages/main/mall/recharge_set/promotion")
                        },                       

                    ]
                }

            ],
        },
        // 登录模块
        {
            name: 'LoginPage',
            path: '/userlogin',
            component: LoginPage,
            children: [{
                path: '/',
                component: require('pages/login/components/login-box')
            }]
        },
        // 忘记密码模块
        {
            name: 'forgotPassword',
            path: '/forgotPassword',
            component: require('pages/login/forgot_password')
        },
        // demo 测试
        {
            path: '/demo',
            component: require('pages/demo'),
            children: [{
                path: "city_select",
                component: require('pages/demo/select/city_select')
            }, {
                path: "a",
                component: require('pages/demo/a')
            }, {
                path: "tree-a",
                component: require('pages/demo/tree/tree-a')
            }, {
                path: "message-box",
                component: require('pages/demo/message-box/message-box')
            }, {
                path: "tree-b",
                component: require('pages/demo/tree/tree-b')
            }, {
                path: "table",
                component: require('pages/demo/table/table')
            }, {
                path: "form-a",
                component: require('pages/demo/form/form-a')
            }, {
                path: "date",
                component: require('pages/demo/date')
            }, {
                path: "sku",
                component: require('pages/demo/sku')
            }, {
                path: "tab",
                component: require('pages/demo/tab')
            }, {
                path: "radio",
                component: require('pages/demo/radio')
            }, {
                path: "style",
                component: require('pages/demo/style')
            }, {
                path: "magic-table",
                component: require('pages/demo/magic-table')
            }, {
                path: "img-hot-area",
                component: require('pages/demo/img-hot-area')
            }, {
                path: "vip-list",
                component: require('pages/demo/vip-list')
            },
            /*{
                path: "mhome",
                component: require('pages/demo/mhome')
            }, {
                path: "app",
                component: require('pages/demo/app-design')
            }*/]
        },

        // 注: 此路由配置要放在数组最后
        {
            path: '*',
            redirect: '/userlogin'
        },
    ]
})
