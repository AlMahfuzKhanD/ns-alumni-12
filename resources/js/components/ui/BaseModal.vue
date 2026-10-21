<template>
    <Teleport to="body">
        <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="modelValue"
                class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
                @click.self="handleBackdropClick"
            >
                <Transition
                    enter-active-class="transition duration-200 ease-out"
                    enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-active-class="transition duration-150 ease-in"
                    leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div
                        v-if="modelValue"
                        :class="[
                            'w-full bg-white rounded-2xl shadow-xl border border-border-main overflow-hidden flex flex-col',
                            maxWidthClass
                        ]"
                        role="dialog"
                        aria-modal="true"
                    >
                        <!-- Modal Header -->
                        <div class="px-6 py-4.5 border-b border-border-main flex items-center justify-between">
                            <div>
                                <h3 class="text-lg font-semibold text-text-main leading-tight">
                                    {{ title }}
                                </h3>
                                <p v-if="subtitle" class="text-xs text-text-muted mt-0.5">
                                    {{ subtitle }}
                                </p>
                            </div>

                            <button
                                v-if="showClose"
                                type="button"
                                @click="close"
                                class="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-main hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                                aria-label="Close"
                            >
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <!-- Modal Body -->
                        <div class="px-6 py-5 max-h-[75vh] overflow-y-auto">
                            <slot />
                        </div>

                        <!-- Modal Footer -->
                        <div
                            v-if="$slots.footer"
                            class="px-6 py-4 bg-slate-50/80 border-t border-border-main flex items-center justify-end space-x-3"
                        >
                            <slot name="footer" :close="close" />
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { computed, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: ''
    },
    subtitle: {
        type: String,
        default: ''
    },
    maxWidth: {
        type: String,
        default: 'md',
        validator: (v) => ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'].includes(v)
    },
    closeOnBackdrop: {
        type: Boolean,
        default: true
    },
    showClose: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(['update:modelValue', 'close']);

const maxWidthClass = computed(() => {
    switch (props.maxWidth) {
        case 'sm':
            return 'max-w-sm';
        case 'lg':
            return 'max-w-lg';
        case 'xl':
            return 'max-w-xl';
        case '2xl':
            return 'max-w-2xl';
        case '3xl':
            return 'max-w-3xl';
        case '4xl':
            return 'max-w-4xl';
        case 'md':
        default:
            return 'max-w-md';
    }
});

const close = () => {
    emit('update:modelValue', false);
    emit('close');
};

const handleBackdropClick = () => {
    if (props.closeOnBackdrop) {
        close();
    }
};

const handleKeyDown = (e) => {
    if (e.key === 'Escape' && props.modelValue) {
        close();
    }
};

watch(
    () => props.modelValue,
    (isOpen) => {
        if (typeof document !== 'undefined') {
            document.body.style.overflow = isOpen ? 'hidden' : '';
        }
    }
);

onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
    if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
    }
});
</script>
