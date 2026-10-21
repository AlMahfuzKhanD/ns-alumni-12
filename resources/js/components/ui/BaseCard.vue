<template>
    <div
        :class="[
            'bg-white rounded-2xl border border-border-main transition-all duration-200 overflow-hidden',
            shadowClass,
            hoverable ? 'hover:shadow-md hover:border-slate-300' : ''
        ]"
    >
        <!-- Card Header -->
        <div
            v-if="$slots.header || title"
            :class="[
                'border-b border-border-main flex items-center justify-between',
                compact ? 'px-4 py-3' : 'px-6 py-4'
            ]"
        >
            <slot name="header">
                <div>
                    <h3 v-if="title" class="text-base sm:text-lg font-semibold text-text-main">
                        {{ title }}
                    </h3>
                    <p v-if="subtitle" class="text-xs text-text-muted mt-0.5">
                        {{ subtitle }}
                    </p>
                </div>
            </slot>

            <div v-if="$slots['header-action']" class="ml-4 shrink-0">
                <slot name="header-action" />
            </div>
        </div>

        <!-- Card Body -->
        <div :class="[noPadding ? '' : (compact ? 'p-4' : 'p-6')]">
            <slot />
        </div>

        <!-- Card Footer -->
        <div
            v-if="$slots.footer"
            :class="[
                'border-t border-border-main bg-slate-50/70',
                compact ? 'px-4 py-3' : 'px-6 py-4'
            ]"
        >
            <slot name="footer" />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    subtitle: {
        type: String,
        default: ''
    },
    hoverable: {
        type: Boolean,
        default: false
    },
    compact: {
        type: Boolean,
        default: false
    },
    noPadding: {
        type: Boolean,
        default: false
    },
    shadow: {
        type: String,
        default: 'sm',
        validator: (v) => ['none', 'sm', 'md', 'lg'].includes(v)
    }
});

const shadowClass = computed(() => {
    switch (props.shadow) {
        case 'none':
            return 'shadow-none';
        case 'md':
            return 'shadow-md';
        case 'lg':
            return 'shadow-lg';
        case 'sm':
        default:
            return 'shadow-sm';
    }
});
</script>
