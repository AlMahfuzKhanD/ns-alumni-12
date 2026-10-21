<template>
    <div class="w-full bg-white rounded-2xl border border-border-main shadow-xs overflow-hidden">
        <!-- Table Toolbar Slot (Search, Filters, Export) -->
        <div
            v-if="$slots.toolbar"
            class="p-4 border-b border-border-main bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        >
            <slot name="toolbar" />
        </div>

        <!-- Table Container -->
        <div class="relative overflow-x-auto">
            <!-- Loading Indicator Overlay -->
            <div
                v-if="loading"
                class="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center z-10"
            >
                <div class="flex items-center space-x-2 text-primary font-medium text-sm">
                    <svg class="animate-spin h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading data...</span>
                </div>
            </div>

            <table class="w-full text-left border-collapse text-sm text-text-main">
                <!-- Header -->
                <thead class="bg-slate-50 text-xs font-semibold text-text-muted uppercase tracking-wider border-b border-border-main">
                    <tr>
                        <slot name="head" />
                    </tr>
                </thead>

                <!-- Body -->
                <tbody class="divide-y divide-border-main bg-white">
                    <slot name="body">
                        <!-- Default empty state if no rows provided -->
                        <tr v-if="!loading && empty">
                            <td :colspan="colSpan" class="py-12 text-center text-text-muted">
                                <slot name="empty">
                                    <div class="flex flex-col items-center justify-center">
                                        <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                            </svg>
                                        </div>
                                        <p class="text-sm font-medium text-text-main">No records found</p>
                                        <p class="text-xs text-text-muted mt-1">There is no data matching your current filter.</p>
                                    </div>
                                </slot>
                            </td>
                        </tr>
                    </slot>
                </tbody>
            </table>
        </div>

        <!-- Pagination Bar Slot -->
        <div
            v-if="$slots.pagination"
            class="px-4 py-3 border-t border-border-main bg-slate-50/70 flex items-center justify-between"
        >
            <slot name="pagination" />
        </div>
    </div>
</template>

<script setup>
defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    empty: {
        type: Boolean,
        default: false
    },
    colSpan: {
        type: [Number, String],
        default: 6
    }
});
</script>
