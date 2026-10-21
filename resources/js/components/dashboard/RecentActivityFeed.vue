<template>
    <BaseCard title="Recent Activity Feed" subtitle="Real-time operational and financial events">
        <div class="space-y-4">
            <div
                v-for="(activity, idx) in activities"
                :key="idx"
                class="flex items-start space-x-3.5 pb-3.5 border-b border-border-main last:border-0 last:pb-0"
            >
                <div
                    :class="[
                        'w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5',
                        activity.iconBg
                    ]"
                >
                    <component :is="activity.icon" class="w-4 h-4" />
                </div>

                <div class="min-w-0 flex-1">
                    <p class="text-xs sm:text-sm font-semibold text-text-main leading-tight">
                        {{ activity.title }}
                    </p>
                    <p class="text-xs text-text-muted mt-0.5 leading-normal">
                        {{ activity.description }}
                    </p>
                    <span class="text-[11px] text-text-muted/80 mt-1 block">
                        {{ activity.time }}
                    </span>
                </div>

                <BaseBadge v-if="activity.badge" :variant="activity.badgeVariant" size="sm">
                    {{ activity.badge }}
                </BaseBadge>
            </div>
        </div>
    </BaseCard>
</template>

<script setup>
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';

defineProps({
    activities: {
        type: Array,
        default: () => []
    }
});
</script>
