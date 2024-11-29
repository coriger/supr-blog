// siyuanApi.js
import { SiyuanConfig, SiyuanKernelApi } from "zhi-siyuan-api";
import { Client } from "@siyuan-community/siyuan-sdk";
import axios from "axios";

/* 初始化客户端 (默认使用 Axios 发起 XHR 请求) */
export const siyuanSdk = new Client({
    /**
     * (可选) 思源内核服务地址
     * @default: document.baseURI
     */
    baseURL: "https://coriger.cpolar.cn/",

    /**
     * (可选) 思源内核服务 token
     * @default: <空>
     */
    token: "4si8l21oy72gng6e", // , 默认为空
});


const siyuanConfig = new SiyuanConfig("https://coriger.cpolar.cn", "4si8l21oy72gng6e");
export const kernelApi = new SiyuanKernelApi(siyuanConfig);


export const siyuanApi = {
    // 其他接口
    async getChildArticles(notebook,path){
        const res = await axios.post(`${siyuanConfig.apiUrl}/api/filetree/listDocsByPath`, {
            notebook: notebook,
            path: path,
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "token 4si8l21oy72gng6e"
            },
        })
        return res.data;
    }
};