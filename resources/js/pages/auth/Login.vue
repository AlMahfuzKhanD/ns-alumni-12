<template>
    <AuthLayout
        title="Sign in to your account"
        subtitle="Access your member dashboard, contribution history, and mutual aid portal."
    >
        <form @submit.prevent="handleLogin" class="space-y-5">
            <!-- Identifier (Phone or Email) -->
            <BaseInput
                v-model="form.identifier"
                label="Phone Number or Email"
                placeholder="e.g. 017XXXXXXXX or name@example.com"
                :error="errors.identifier"
                required
            >
                <template #prefix>
                    <User class="w-4 h-4 text-text-muted" />
                </template>
            </BaseInput>

            <!-- Password -->
            <div>
                <BaseInput
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    label="Password"
                    placeholder="Enter your password"
                    :error="errors.password"
                    required
                >
                    <template #prefix>
                        <Lock class="w-4 h-4 text-text-muted" />
                    </template>
                    <template #suffix>
                        <button
                            type="button"
                            @click="showPassword = !showPassword"
                            class="text-text-muted hover:text-text-main focus:outline-none"
                            tabindex="-1"
                        >
                            <EyeOff v-if="showPassword" class="w-4 h-4" />
                            <Eye v-else class="w-4 h-4" />
                        </button>
                    </template>
                </BaseInput>
            </div>

            <!-- Remember me & Forgot Password -->
            <div class="flex items-center justify-between text-xs">
                <div class="flex items-center space-x-2">
                    <input
                        id="remember"
                        type="checkbox"
                        v-model="form.remember"
                        class="rounded border-border-main text-primary focus:ring-primary h-4 w-4"
                    />
                    <label for="remember" class="text-text-muted select-none cursor-pointer">
                        Remember me
                    </label>
                </div>

                <router-link
                    to="/auth/forgot-password"
                    class="font-semibold text-primary hover:text-primary-hover transition-colors"
                >
                    Forgot password?
                </router-link>
            </div>

            <!-- Submit Button -->
            <BaseButton
                variant="primary"
                size="lg"
                type="submit"
                fullWidth
                :loading="isLoading"
            >
                Sign In to Member Portal
            </BaseButton>

            <!-- Register Link -->
            <div class="text-center pt-2">
                <p class="text-xs text-text-muted">
                    Not registered yet?
                    <router-link
                        to="/auth/register"
                        class="font-bold text-primary hover:text-primary-hover ml-1"
                    >
                        Apply for Membership &rarr;
                    </router-link>
                </p>
            </div>

            <!-- Simulated Role Selector for UI Preview -->
            <div class="mt-6 pt-5 border-t border-dashed border-border-main text-center">
                <p class="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-2">
                    Demo Preview Logins
                </p>
                <div class="flex flex-wrap items-center justify-center gap-2">
                    <button
                        type="button"
                        @click="fillDemo('member')"
                        class="px-2.5 py-1 text-xs rounded-lg bg-slate-100 hover:bg-slate-200 text-text-main font-medium transition-colors"
                    >
                        General Member
                    </button>
                    <button
                        type="button"
                        @click="fillDemo('treasurer')"
                        class="px-2.5 py-1 text-xs rounded-lg bg-emerald-50 hover:bg-emerald-100 text-secondary font-medium transition-colors"
                    >
                        Treasurer
                    </button>
                    <button
                        type="button"
                        @click="fillDemo('admin')"
                        class="px-2.5 py-1 text-xs rounded-lg bg-primary-light hover:bg-blue-100 text-primary font-medium transition-colors"
                    >
                        Super Admin
                    </button>
                </div>
            </div>
        </form>
    </AuthLayout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthLayout from '@/layouts/AuthLayout.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { User, Lock, Eye, EyeOff } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const showPassword = ref(false);
const isLoading = ref(false);

const form = ref({
    identifier: '',
    password: '',
    remember: true
});

const errors = ref({
    identifier: '',
    password: ''
});

const fillDemo = (role) => {
    if (role === 'admin') {
        form.value.identifier = 'admin@nsalumni.org';
        form.value.password = 'SuperAdmin@2026';
    } else if (role === 'treasurer') {
        form.value.identifier = 'treasurer@nsalumni.org';
        form.value.password = 'Treasurer@2026';
    } else {
        form.value.identifier = '01712345678';
        form.value.password = 'Member@2026';
    }
};

const handleLogin = () => {
    errors.value = { identifier: '', password: '' };

    if (!form.value.identifier) {
        errors.value.identifier = 'Phone or email is required';
        return;
    }
    if (!form.value.password) {
        errors.value.password = 'Password is required';
        return;
    }

    isLoading.value = true;

    // Simulate login response
    setTimeout(() => {
        isLoading.value = false;

        let roleName = 'Member';
        if (form.value.identifier.includes('admin')) {
            roleName = 'Super Admin';
        } else if (form.value.identifier.includes('treasurer')) {
            roleName = 'Treasurer';
        }

        authStore.setUser(
            {
                name: roleName === 'Member' ? 'Tanvir Ahmed' : (roleName === 'Treasurer' ? 'Mahmudul Hasan' : 'Super Admin'),
                email: form.value.identifier.includes('@') ? form.value.identifier : 'member@nsalumni.org',
                phone: '01712345678',
                memberCode: 'NS12-0001',
                batchYear: '2012'
            },
            [roleName],
            ['view-dashboard', 'manage-chada', 'view-members']
        );

        // Redirect based on role
        if (roleName === 'Super Admin' || roleName === 'Treasurer') {
            router.push('/admin/dashboard');
        } else {
            router.push('/');
        }
    }, 800);
};
</script>
