import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
    state: () => ({
        login: false,
    }),
    actions: {
        setLoginState(isLogin) {
            this.login = isLogin
        },
    },
})
