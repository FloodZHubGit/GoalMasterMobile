import { writable } from 'svelte/store';

interface User {
    username: string;
    email: string;
    id: string;
}

const user: User = {
    username: '',
    email: '',
    id: '',
};

export const userStore = writable(user);