import { defineStore } from 'pinia';
import { http } from '@/_services';
import router from '@/_router';

const baseUrl = `/admin`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        member: {},
        auth_token: "",
        isAuthenticated: false,
        return_url: null
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
        logout() {
            this.member = {};
            this.auth_token = "";
            this.isAuthenticated = false;
            router.push('/');
        }
    },
    persist: true,
});