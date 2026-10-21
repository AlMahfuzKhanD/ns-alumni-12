<template>
    <BaseCard title="Cash Flow & Monthly Financial Movement" subtitle="Income vs Expense distribution (Last 6 Months)">
        <template #header-action>
            <div class="flex items-center space-x-3 text-xs">
                <span class="flex items-center space-x-1.5">
                    <span class="w-3 h-3 rounded-full bg-secondary"></span>
                    <span class="text-text-muted">Income</span>
                </span>
                <span class="flex items-center space-x-1.5">
                    <span class="w-3 h-3 rounded-full bg-danger"></span>
                    <span class="text-text-muted">Expense</span>
                </span>
            </div>
        </template>

        <div class="space-y-6">
            <!-- Simulated Visual Bar Chart -->
            <div class="h-48 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-border-main">
                <div
                    v-for="month in data"
                    :key="month.name"
                    class="flex-1 flex flex-col items-center h-full justify-end group"
                >
                    <div class="w-full flex items-end justify-center space-x-1.5 h-36">
                        <!-- Income Bar -->
                        <div
                            class="w-3 sm:w-5 bg-secondary rounded-t-md transition-all duration-300 group-hover:brightness-110"
                            :style="{ height: `${(month.income / maxVal) * 100}%` }"
                            :title="`Income: ৳ ${month.income.toLocaleString()}`"
                        ></div>
                        <!-- Expense Bar -->
                        <div
                            class="w-3 sm:w-5 bg-danger/80 rounded-t-md transition-all duration-300 group-hover:brightness-110"
                            :style="{ height: `${(month.expense / maxVal) * 100}%` }"
                            :title="`Expense: ৳ ${month.expense.toLocaleString()}`"
                        ></div>
                    </div>
                    <span class="text-[11px] font-semibold text-text-muted mt-2 truncate w-full text-center">
                        {{ month.name }}
                    </span>
                </div>
            </div>

            <!-- Financial Metrics Summary Grid -->
            <div class="grid grid-cols-3 gap-4 pt-2 text-center text-xs">
                <div class="p-3 bg-secondary-light/40 rounded-xl border border-secondary/20">
                    <span class="text-text-muted block">Total Income (6M)</span>
                    <span class="text-base font-extrabold text-secondary mt-0.5 block">৳ 4,85,000</span>
                </div>
                <div class="p-3 bg-red-50 rounded-xl border border-red-200/40">
                    <span class="text-text-muted block">Total Expense (6M)</span>
                    <span class="text-base font-extrabold text-danger mt-0.5 block">৳ 3,20,000</span>
                </div>
                <div class="p-3 bg-primary-light/40 rounded-xl border border-primary/20">
                    <span class="text-text-muted block">Net Surplus Fund</span>
                    <span class="text-base font-extrabold text-primary mt-0.5 block">৳ 1,65,000</span>
                </div>
            </div>
        </div>
    </BaseCard>
</template>

<script setup>
import { computed } from 'vue';
import BaseCard from '@/components/ui/BaseCard.vue';

const props = defineProps({
    data: {
        type: Array,
        default: () => [
            { name: 'May', income: 75000, expense: 40000 },
            { name: 'Jun', income: 68000, expense: 55000 },
            { name: 'Jul', income: 92000, expense: 62000 },
            { name: 'Aug', income: 84000, expense: 38000 },
            { name: 'Sep', income: 110000, expense: 80000 },
            { name: 'Oct', income: 56000, expense: 45000 }
        ]
    }
});

const maxVal = computed(() => {
    const highest = Math.max(...props.data.map(d => Math.max(d.income, d.expense)));
    return highest > 0 ? highest * 1.15 : 100000;
});
</script>
