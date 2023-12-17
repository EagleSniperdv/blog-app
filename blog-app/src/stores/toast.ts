    import { defineStore } from 'pinia';

    export const useToastStore = defineStore({
    id: 'toast',

    state: () => ({
        ms: 0 as number, // specify type as "number" to avoid implicit any
        message: '' as string, // specify type as "string"
        classes: '' as string, // specify type as "string"
        isVisible: false as boolean, // specify type as "boolean"
    }),

    actions: {
        showToast(ms: number, message: string, classes: string) { // explicitly define parameter types
        this.ms = ms; // no need for parseInt as type assertion already ensures number
        this.message = message;
        this.classes = classes;
        this.isVisible = true;

        setTimeout(() => {
            this.classes += ' -translate-y-28';
        }, 10);

        setTimeout(() => {
            this.classes = this.classes.replace('-translate-y-28', '');
        }, ms - 500);

        setTimeout(() => {
            this.isVisible = false;
        }, ms);
        },
    },
    });
