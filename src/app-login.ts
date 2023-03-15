import { AjaxRpc, RpcBase } from 'lite-ts-ajax';

import { ILogin } from './i-login';
import { BuildLoginOption } from './login-factory-base';

export type AccountLoginResponse = {
    id: string,
    accessToken: string,
    isAuth: boolean
}

export class AppLogin implements ILogin {
    public constructor(
        private m_Opt: BuildLoginOption,
        private m_Rpc: RpcBase
    ) { }

    public async login() {
        const resp = await this.m_Rpc?.callWithoutThrow<AccountLoginResponse>({
            route: '/account/login',
            body: { ...this.m_Opt }
        })
        
        if (!resp.err && resp.data)
            AjaxRpc.header['H-T'] = resp.data.accessToken;
        return resp.data;
    }
}