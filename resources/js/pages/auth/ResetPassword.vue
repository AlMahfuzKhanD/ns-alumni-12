<template>
    <AuthLayout
        title="Set a new password"
        subtitle="Please choose a strong password with at least 8 characters."
    >
        <div v-if="success" class="text-center space-y-4">
            <div class="w-12 h-12 rounded-full bg-emerald-50 text-secondary border border-emerald-200 mx-auto flex items-center justify-center">
                <CheckCircle2 class="w-6 h-6" />
            </div>

            <h3 class="text-base font-bold text-text-main">
                Password Successfully Reset
            </h3>

            <p class="text-xs text-text-muted leading-relaxed">
                Your password has been updated. You can now log into your member account with your new credentials.
            </p>

            <div class="pt-4">
                <router-link to="/auth/login">
                    <BaseButton variant="primary" fullWidth size="md">
                        Proceed to Sign In &rarr;
                    </BaseButton>
                </router-link>
            </div>
        </div>

        <form v-else @submit.prevent="handleReset" class="space-y-4">
            <BaseInput
                v-model="token"
                label="Verification / Reset Code"
                placeholder="6-digit code sent to your phone"
                :error="errors.token"
                required
            />

            <BaseInput
                v-model="password"
                type="password"
                label="New Password"
                placeholder="Minimum 8 characters"
                :error="errors.password"
                required
            />

            <BaseInput
                v-model="passwordConfirmation"
                type="password"
                label="Confirm New Password"
                placeholder="Re-enter password"
                :error="errors.passwordConfirmation"
                required
            />

            <div class="pt-2">
                <BaseButton
                    variant="primary"
                    size="lg"
                    type="submit"
                    fullWidth
                    :loading="isLoading"
                >
                    Update Password
                </BaseButton>
            </div>

            <div class="text-center pt-2">
                <router-link
                    to="/auth/login"
                    class="text-xs font-semibold text-primary hover:text-primary-hover"
                >
                    &larr; Return to Sign In
                </router-link>
            </div>
        </form>
    </AuthLayout>
</template>

<script setup>
import { ref } from 'vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { CheckCircle2 } from 'lucide-vue-next';

const token = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const isLoading = ref(false);
const success = ref(false);

const errors = ref({
    token: '',
    password: '',
    passwordConfirmation: ''
});

const handleReset = () => {
    errors.value = { token: '', password: '', passwordConfirmation: '' };

    if (!token.value) {
        errors.value.token = 'Reset code is required';
        return;
    }
    if (!password.value || password.value.length < 6) {
        errors.value.password = 'Password must be at least 6 characters';
        return;
    }
    if (password.value !== passwordConfirmation.value) {
        errors.value.passwordConfirmation = 'Passwords do not match';
        return;
    }

    isLoading.value = true;
    setTimeout(() => {
        isLoading.value = false;
        success.value = true;
    }, 700);
};
</script>
