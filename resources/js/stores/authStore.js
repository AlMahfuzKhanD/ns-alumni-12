import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
        roles: [],
        permissions: [],
        isLoading: false,
    }),
    getters: {
        isAuthenticated: (state) => !!state.user,
        isSuperAdmin: (state) => state.roles.includes('Super Admin'),
        isAdmin: (state) => state.roles.includes('Admin') || state.roles.includes('Super Admin'),
        isTreasurer: (state) => state.roles.includes('Treasurer'),
        isMember: (state) => state.roles.includes('Member'),
    },
    actions: {
        setUser(user, roles = [], permissions = []) {
            this.user = user;
            this.roles = roles;
            this.permissions = permissions;
        },
        hasRole(roleName) {
            return this.roles.includes(roleName);
        },
        hasPermission(permissionName) {
            return this.permissions.includes(permissionName) || this.roles.includes('Super Admin');
        },
        logout() {
            this.user = null;
            this.token = null;
            this.roles = [];
            this.permissions = [];
        }
    }
});
