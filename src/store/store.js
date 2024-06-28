import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
    state: () => ({
        count: ''
    }),
    actions: {
        set(uid) {
            this.count=uid;
        },
    },
    getters: {}
});
