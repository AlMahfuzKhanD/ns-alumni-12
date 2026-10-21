<template>
    <AuthLayout
        title="Apply for Membership"
        subtitle="Join the verified digital alumni network of Batch NS-12."
    >
        <form @submit.prevent="handleRegister" class="space-y-6">
            <!-- Step Navigation Tabs / Indicator -->
            <div class="flex items-center justify-between pb-3 border-b border-border-main text-xs font-semibold">
                <span
                    :class="step >= 1 ? 'text-primary' : 'text-text-muted'"
                    class="flex items-center space-x-1"
                >
                    <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px]" :class="step >= 1 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-600'">1</span>
                    <span>Account</span>
                </span>
                <span class="h-px w-6 bg-border-main"></span>
                <span
                    :class="step >= 2 ? 'text-primary' : 'text-text-muted'"
                    class="flex items-center space-x-1"
                >
                    <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px]" :class="step >= 2 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-600'">2</span>
                    <span>Alumni</span>
                </span>
                <span class="h-px w-6 bg-border-main"></span>
                <span
                    :class="step >= 3 ? 'text-primary' : 'text-text-muted'"
                    class="flex items-center space-x-1"
                >
                    <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px]" :class="step >= 3 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-600'">3</span>
                    <span>Profile</span>
                </span>
            </div>

            <!-- STEP 1: Account Credentials -->
            <div v-show="step === 1" class="space-y-4">
                <BaseInput
                    v-model="form.fullName"
                    label="Full Name (as per school certificate)"
                    placeholder="e.g. Tanvir Ahmed"
                    :error="errors.fullName"
                    required
                >
                    <template #prefix><User class="w-4 h-4 text-text-muted" /></template>
                </BaseInput>

                <BaseInput
                    v-model="form.phone"
                    label="Active Mobile Number"
                    placeholder="017XXXXXXXX"
                    help-text="Used for account login and emergency coordination."
                    :error="errors.phone"
                    required
                >
                    <template #prefix><Phone class="w-4 h-4 text-text-muted" /></template>
                </BaseInput>

                <BaseInput
                    v-model="form.email"
                    label="Email Address (Optional)"
                    placeholder="name@example.com"
                    type="email"
                >
                    <template #prefix><Mail class="w-4 h-4 text-text-muted" /></template>
                </BaseInput>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <BaseInput
                        v-model="form.password"
                        label="Password"
                        placeholder="At least 8 chars"
                        type="password"
                        :error="errors.password"
                        required
                    />
                    <BaseInput
                        v-model="form.passwordConfirmation"
                        label="Confirm Password"
                        placeholder="Re-type password"
                        type="password"
                        :error="errors.passwordConfirmation"
                        required
                    />
                </div>
            </div>

            <!-- STEP 2: Alumni Identity & Blood Group -->
            <div v-show="step === 2" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <BaseInput
                        v-model="form.batchYear"
                        label="Batch Year"
                        placeholder="2012"
                        :readonly="true"
                        help-text="Locked to NS-12 Alumni"
                        required
                    />

                    <BaseInput
                        v-model="form.rollNumber"
                        label="Class Roll / ID (Optional)"
                        placeholder="e.g. 104"
                        help-text="Helps verify identity faster"
                    />
                </div>

                <BaseSelect
                    v-model="form.bloodGroup"
                    label="Blood Group"
                    placeholder="Select Blood Group"
                    :options="['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']"
                    help-text="Vital for our rapid emergency blood donation network."
                    :error="errors.bloodGroup"
                    required
                />

                <div class="p-3.5 rounded-xl bg-amber-50 border border-amber-200/60 text-xs text-amber-900 leading-relaxed">
                    <strong>Identity Verification:</strong> Because member privacy is protected, the executive committee verifies each batchmate against the batch register before granting full access.
                </div>
            </div>

            <!-- STEP 3: Professional & Location -->
            <div v-show="step === 3" class="space-y-4">
                <BaseInput
                    v-model="form.profession"
                    label="Current Profession / Title"
                    placeholder="e.g. Software Engineer / Doctor / Banker / Businessman"
                    required
                />

                <BaseInput
                    v-model="form.organization"
                    label="Organization / Company"
                    placeholder="e.g. Dhaka Medical / Grameenphone / Self-employed"
                />

                <BaseInput
                    v-model="form.address"
                    label="Current City / Area"
                    placeholder="e.g. Dhanmondi, Dhaka"
                    required
                />

                <div class="pt-2">
                    <label class="flex items-start space-x-2 text-xs text-text-muted cursor-pointer">
                        <input
                            type="checkbox"
                            v-model="form.agreedToCode"
                            class="rounded border-border-main text-primary focus:ring-primary h-4 w-4 mt-0.5"
                            required
                        />
                        <span>
                            I pledge that I am an alumnus of Batch NS-12. I agree to respect all classmates, support our sick teachers, and abide by the association constitution.
                        </span>
                    </label>
                    <p v-if="errors.agreedToCode" class="text-xs text-danger font-medium mt-1">
                        {{ errors.agreedToCode }}
                    </p>
                </div>
            </div>

            <!-- Step Navigation Buttons -->
            <div class="pt-2 flex items-center justify-between gap-3">
                <BaseButton
                    v-if="step > 1"
                    variant="outline"
                    size="md"
                    type="button"
                    @click="step--"
                >
                    Back
                </BaseButton>
                <div v-else></div>

                <BaseButton
                    v-if="step < 3"
                    variant="primary"
                    size="md"
                    type="button"
                    @click="nextStep"
                >
                    Continue &rarr;
                </BaseButton>

                <BaseButton
                    v-else
                    variant="secondary"
                    size="md"
                    type="submit"
                    :loading="isLoading"
                >
                    Submit Membership Application
                </BaseButton>
            </div>

            <!-- Back to Login -->
            <div class="text-center pt-2 border-t border-border-main">
                <p class="text-xs text-text-muted">
                    Already an approved member?
                    <router-link to="/auth/login" class="font-bold text-primary hover:text-primary-hover ml-1">
                        Sign In Here
                    </router-link>
                </p>
            </div>
        </form>
    </AuthLayout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthLayout from '@/layouts/AuthLayout.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseSelect from '@/components/ui/BaseSelect.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { User, Phone, Mail } from 'lucide-vue-next';

