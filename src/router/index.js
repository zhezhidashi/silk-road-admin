import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'

Vue.use(VueRouter)

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

const VueRouterGo = VueRouter.prototype.go
VueRouter.prototype.go = function go(to){
    return VueRouterGo.call(this, to).catch(err => err)
}

//replace
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(to) {
    return VueRouterReplace.call(this, to).catch(err => err)
}

const routes = [
    {
        path: '/',
        name: 'Main',
        component: () => import('../view/Main.vue'),
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {
                    title: '主页'
                },
                component: () => import('../view/Home/index.vue')
            },
            {
                path: '/user',
                name: 'user',
                meta: {
                    title: '用户管理'
                },
                component: () => import('../view/User/index.vue')
            },
            {
                path: '/Picture',
                name: 'Picture',
                meta: {
                    title: '照片管理'
                },
                component: () => import('../view/Picture')
            },
            {
                path: '/ActivityDetails',
                name: 'ActivityDetails',
                meta: {
                    title: '活动列表'
                },
                component: () => import('../view/ActivityManage/ActivityDetails')
            },
            {
                path: '/ExhibitionDetails',
                name: 'ExhibitionDetails',
                meta: {
                    title: '展览列表'
                },
                component: () => import('../view/ExhibitionManage/ExhibitionDetails')
            },
            {
                path: '/AddExhibition',
                name: 'AddExhibition',
                meta: {
                    title: '添加展览'
                },
                component: () => import('../view/ExhibitionManage/AddExhibition')
            },
            {
                path: '/UpdateExhibition',
                name: 'UpdateExhibition',
                meta: {
                    title: '更新展览'
                },
                component: () => import('../view/ExhibitionManage/UpdateExhibition')
            },
            {
                path: '/DeleteExhibition',
                name: 'DeleteExhibition',
                meta: {
                    title: '删除展览'
                },
                component: () => import('../view/ExhibitionManage/DeleteExhibition')
            },
            {
                path: '/PicDetails',
                name: 'PicDetails',
                meta: {
                    title: '展览-图片列表'
                },
                component: () => import('../view/PicManage/PicDetails')
            },
            {
                path: '/AddPic',
                name: 'AddPic',
                meta: {
                    title: '添加展览-图片'
                },
                component: () => import('../view/PicManage/AddPic')
            },
            {
                path: '/UpdatePic',
                name: 'UpdatePic',
                meta: {
                    title: '更新展览-图片'
                },
                component: () => import('../view/PicManage/UpdatePic')
            },
            {
                path: '/DeletePic',
                name: 'DeletePic',
                meta: {
                    title: '删除展览-图片'
                },
                component: () => import('../view/PicManage/DeletePic')
            },
            {
                path: '/SortPic',
                name: 'SortPic',
                meta: {
                    title: '展览-图片排序'
                },
                component: () => import('../view/PicManage/SortPic')
            },
            {
                path: '/AddArchive',
                name: 'AddArchive',
                meta: {
                    title: '添加档案'
                },
                component: () => import('../view/ArchiveManage/AddArchive.vue')
            },
            {
                path: '/UpdateArchive',
                name: 'UpdateArchive',
                meta: {
                    title: '更新档案'
                },
                component: () => import('../view/ArchiveManage/UpdateArchive.vue')
            },
            {
                path: '/DeleteArchive',
                name: 'DeleteArchive',
                meta: {
                    title: '删除档案'
                },
                component: () => import('../view/ArchiveManage/DeleteArchive.vue')
            },
            {
                path: '/ArchiveList',
                name: 'ArchiveList',
                meta: {
                    title: '档案列表'
                },
                component: () => import('../view/ArchiveManage/ArchiveList.vue')
            },
            {
                path: '/OperationIntroduction',
                name: 'OperationIntroduction',
                meta: {
                    title: '操作说明',
                },
                component: () => import('../view/OperationIntroduction')
            },
            {
                path: "/FeedbackList",
                name: 'FeedbackList',
                meta: {
                    title: '用户留言列表'
                },
                component: () => import('../view/Feedback/FeedbackList')
            },
            {
                path: '/FeedbackContent',
                name: 'FeedbackContent',
                meta: {
                    title: '用户留言内容'
                },
                component: () => import('../view/Feedback/FeedbackContent')
            },
            {
                path: '/RecoveryArchive',
                name: 'RecoveryArchive',
                meta: {
                    title: '恢复档案'
                },
                component: () => import('../view/RubbishBin/RecoveryArchive')
            },
            {
                path: '/RecoveryActivity',
                name: 'RecoveryActivity',
                meta: {
                    title: '恢复学术活动'
                },
                component: () => import('../view/RubbishBin/RecoveryActivity')
            },
            {
                path: '/RecoveryExhibition',
                name: 'RecoveryExhibition',
                meta: {
                    title: '恢复展览'
                },
                component: () => import('../view/RubbishBin/RecoveryExhibition')
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录'
        },
        component: () => import('../view/Login/index.vue')
    }
]


const router = new VueRouter({
    mode: 'hash',
    routes
})

export default router