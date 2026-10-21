<template>
    <div class="w-full">
        <!-- Label -->
        <label
            v-if="label"
            :for="id"
            class="block text-sm font-medium text-text-main mb-1.5"
        >
            {{ label }}
            <span v-if="required" class="text-danger ml-0.5">*</span>
        </label>

        <!-- Select Wrapper -->
        <div class="relative rounded-xl">
            <select
                :id="id"
                :value="modelValue"
                :disabled="disabled"
                @change="$emit('update:modelValue', $event.target.value)"
                :class="[
                    'w-full h-11 text-sm bg-white text-text-main rounded-xl border appearance-none px-3.5 pr-10 transition-all duration-150 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed',
                    error
                        ? 'border-danger focus:border-danger focus:ring-danger/20 text-danger'
                        : 'border-border-main focus:border-primary focus:ring-primary/20'
                ]"
            >
                <option v-if="placeholder" value="" disabled :selected="!modelValue">
                    {{ placeholder }}
                </option>
                <option
                    v-for="opt in normalizedOptions"
                    :key="opt.value"
                    :value="opt.value"
                >
                    {{ opt.label }}
                </option>
            </select>

            <!-- Caret Icon -->
            <div class="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-text-muted">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>

        <!-- Error Message -->
        <p v-if="error" class="mt-1.5 text-xs text-danger font-medium flex items-center">
            <svg class="w-3.5 h-3.5 mr-1 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <span>{{ error }}</span>
        </p>

        <!-- Help Text -->
        <p v-else-if="helpText" class="mt-1.5 text-xs text-text-muted">
            {{ helpText }}
        </p>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    id: {
        type: String,
        default: () => `select-${Math.random().toString(36).substring(2, 9)}`
    },
    placeholder: {
        type: String,
        default: 'Select an option'
    },
    options: {
        type: Array,
        default: () => []
    },
    error: {
        type: String,
        default: ''
    },
    helpText: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    },
    required: {
        type: Boolean,
        default: false
    }
});

defineEmits(['update:modelValue']);

// Support string array or object array with label & value
const normalizedOptions = computed(() => {
    return props.options.map((opt) => {
        if (typeof opt === 'object' && opt !== null) {
            return {
                value: opt.value ?? opt.id,
                label: opt.label ?? opt.name ?? opt.value
            };
        }
        return { value: opt, label: opt };
    });
});
</script>
