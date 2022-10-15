// 有关接口请求

import axios from "./axios";
import store from '../store'
import nprogress from 'nprogress';
import "nprogress/nprogress.css";

// export const baseUrl = '/api'
export const baseUrl = 'https://dev_admin.pacificsilkroad.cn/api-service'


export const getData = () => {
    return axios.request(
        {
            url: '/home/getData',
            method: 'get',
        }
    )
}

// 得到 User 的信息（目前仍是 mock 模拟）
export const getUser = (params) => {
    return axios.request({
        url: "/user/getUser",
        method: 'get',
        params
    })
}

export const postUser = (url, params) => {
    return axios.request({
        url,
        method: 'post',
        data: params
    })
}

// 向指定的 url 提交数据表单
export const postForm = (requestUrl, params, callback) => {
    nprogress.start();
    console.log('postForm 的表单', requestUrl, params)
    store.commit('getToken')
    const TokenValue = store.state.user.token;
    axios.request({
        url: baseUrl + requestUrl,
        method: 'post',
        data: params,
        headers: {
            token: TokenValue
        }
    }).then(({ data: res }) => {
        nprogress.done()
        console.log('postForm 的 response', res);
        callback(res);
    })
}

// 向指定的 url 获取数据表单
export const getForm = (requestUrl, callback) => {
    nprogress.start();
    store.commit('getToken')
    const TokenValue = store.state.user.token
    axios.request({
        url: baseUrl + requestUrl,
        method: 'get',
        headers: {
            token: TokenValue
        }
    }).then(({ data: res }) => {
        nprogress.done()
        console.log('getForm 的 response', res);
        callback(res)
    })
}

// 加载菜单
export const getMenu = (params, callback) => {
    nprogress.start();
    axios.request({
        url: baseUrl + '/account/admin/login',
        method: 'post',
        data: params
    }).then(({ data: res }) => {
        nprogress.done()
        // code 为 0 表示管理员登录
        if (res.code === 400) {
            alert("用户名或密码错误！")
        }
        else if (res.code === 0) {
            //登录成功
            console.log('admin成功登录')
            callback({
                // 返回响应码、菜单、token、message
                code: 0,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'home',
                            label: '首页',
                            icon: 's-home',
                        },
                        {
                            path: '/Picture',
                            name: 'Picture',
                            label: '图片管理',
                            icon: 'picture',
                        },
                        // {
                        //     path: '/user',
                        //     name: 'user',
                        //     label: '用户管理',
                        //     icon: 'user',
                        // },
                        {
                            name: 'Content',
                            label: '内容管理',
                            icon: 's-order',
                            children: [
                                {
                                    path: '/ArchiveList',
                                    name: 'ArchiveList',
                                    label: '档案列表',
                                },
                                {
                                    path: '/ActivityDetails',
                                    name: 'ActivityDetails',
                                    label: '学术活动列表',
                                },
                                {
                                    path: '/ExhibitionDetails',
                                    name: 'ExhibitionDetails',
                                    label: '展览列表',
                                },
                                {
                                    path: '/PicDetails',
                                    name: 'PicDetails',
                                    label: '展览-图片列表',
                                }
                            ],
                        },
                        {
                            name: 'Feedback',
                            label: '用户留言',
                            icon: 's-comment',
                            children: [
                                {
                                    path: '/FeedbackList',
                                    name: 'FeedbackList',
                                    label: '用户留言列表',
                                },
                            ],
                        },
                    ],
                    token: res.data,
                    message: '获取成功'
                }
            })
        }

    })
}

export const TableDataMap = {
    title: '标题',
    Introduction: '简介',
    show_time: "展示时间",
    exhibition_id: "展览编号",
    pic_id: "图片编号",
    pic_url: "图片网址",
    intro: '简介',
    date: "日期",
    size: "尺寸",
    organization: "组织",
    archive_id: "档案编号",


    AR: "阿拉伯文",
    BE: "白俄罗斯文",
    BG: "保加利亚文",
    CA: "加泰罗尼亚文",
    CS: "捷克文",
    DA: "丹麦文",
    DE: "德文",
    EL: "希腊文",
    EN: "英文",
    ES: "西班牙文",
    ET: "爱沙尼亚文",
    FI: "芬兰文",
    FR: "法文",
    HR: "克罗地亚文",
    HU: "匈牙利文",
    IT: "意大利文",
    IW: "希伯来文",
    JA: "日文",
    KO: "朝鲜文",
    LT: "立陶宛文",
    MK: "马其顿文",
    NL: "荷兰文",
    NO: "挪威文",
    PL: "波兰文",
    PT: "葡萄牙文",
    RO: "罗马尼亚文",
    RU: "俄文",
    SK: "斯洛伐克文",
    SL: "斯洛文尼亚文",
    SQ: "阿尔巴尼亚文",
    SR: "塞尔维亚文",
    SV: "瑞典文",
    TH: "泰文",
    TR: "土耳其文",
    UK: "乌克兰文",
    ZH: "中文",
}

export const LanguageOption = [
    { label: "中文", value: "ZH" },
    { label: "英文", value: "EN" },
    { label: "西班牙文", value: "ES" },
    { label: "荷兰文", value: "NL" },
    { label: "法文", value: "FR" },
    { label: "日文", value: "JA" },
    { label: "葡萄牙文", value: "PT" },
]

export const ListContain = (list, key) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i] === key) {
            return true;
        }
    }
    return false;
}

export const Swap = (a, b) => {
    let tmp = a;
    a = b;
    b = tmp;
    return [a, b];
}