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

        <!-- Input Wrapper -->
        <div class="relative rounded-xl">
            <!-- Prefix Icon -->
            <div
                v-if="$slots.prefix"
                class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted"
            >
                <slot name="prefix" />
            </div>

            <!-- Native Input -->
            <input
                :id="id"
                :type="type"
                :value="modelValue"
                :placeholder="placeholder"
                :disabled="disabled"
                :readonly="readonly"
                :autocomplete="autocomplete"
                @input="$emit('update:modelValue', $event.target.value)"
                @focus="$emit('focus', $event)"
                @blur="$emit('blur', $event)"
                :class="[
                    'w-full h-11 text-sm bg-white text-text-main rounded-xl border transition-all duration-150 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed',
                    $slots.prefix ? 'pl-10' : 'pl-3.5',
                    $slots.suffix ? 'pr-10' : 'pr-3.5',
                    error
                        ? 'border-danger focus:border-danger focus:ring-danger/20 text-danger'
                        : 'border-border-main focus:border-primary focus:ring-primary/20'
                ]"
            />

            <!-- Suffix Icon / Action -->
            <div
                v-if="$slots.suffix"
                class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-text-muted"
            >
                <slot name="suffix" />
            </div>
        </div>

        <!-- Error Message -->
        <p v-if="error" class="mt-1.5 text-xs text-danger font-medium flex items-center">
            <svg class="w-3.5 h-3.5 mr-1 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <span>{{ error }}</span>
        </p>

        <!-- Help text -->
        <p v-else-if="helpText" class="mt-1.5 text-xs text-text-muted">
            {{ helpText }}
        </p>
    </div>
</template>

<script setup>
defineProps({
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
        default: () => `input-${Math.random().toString(36).substring(2, 9)}`
    },
    type: {
        type: String,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: ''
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
    readonly: {
        type: Boolean,
        default: false
    },
    required: {
        type: Boolean,
        default: false
    },
    autocomplete: {
        type: String,
        default: 'off'
    }
});

defineEmits(['update:modelValue', 'focus', 'blur']);
</script>
