<template>
    <div class="bg-white rounded-2xl border border-border-main p-5 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
        <div class="flex items-start justify-between">
            <div>
                <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">
                    {{ title }}
                </p>
                <h3 class="text-2xl sm:text-3xl font-extrabold text-text-main mt-1 tracking-tight">
                    {{ value }}
                </h3>
            </div>

            <!-- Icon Container -->
            <div
                v-if="icon"
                :class="[
                    'w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-xs',
                    iconBgClass,
                    iconColorClass
                ]"
            >
                <component :is="icon" class="w-5 h-5" />
            </div>
        </div>

        <!-- Trend & Subtitle Footer -->
        <div v-if="trend || subtitle" class="mt-4 pt-3 border-t border-border-main flex items-center justify-between text-xs">
            <span v-if="trend" :class="['font-semibold flex items-center', trendClass]">
                <span class="mr-1">{{ trendDirection === 'up' ? '↑' : (trendDirection === 'down' ? '↓' : '•') }}</span>
                <span>{{ trend }}</span>
            </span>

            <span class="text-text-muted truncate ml-auto">
                {{ subtitle }}
            </span>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    value: {
        type: [String, Number],
        required: true
    },
    subtitle: {
        type: String,
        default: ''
    },
    trend: {
        type: String,
        default: ''
    },
    trendDirection: {
        type: String,
        default: 'up',
        validator: (v) => ['up', 'down', 'neutral'].includes(v)
    },
    icon: {
        type: Object,
        default: null
    },
    variant: {
        type: String,
        default: 'primary',
        validator: (v) => ['primary', 'secondary', 'accent', 'danger', 'slate'].includes(v)
    }
});

const iconBgClass = computed(() => {
    switch (props.variant) {
        case 'secondary':
            return 'bg-secondary-light';
        case 'accent':
            return 'bg-accent-light';
        case 'danger':
            return 'bg-red-50 border border-red-200/50';
        case 'slate':
            return 'bg-slate-100';
        case 'primary':
        default:
            return 'bg-primary-light';
    }
});

const iconColorClass = computed(() => {
    switch (props.variant) {
        case 'secondary':
            return 'text-secondary';
        case 'accent':
            return 'text-amber-700';
        case 'danger':
            return 'text-danger';
        case 'slate':
            return 'text-slate-700';
        case 'primary':
        default:
            return 'text-primary';
    }
});

const trendClass = computed(() => {
    switch (props.trendDirection) {
        case 'down':
            return 'text-danger';
        case 'neutral':
            return 'text-text-muted';
        case 'up':
        default:
            return 'text-secondary';
    }
});
</script>
