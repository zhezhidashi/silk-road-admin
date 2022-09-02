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
                component: () => import('../view/Home/index.vue')
            },
            {
                path: '/user',
                name: 'user',
                component: () => import('../view/User/index.vue')
            },
            {
                path: '/Picture',
                name: 'Picture',
                component: () => import('../view/Picture')
            },
            {
                path: '/ActivityDetails',
                name: 'ActivityDetails',
                component: () => import('../view/ActivityManage/ActivityDetails')
            },
            {
                path: '/AddActivity',
                name: 'AddActivity',
                component: () => import('../view/ActivityManage/AddActivity')
            },
            {
                path: '/UpdateActivity',
                name: 'UpdateActivity',
                component: () => import('../view/ActivityManage/UpdateActivity')
            },
            {
                path: '/DeleteActivity',
                name: 'DeleteActivity',
                component: () => import('../view/ActivityManage/DeleteActivity')
            },
            {
                path: '/ExhibitionDetails',
                name: 'ExhibitionDetails',
                component: () => import('../view/ExhibitionManage/ExhibitionDetails')
            },
            {
                path: '/AddExhibition',
                name: 'AddExhibition',
                component: () => import('../view/ExhibitionManage/AddExhibition')
            },
            {
                path: '/UpdateExhibition',
                name: 'UpdateExhibition',
                component: () => import('../view/ExhibitionManage/UpdateExhibition')
            },
            {
                path: '/DeleteExhibition',
                name: 'DeleteExhibition',
                component: () => import('../view/ExhibitionManage/DeleteExhibition')
            },
            {
                path: '/AlbumDetails',
                name: 'AlbumDetails',
                component: () => import('../view/AlbumManage/AlbumDetails')
            },
            {
                path: '/AddAlbum',
                name: 'AddAlbum',
                component: () => import('../view/AlbumManage/AddAlbum')
            },
            {
                path: '/UpdateAlbum',
                name: 'UpdateAlbum',
                component: () => import('../view/AlbumManage/UpdateAlbum')
            },
            {
                path: '/DeleteAlbum',
                name: 'DeleteAlbum',
                component: () => import('../view/AlbumManage/DeleteAlbum')
            },
            {
                path: '/PicDetails',
                name: 'PicDetails',
                component: () => import('../view/PicManage/PicDetails')
            },
            {
                path: '/AddPic',
                name: 'AddPic',
                component: () => import('../view/PicManage/AddPic')
            },
            {
                path: '/UpdatePic',
                name: 'UpdatePic',
                component: () => import('../view/PicManage/UpdatePic')
            },
            {
                path: '/DeletePic',
                name: 'DeletePic',
                component: () => import('../view/PicManage/DeletePic')
            },
            {
                path: '/Content',
                name: 'Content',
                component: () => import('../view/Content')
            },
            {
                path: '/AddArchive',
                name: 'AddArchive',
                component: () => import('../view/ArchiveManage/AddArchive.vue')
            },
            {
                path: '/UpdateArchive',
                name: 'UpdateArchive',
                component: () => import('../view/ArchiveManage/UpdateArchive.vue')
            },
            {
                path: '/DeleteArchive',
                name: 'DeleteArchive',
                component: () => import('../view/ArchiveManage/DeleteArchive.vue')
            },
            {
                path: '/ArchiveList',
                name: 'ArchiveList',
                component: () => import('../view/ArchiveManage/ArchiveList.vue')
            },
        ]

    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../view/Login/index.vue')
    }


]


const router = new VueRouter({
    mode: 'hash',
    routes
})

export default router