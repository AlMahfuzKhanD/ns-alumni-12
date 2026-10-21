<template>
    <BaseCard title="Active Charity Campaigns" subtitle="Fundraising targets and real-time community pledges">
        <div class="space-y-5">
            <div
                v-for="proj in projects"
                :key="proj.id"
                class="p-4 rounded-xl border border-border-main bg-slate-50/60 hover:bg-slate-50 transition-colors"
            >
                <div class="flex items-center justify-between">
                    <span class="text-xs font-bold text-primary font-mono">{{ proj.code }}</span>
                    <BaseBadge variant="secondary" dot size="sm">Running</BaseBadge>
                </div>

                <h4 class="text-sm font-bold text-text-main mt-1 line-clamp-1">
                    {{ proj.title }}
                </h4>

                <div class="mt-3 space-y-1.5">
                    <div class="flex items-center justify-between text-xs">
                        <span class="font-bold text-secondary">৳ {{ proj.collected.toLocaleString() }}</span>
                        <span class="text-text-muted">Target: ৳ {{ proj.target.toLocaleString() }}</span>
                    </div>

                    <div class="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                            class="bg-secondary h-2 rounded-full transition-all"
                            :style="{ width: `${Math.min(100, (proj.collected / proj.target) * 100)}%` }"
                        ></div>
                    </div>

                    <div class="flex items-center justify-between text-[11px] text-text-muted pt-0.5">
                        <span>{{ Math.round((proj.collected / proj.target) * 100) }}% Completed</span>
                        <span>{{ proj.donors }} Pledges</span>
                    </div>
                </div>
            </div>
        </div>
    </BaseCard>
</template>

<script setup>
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';

defineProps({
    projects: {
        type: Array,
        default: () => []
    }
});
</script>
