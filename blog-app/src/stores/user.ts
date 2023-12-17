    import { defineStore } from 'pinia';
    import axios from 'axios';

    export const useUserStore = defineStore({
    id: 'user',

    state: () => ({
        user: {
        isAuthenticated: false as boolean, // specify type for isAuthenticated
        id: null as number | null, // specify type for id as number or null
        name: null as string | null, // specify type for name as string or null
        email: null as string | null, // specify type for email as string or null
        access: null as string | null, // specify type for access as string or null
        refresh: null as string | null, // specify type for refresh as string or null
        avatar: null as string | null, // specify type for avatar as string or null
        },
    }),

    actions: {
        initStore() {
        const access = localStorage.getItem('user.access');
        console.log('initStore', access);

        if (access) {
            console.log('User has access!');

            this.user.access = access;
            this.user.refresh = localStorage.getItem('user.refresh');
            this.user.id = Number(localStorage.getItem('user.id')); // use Number() to enforce number type
            this.user.name = localStorage.getItem('user.name');
            this.user.email = localStorage.getItem('user.email');
            this.user.avatar = localStorage.getItem('user.avatar');
            this.user.isAuthenticated = true;

            this.refreshToken();

            console.log('Initialized user:', this.user);
        }
        },

        setToken(data: { access: string; refresh: string }) {
        console.log('setToken', data);

        this.user.access = data.access;
        this.user.refresh = data.refresh;
        this.user.isAuthenticated = true;

        localStorage.setItem('user.access', data.access);
        localStorage.setItem('user.refresh', data.refresh);

        console.log('user.access: ', localStorage.getItem('user.access'));
        },

        removeToken() {
        console.log('removeToken');

        this.user.refresh = null;
        this.user.access = null;
        this.user.isAuthenticated = false;
        this.user.id = null;
        this.user.name = null;
        this.user.email = null;
        this.user.avatar = null;

        localStorage.setItem('user.access', '');
        localStorage.setItem('user.refresh', '');
        localStorage.setItem('user.id', '');
        localStorage.setItem('user.name', '');
        localStorage.setItem('user.email', '');
        localStorage.setItem('user.avatar', '');
        },

        setUserInfo(user: { id: number; name: string; email: string; avatar: string }) {
        console.log('setUserInfo', user);

        this.user.id = user.id;
        this.user.name = user.name;
        this.user.email = user.email;
        this.user.avatar = user.avatar;

        localStorage.setItem('user.id', String(this.user.id)); // use String() to enforce string type
        localStorage.setItem('user.name', user.name);
        localStorage.setItem('user.email', user.email);
        localStorage.setItem('user.avatar', user.avatar);

        console.log('User', this.user);
        },

        refreshToken() {
        axios
            .post('/api/refresh/', {
            refresh: this.user.refresh,
            })
            .then((response) => {
            this.user.access = response.data.access;

            localStorage.setItem('user.access', response.data.access);

            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
            })
            .catch((error) => {
            console.error(error);
            this.removeToken();
            });
        },
    },
    });
