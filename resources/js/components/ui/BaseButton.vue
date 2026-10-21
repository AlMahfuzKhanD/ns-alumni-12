<template>
    <button
        :type="type"
        :disabled="disabled || loading"
        :class="[
            'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 select-none disabled:opacity-60 disabled:cursor-not-allowed',
            sizeClasses,
            variantClasses,
            roundedClass,
            fullWidth ? 'w-full' : ''
        ]"
    >
        <!-- Loading Spinner -->
        <svg
            v-if="loading"
            class="animate-spin -ml-0.5 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>

        <!-- Prefix Icon Slot -->
        <span v-if="$slots.icon && !loading" class="mr-2 inline-flex items-center">
            <slot name="icon" />
        </span>

        <!-- Label Slot -->
        <span>
            <slot />
        </span>

        <!-- Suffix Icon Slot -->
        <span v-if="$slots['icon-right']" class="ml-2 inline-flex items-center">
            <slot name="icon-right" />
        </span>
    </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    type: {
        type: String,
        default: 'button'
    },
    variant: {
        type: String,
        default: 'primary',
        validator: (value) => [
            'primary',
            'secondary',
            'success',
            'danger',
            'warning',
            'outline',
            'ghost'
        ].includes(value)
    },
    size: {
        type: String,
        default: 'md',
        validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },
    disabled: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false
    },
    fullWidth: {
        type: Boolean,
        default: false
    },
    rounded: {
        type: String,
        default: 'xl' // 10px rounded according to design system
    }
});

const sizeClasses = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'h-9 px-3 text-xs';
        case 'lg':
            return 'h-12 px-6 text-base';
        case 'md':
        default:
            return 'h-11 px-4 text-sm';
    }
});

const roundedClass = computed(() => {
    switch (props.rounded) {
        case 'full':
            return 'rounded-full';
        case 'lg':
            return 'rounded-lg';
        case '2xl':
            return 'rounded-2xl';
        case 'xl':
        default:
            return 'rounded-xl';
    }
});

const variantClasses = computed(() => {
    switch (props.variant) {
        case 'secondary':
            return 'bg-secondary text-white hover:bg-secondary-hover focus:ring-secondary shadow-sm';
        case 'success':
            return 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 shadow-sm';
        case 'danger':
            return 'bg-danger text-white hover:bg-red-600 focus:ring-danger shadow-sm';
        case 'warning':
            return 'bg-accent text-white hover:bg-amber-600 focus:ring-accent shadow-sm';
        case 'outline':
            return 'bg-white text-text-main border border-border-main hover:bg-slate-50 focus:ring-primary shadow-xs';
        case 'ghost':
            return 'bg-transparent text-text-muted hover:text-text-main hover:bg-slate-100 focus:ring-slate-300';
        case 'primary':
        default:
            return 'bg-primary text-white hover:bg-primary-hover focus:ring-primary shadow-sm';
    }
});
</script>
