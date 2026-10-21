<template>
    <AuthLayout
        title="Reset your password"
        subtitle="Enter your registered mobile number or email address to receive password recovery instructions."
    >
        <div v-if="submitted" class="text-center space-y-4">
            <div class="w-12 h-12 rounded-full bg-emerald-50 text-secondary border border-emerald-200 mx-auto flex items-center justify-center">
                <CheckCircle2 class="w-6 h-6" />
            </div>

            <h3 class="text-base font-bold text-text-main">
                Recovery Link Dispatched
            </h3>

            <p class="text-xs text-text-muted leading-relaxed">
                If an account exists for <strong class="text-text-main">{{ identifier }}</strong>, instructions have been sent via SMS / email.
            </p>

            <div class="pt-4">
                <router-link to="/auth/reset-password">
                    <BaseButton variant="primary" fullWidth size="md">
                        Enter Reset Code &rarr;
                    </BaseButton>
                </router-link>
            </div>

            <div class="pt-2">
                <button
                    type="button"
                    @click="submitted = false"
                    class="text-xs font-semibold text-text-muted hover:text-text-main"
                >
                    Try another phone number or email
                </button>
            </div>
        </div>

        <form v-else @submit.prevent="handleSubmit" class="space-y-5">
            <BaseInput
                v-model="identifier"
                label="Registered Mobile or Email"
                placeholder="017XXXXXXXX or name@example.com"
                :error="error"
                required
            />

            <BaseButton
                variant="primary"
                size="lg"
                type="submit"
                fullWidth
                :loading="isLoading"
            >
                Send Recovery Instructions
            </BaseButton>

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

const identifier = ref('');
const error = ref('');
const isLoading = ref(false);
const submitted = ref(false);

const handleSubmit = () => {
    error.value = '';
    if (!identifier.value) {
        error.value = 'Please provide your registered phone or email';
        return;
    }

    isLoading.value = true;
    setTimeout(() => {
        isLoading.value = false;
        submitted.value = true;
    }, 700);
};
</script>
