<template>
    <PublicLayout>
        <!-- Header -->
        <section class="bg-gradient-to-b from-primary-light/40 to-surface-bg py-16 border-b border-border-main">
            <div class="max-w-7xl mx-auto px-4 text-center">
                <span class="text-xs font-bold text-primary uppercase tracking-wider bg-white border border-primary/20 px-3.5 py-1 rounded-full shadow-xs">
                    Get in Touch & Emergency Support
                </span>
                <h1 class="text-3xl sm:text-5xl font-black text-text-main mt-4 tracking-tight">
                    Contact & Assistance
                </h1>
                <p class="text-sm sm:text-base text-text-muted mt-3 max-w-2xl mx-auto">
                    Have questions or need emergency assistance for an alumni batchmate or mentor? Reach out to our committee anytime.
                </p>
            </div>
        </section>

        <!-- Main Content -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
            <!-- 2-Col: Emergency Hotline + Message Form -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Left: Emergency & Contact Cards -->
                <div class="space-y-6">
                    <!-- Urgent Card -->
                    <div class="p-6 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white shadow-sm space-y-3">
                        <div class="flex items-center space-x-2">
                            <PhoneCall class="w-5 h-5 text-white animate-pulse" />
                            <span class="text-xs font-bold uppercase tracking-wider text-red-100">Emergency 24/7 Hotline</span>
                        </div>
                        <h3 class="text-xl font-black">Medical & Blood Emergency</h3>
                        <p class="text-xs text-red-100 leading-relaxed">
                            For urgent ICU assistance, blood requests, or sudden bereavement coordination, contact our emergency desk directly.
                        </p>
                        <div class="pt-2">
                            <span class="font-mono font-black text-lg bg-white/20 px-3 py-1.5 rounded-xl inline-block tracking-wider">
                                +880 1700-000000
                            </span>
                        </div>
                    </div>

                    <!-- General Association Inquiries -->
                    <BaseCard title="Association Secretarial Desk" subtitle="Operational & administrative inquiries">
                        <ul class="space-y-3 text-xs text-text-muted">
                            <li class="flex items-start space-x-3">
                                <Mail class="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                <div>
                                    <span class="font-semibold text-text-main block">Official Email</span>
                                    <span>contact@nsalumni12.org</span>
                                </div>
                            </li>
                            <li class="flex items-start space-x-3">
                                <MapPin class="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                <div>
                                    <span class="font-semibold text-text-main block">Liaison Office</span>
                                    <span>NS-12 Secretariat, Dhanmondi, Dhaka, Bangladesh</span>
                                </div>
                            </li>
                        </ul>
                    </BaseCard>
                </div>

                <!-- Right: Send Message Form -->
                <div class="lg:col-span-2">
                    <BaseCard title="Send Us a Message" subtitle="Committee members will respond within 24 hours">
                        <form @submit.prevent="handleSubmit" class="space-y-4">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <BaseInput
                                    v-model="form.name"
                                    label="Your Full Name"
                                    placeholder="e.g. Tanvir Ahmed"
                                    required
                                />

                                <BaseInput
                                    v-model="form.phone"
                                    label="Phone Number"
                                    placeholder="017XXXXXXXX"
                                    required
                                />
                            </div>

                            <BaseInput
                                v-model="form.email"
                                label="Email Address (Optional)"
                                placeholder="name@example.com"
                                type="email"
                            />

                            <BaseInput
                                v-model="form.subject"
                                label="Subject"
                                placeholder="What is your inquiry regarding?"
                                required
                            />

                            <BaseTextarea
                                v-model="form.message"
                                label="Message Details"
                                placeholder="Write your message, suggestion, or request here..."
                                rows="4"
                                required
                            />

                            <div class="pt-2 flex justify-end">
                                <BaseButton variant="primary" type="submit" :loading="isSubmitting">
                                    Send Message
                                </BaseButton>
                            </div>
                        </form>
                    </BaseCard>
                </div>
            </div>

            <!-- FAQ Accordion Section -->
            <div class="space-y-6">
                <div class="text-center max-w-xl mx-auto">
                    <span class="text-xs font-bold text-primary uppercase tracking-wider">Answers to Common Questions</span>
                    <h2 class="text-2xl font-black text-text-main mt-1">Frequently Asked Questions</h2>
                </div>

                <div class="max-w-3xl mx-auto space-y-4">
                    <BaseCard
                        v-for="(faq, idx) in faqs"
                        :key="idx"
                        hoverable
                        class="cursor-pointer"
                        @click="faq.open = !faq.open"
                    >
                        <div class="flex items-center justify-between">
                            <h4 class="text-sm font-bold text-text-main flex items-center space-x-2">
                                <HelpCircle class="w-4 h-4 text-primary shrink-0" />
                                <span>{{ faq.question }}</span>
                            </h4>
                            <ChevronDown
                                :class="['w-4 h-4 text-text-muted transition-transform duration-200', faq.open ? 'rotate-180' : '']"
                            />
                        </div>

                        <p v-if="faq.open" class="mt-3 text-xs text-text-muted border-t border-border-main pt-3 leading-relaxed">
                            {{ faq.answer }}
                        </p>
                    </BaseCard>
                </div>
            </div>
        </section>
    </PublicLayout>
</template>

<script setup>
import { ref } from 'vue';
import PublicLayout from '@/layouts/PublicLayout.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseTextarea from '@/components/ui/BaseTextarea.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { PhoneCall, Mail, MapPin, HelpCircle, ChevronDown } from 'lucide-vue-next';

const isSubmitting = ref(false);
const form = ref({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
});

const faqs = ref([
    {
        question: 'Who can register as a member of this portal?',
        answer: 'Any alumnus who studied in Batch NS-12 can register. Each registration is verified by the executive committee against the batch registry before account activation.',
        open: true
    },
    {
        question: 'How is 100% financial transparency guaranteed?',
        answer: 'All subscriptions (chada) and charity project donations create permanent records in our central financial ledger. Expense vouchers and bank statements are published on project detail pages for every member to audit.',
        open: false
    },
    {
        question: 'How are emergency medical funds distributed?',
        answer: 'When a classmate or teacher requires emergency hospital support, the committee visits the hospital, inspects official vouchers, and directly disburses funds to the hospital billing desk with transparent receipts.',
        open: false
    },
    {
        question: 'Can external non-alumni donors contribute to charity projects?',
        answer: 'Yes! Well-wishers and sponsors can donate to any active humanitarian project using our bKash, Nagad, or Bank channels. They will receive an official digital acknowledgment receipt.',
        open: false
    }
]);

const handleSubmit = () => {
    isSubmitting.value = true;
    setTimeout(() => {
        isSubmitting.value = false;
        alert('Thank you! Your message has been transmitted to the NS-12 secretarial desk.');
        form.value = { name: '', phone: '', email: '', subject: '', message: '' };
    }, 800);
};
</script>
