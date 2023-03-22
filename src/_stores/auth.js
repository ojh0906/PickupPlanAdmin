import { defineStore } from 'pinia';
import { http } from '@/_services';
import router from '@/_router';
import dayjs from 'dayjs';

const baseUrl = `/admin`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        member: {},
        auth_token: "",
        expiryTime: "",
        isAuthenticated: false,
        return_url: null,
        dashInfo:{},
    }),
    actions: {
        async login(id, password) {
            try {
                const member = await http.post(`${baseUrl}/member/login`, { id, password }).then((resp) => {
                    console.log("login resp", resp);
                    if (resp.data.code === 200) {
                        this.member = resp.data.body.member;
                        delete this.member.password;
                        this.auth_token = resp.data.body.token;
                        this.isAuthenticated = true;
                        this.expiryTime = dayjs(new Date()).add(resp.data.body.expiryHour, 'hour').format('YYYY-MM-DD HH:mm:ss');
                        router.push(this.return_url || '/');
                    }else{
                        return resp;
                    }
                });
                return member;
                // redirect to previous url or default to home page
            } catch (error) {
                console.log("error user auth", error);             
            }
        },
        async getDashInfo() {
            try {
                await http.get(`${baseUrl}/home/info`).then((resp) => {
                    if (resp.data.code === 200) {
                        this.dashInfo = resp.data.body;
                    }
                });
            } catch (error) {
                console.log("error user auth", error);
            }
        },
        logout() {
            this.member = {};
            this.auth_token = "";
            this.expiryTime = "";
            this.isAuthenticated = false;
            router.push('/login');
        }
    },
    persist: true,
});