const router = useRouter();

const step = ref(1);
const isLoading = ref(false);

const form = ref({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    batchYear: '2012',
    rollNumber: '',
    bloodGroup: '',
    profession: '',
    organization: '',
    address: '',
    agreedToCode: false
});

const errors = ref({
    fullName: '',
    phone: '',
    password: '',
    passwordConfirmation: '',
    bloodGroup: '',
    agreedToCode: ''
});

const nextStep = () => {
    errors.value = {};

    if (step.value === 1) {
        if (!form.value.fullName) {
            errors.value.fullName = 'Full Name is required';
            return;
        }
        if (!form.value.phone) {
            errors.value.phone = 'Mobile number is required';
            return;
        }
        if (!form.value.password || form.value.password.length < 6) {
            errors.value.password = 'Password must be at least 6 characters';
            return;
        }
        if (form.value.password !== form.value.passwordConfirmation) {
            errors.value.passwordConfirmation = 'Passwords do not match';
            return;
        }
        step.value = 2;
    } else if (step.value === 2) {
        if (!form.value.bloodGroup) {
            errors.value.bloodGroup = 'Please select your blood group';
            return;
        }
        step.value = 3;
    }
};

const handleRegister = () => {
    errors.value = {};

    if (!form.value.agreedToCode) {
        errors.value.agreedToCode = 'You must accept the batch pledge to proceed.';
        return;
    }

    isLoading.value = true;

    // Simulate registration submission
    setTimeout(() => {
        isLoading.value = false;
        router.push('/auth/pending-approval');
    }, 900);
};
</script>
