import {GetBlockDto} from "../../models/dto/get-block.dto";

export class CloudflareService {

    static baseUrl = 'https://cloudflare-eth.com/'

    static getInfoByNumberOrLatest = ({id}: {id: string }) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const body = JSON.stringify({
            jsonrpc: "2.0",
            method: "eth_getBlockByNumber",
            params: [id, true],
            id: 1
        })

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body,
            redirect: 'follow'
        };

        return fetch(this.baseUrl, requestOptions)
            .then(res => res.json())
    }
}