// siyuanApi.js
import { SiyuanConfig, SiyuanKernelApi } from "zhi-siyuan-api";
import axios from "axios";

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