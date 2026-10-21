<template>
    <span
        :class="[
            'inline-flex items-center font-medium select-none',
            sizeClasses,
            variantClasses,
            rounded === 'full' ? 'rounded-full' : 'rounded-md'
        ]"
    >
        <!-- Optional Dot Indicator -->
        <span
            v-if="dot"
            :class="['shrink-0 mr-1.5 rounded-full', dotSizeClasses, dotColorClasses]"
        ></span>

        <slot />
    </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    variant: {
        type: String,
        default: 'primary',
        validator: (v) => [
            'primary',
            'secondary',
            'success',
            'warning',
            'danger',
            'neutral',
            'outline'
        ].includes(v)
    },
    size: {
        type: String,
        default: 'md',
        validator: (v) => ['sm', 'md'].includes(v)
    },
    dot: {
        type: Boolean,
        default: false
    },
    rounded: {
        type: String,
        default: 'full'
    }
});

const sizeClasses = computed(() => {
    return props.size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';
});

const dotSizeClasses = computed(() => {
    return props.size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2';
});

const variantClasses = computed(() => {
    switch (props.variant) {
        case 'secondary':
        case 'success':
            return 'bg-secondary-light text-secondary font-semibold';
        case 'warning':
            return 'bg-accent-light text-amber-800 font-semibold';
        case 'danger':
            return 'bg-red-50 text-danger border border-red-200/60 font-semibold';
        case 'neutral':
            return 'bg-slate-100 text-slate-700 font-medium';
        case 'outline':
            return 'bg-transparent text-text-muted border border-border-main font-medium';
        case 'primary':
        default:
            return 'bg-primary-light text-primary font-semibold';
    }
});

const dotColorClasses = computed(() => {
    switch (props.variant) {
        case 'secondary':
        case 'success':
            return 'bg-secondary';
        case 'warning':
            return 'bg-accent';
        case 'danger':
            return 'bg-danger';
        case 'neutral':
            return 'bg-slate-400';
        case 'outline':
            return 'bg-slate-400';
        case 'primary':
        default:
            return 'bg-primary';
    }
});
</script>
