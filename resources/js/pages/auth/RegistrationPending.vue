<template>
    <AuthLayout
        title="Application Received"
        subtitle="Thank you for applying to the Alumni Association of NS - 12."
    >
        <div class="text-center space-y-6">
            <!-- Warm Success/Pending Icon -->
            <div class="w-16 h-16 rounded-full bg-amber-50 text-amber-600 border border-amber-200 mx-auto flex items-center justify-center">
                <Clock class="w-8 h-8" />
            </div>

            <!-- Description -->
            <div class="space-y-2">
                <h3 class="text-lg font-bold text-text-main">
                    Account Under Committee Review
                </h3>
                <p class="text-xs sm:text-sm text-text-muted leading-relaxed">
                    Your details have been submitted to the executive committee. Because we value member safety and transparent mutual aid, all alumni registrations are verified against the Batch NS-12 registry.
                </p>
            </div>

            <!-- What happens next box -->
            <div class="p-4 rounded-xl bg-slate-50 border border-border-main text-left space-y-2 text-xs">
                <h4 class="font-bold text-text-main flex items-center">
                    <ShieldCheck class="w-4 h-4 text-primary mr-1.5" />
                    What happens next?
                </h4>
                <ul class="space-y-1.5 text-text-muted list-disc list-inside">
                    <li>The batch secretary will verify your identity within 24 hours.</li>
                    <li>You will receive an SMS confirmation once your account is activated.</li>
                    <li>After activation, you can log in, view the directory, and download payment receipts.</li>
                </ul>
            </div>

            <!-- Urgent Contact Note -->
            <div class="text-xs text-text-muted">
                Need expedited access for an emergency?
                <router-link to="/contact" class="font-semibold text-primary hover:underline block sm:inline sm:ml-1">
                    Contact the Executive Desk
                </router-link>
            </div>

            <!-- Actions -->
            <div class="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <router-link to="/">
                    <BaseButton variant="outline" size="md" fullWidth>
                        Back to Homepage
                    </BaseButton>
                </router-link>
                <router-link to="/auth/login">
                    <BaseButton variant="primary" size="md" fullWidth>
                        Go to Sign In
                    </BaseButton>
                </router-link>
            </div>
        </div>
    </AuthLayout>
</template>

<script setup>
import AuthLayout from '@/layouts/AuthLayout.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { Clock, ShieldCheck } from 'lucide-vue-next';
</script>
