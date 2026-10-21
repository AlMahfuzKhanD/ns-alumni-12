<template>
    <div class="min-h-screen bg-surface-bg flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-primary-light selection:text-primary">
        <!-- Top Home Link -->
        <div class="sm:mx-auto sm:w-full sm:max-w-md mb-6 flex items-center justify-between">
            <router-link
                to="/"
                class="inline-flex items-center text-xs font-semibold text-text-muted hover:text-primary transition-colors"
            >
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Public Website
            </router-link>

            <span class="text-xs font-bold text-primary bg-primary-light px-2.5 py-0.5 rounded-full">
                NS - 12
            </span>
        </div>

        <!-- Brand Header -->
        <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
            <router-link to="/" class="inline-flex items-center justify-center">
                <div class="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-2xl shadow-md">
                    NS
                </div>
            </router-link>

            <h2 class="mt-4 text-2xl sm:text-3xl font-extrabold text-text-main tracking-tight">
                {{ title }}
            </h2>

            <p v-if="subtitle" class="mt-2 text-sm text-text-muted">
                {{ subtitle }}
            </p>
        </div>

        <!-- Card Container -->
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-6 shadow-sm border border-border-main rounded-2xl sm:px-10">
                <slot />
            </div>

            <!-- Footer Note -->
            <p class="mt-6 text-center text-xs text-text-muted">
                Alumni Association of NS - 12 &bull; Secure Digital Member Portal
            </p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        default: 'Welcome to NS - 12'
    },
    subtitle: {
        type: String,
        default: 'Sign in to access your member dashboard and contribution history.'
    }
});
</script>
