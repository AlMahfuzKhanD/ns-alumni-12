<template>
    <BaseModal
        :is-open="isOpen"
        title="Record New Expense / Disbursed Voucher"
        max-width="xl"
        @close="closeModal"
    >
        <form @submit.prevent="submitExpense" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- Expense Title -->
                <div class="sm:col-span-2">
                    <label class="block text-xs font-semibold text-text-main mb-1">
                        Expense Description / Purpose <span class="text-danger">*</span>
                    </label>
                    <BaseInput
                        v-model="form.description"
                        placeholder="e.g. ICU Bed Allocation & Cardiac Medicine Bill"
                        required
                    />
                </div>

                <!-- Category -->
                <div>
                    <label class="block text-xs font-semibold text-text-main mb-1">
                        Expense Category <span class="text-danger">*</span>
                    </label>
                    <BaseSelect v-model="form.category" required>
                        <option value="Medical Support">Medical Support</option>
                        <option value="Teacher Support">Teacher Support</option>
                        <option value="Emergency Relief">Emergency Relief</option>
                        <option value="Event Expense">Event & Reunion Expense</option>
                        <option value="Administrative Expense">Administrative & Operational</option>
                        <option value="Printing & Stationery">Printing & Stationery</option>
                        <option value="Transportation">Transportation & Logistics</option>
                        <option value="Food & Refreshment">Food & Refreshment</option>
                        <option value="Miscellaneous">Miscellaneous</option>
                    </BaseSelect>
                </div>

                <!-- Link to Project -->
                <div>
                    <label class="block text-xs font-semibold text-text-main mb-1">
                        Linked Charity Campaign
                    </label>
                    <BaseSelect v-model="form.projectId">
                        <option value="">General Association Treasury</option>
                        <option value="1">Emergency Heart Surgery for Master Sir</option>
                        <option value="2">High School Science & Computer Lab</option>
                        <option value="3">Winter Warmth Drive 2025</option>
                    </BaseSelect>
                </div>

                <!-- Amount -->
                <div>
                    <label class="block text-xs font-semibold text-text-main mb-1">
                        Amount (BDT) <span class="text-danger">*</span>
                    </label>
                    <BaseInput
                        v-model.number="form.amount"
                        type="number"
                        min="10"
                        step="10"
                        placeholder="25000"
                        required
                    />
                </div>

                <!-- Expense Date -->
                <div>
                    <label class="block text-xs font-semibold text-text-main mb-1">
                        Disbursement Date <span class="text-danger">*</span>
                    </label>
                    <BaseInput
                        v-model="form.date"
                        type="date"
                        required
                    />
                </div>

                <!-- Payee / Vendor Name -->
                <div>
                    <label class="block text-xs font-semibold text-text-main mb-1">
                        Payee / Recipient / Vendor <span class="text-danger">*</span>
                    </label>
                    <BaseInput
                        v-model="form.payee"
                        placeholder="e.g. National Heart Foundation Cashier"
                        required
                    />
                </div>

                <!-- Payment Method -->
                <div>
                    <label class="block text-xs font-semibold text-text-main mb-1">
                        Payment Method <span class="text-danger">*</span>
                    </label>
                    <BaseSelect v-model="form.paymentMethod" required>
                        <option value="Bank Transfer">Bank Transfer (Cheque / BEFTN)</option>
                        <option value="Cash">Cash Handover</option>
                        <option value="bKash">bKash Merchant</option>
                        <option value="Nagad">Nagad</option>
                    </BaseSelect>
                </div>

                <!-- Voucher / Invoice No -->
                <div>
                    <label class="block text-xs font-semibold text-text-main mb-1">
                        Voucher / Invoice Reference # <span class="text-danger">*</span>
                    </label>
                    <BaseInput
                        v-model="form.voucherNo"
                        placeholder="e.g. VCH-2026-0104"
                        required
                    />
                </div>

                <!-- Authorized Signatory -->
                <div>
                    <label class="block text-xs font-semibold text-text-main mb-1">
                        Authorized By (Officer)
                    </label>
                    <BaseInput
                        v-model="form.authorizedBy"
                        placeholder="Treasurer / GS"
                    />
                </div>

                <!-- Voucher File Upload -->
                <div class="sm:col-span-2">
                    <label class="block text-xs font-semibold text-text-main mb-1">
                        Attach Money Voucher / Vendor Receipt Scan
                    </label>
                    <div class="border-2 border-dashed border-border-main rounded-xl p-3 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                        <UploadCloud class="w-5 h-5 text-slate-400 mx-auto mb-1" />
                        <p class="text-xs font-medium text-text-main">Click or drop signed money voucher</p>
                        <p class="text-[10px] text-text-muted">PDF, PNG, JPG (Required for annual audit ledger)</p>
                    </div>
                </div>

                <!-- Notes / Remarks -->
                <div class="sm:col-span-2">
                    <label class="block text-xs font-semibold text-text-main mb-1">
                        Notes / Committee Approval Reference
                    </label>
                    <BaseTextarea
                        v-model="form.notes"
                        rows="2"
                        placeholder="Reference resolution number from executive committee meeting..."
                    />
                </div>
            </div>

            <!-- Modal Footer Buttons -->
            <div class="flex items-center justify-end space-x-3 pt-4 border-t border-border-main">
                <BaseButton type="button" variant="outline" @click="closeModal">
                    Cancel
                </BaseButton>
                <BaseButton type="submit" variant="primary">
                    Record Expense Voucher
                </BaseButton>
            </div>
        </form>
    </BaseModal>
</template>

<script setup>
import { ref } from 'vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseSelect from '@/components/ui/BaseSelect.vue';
import BaseTextarea from '@/components/ui/BaseTextarea.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { UploadCloud } from 'lucide-vue-next';

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['close', 'created']);

const getTodayDate = () => new Date().toISOString().slice(0, 10);

const form = ref({
    description: '',
    category: 'Medical Support',
    projectId: '1',
    amount: null,
    date: getTodayDate(),
    payee: '',
    paymentMethod: 'Bank Transfer',
    voucherNo: `VCH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    authorizedBy: 'K. M. Jahangir Alam (Treasurer)',
    notes: ''
});

const closeModal = () => {
    emit('close');
};

const submitExpense = () => {
    emit('created', { ...form.value, id: Date.now() });
    form.value = {
        description: '',
        category: 'Medical Support',
        projectId: '',
        amount: null,
        date: getTodayDate(),
        payee: '',
        paymentMethod: 'Bank Transfer',
        voucherNo: `VCH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        authorizedBy: 'K. M. Jahangir Alam (Treasurer)',
        notes: ''
    };
    closeModal();
};
</script>
