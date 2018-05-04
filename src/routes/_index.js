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
                            name: 'shopGoods',
                            path: 'shop_goods',
                            component: require('pages/main/mall/shop/goods'),
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
                            path: 'shopFile',
                            component: shop_file
                        }, {
                            name: 'shop_address',
                            path: 'shop_address',
                            component: require('pages/main/mall/shop_address')
                        }, {
                            name: 'order_manage',
                            path: 'order_manage',
                            component: require('pages/main/mall/order_manage')
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
                        },
                        // 运营商会员
                        {
                            path: 'supplier_user', //列表
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
                            redirect: '/mall/shop_activity_management/specialActivity',
                            component: require("pages/main/mall/activity_mng/specialActivityIndex.vue")
                        },
                        //活动管理
                        {
                            path: 'shop_general_activity_mng',
                            redirect: '/mall/shop_activity_management/generalActivity',
                            component: require("pages/main/mall/activity_mng/generalActivityIndex.vue")
                        },

                        // 店铺营销管理
                        {
                          path: 'shop_activity_management',
                          component: require("pages/main/mall/shop_activity_management"),
                          redirect: '/mall/shop_activity_management/specialActivity',
                          children: [
                            // 专题管理
                            {
                              path: 'specialActivity',
                              component: require('pages/main/mall/shop_activity_management/specialActivity')
                            },
                            // 活动管理
                            {
                              path: 'generalActivity',
                              component: require('pages/main/mall/shop_activity_management/generalActivity')
                            }
                          ]
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
                        }, {
                            path: 'shop_message_center', //消息中心
                            component:  require('pages/main/mall/message_center/shopMessageIndex.vue')
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

        // demo 测试
        {
            path: '/demo',
            component: require('pages/demo'),
            children: [{
                path: "city_select",
                component: require('pages/demo/select/city_select')
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
            }]
        },

        // 注: 此路由配置要放在数组最后
        {
            path: '*',
            redirect: '/userlogin'
        },
    ]
})
