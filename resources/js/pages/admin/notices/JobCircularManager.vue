<template>
    <AdminLayout
        title="Job Circulars & Career Board"
        subtitle="Post career opportunities, manage recruitment circulars, and support alumni employment"
    >
        <div class="space-y-6">
            <!-- Top Metrics Row -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <BaseCard class="p-4 sm:p-5 border-l-4 border-l-primary flex items-center justify-between">
                    <div>
                        <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Active Circulars</p>
                        <p class="text-2xl font-black text-text-main mt-1">{{ activeJobsCount }}</p>
                        <p class="text-[11px] text-emerald-600 mt-1 font-medium flex items-center">
                            <span class="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                            Live for alumni applications
                        </p>
                    </div>
                    <div class="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Briefcase class="w-6 h-6" />
                    </div>
                </BaseCard>

                <BaseCard class="p-4 sm:p-5 border-l-4 border-l-secondary flex items-center justify-between">
                    <div>
                        <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Hiring Companies</p>
                        <p class="text-2xl font-black text-secondary mt-1">12</p>
                        <p class="text-[11px] text-text-muted mt-1">Alumni-founded & partner firms</p>
                    </div>
                    <div class="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                        <Building2 class="w-6 h-6" />
                    </div>
                </BaseCard>

                <BaseCard class="p-4 sm:p-5 border-l-4 border-l-accent flex items-center justify-between">
                    <div>
                        <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Remote / Hybrid</p>
                        <p class="text-2xl font-black text-text-main mt-1">5 Roles</p>
                        <p class="text-[11px] text-text-muted mt-1">Global & flexible positions</p>
                    </div>
                    <div class="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                        <Globe class="w-6 h-6" />
                    </div>
                </BaseCard>

                <BaseCard class="p-4 sm:p-5 border-l-4 border-l-slate-400 flex items-center justify-between">
                    <div>
                        <p class="text-xs font-semibold text-text-muted uppercase tracking-wider">Notice Board</p>
                        <p class="text-2xl font-black text-text-main mt-1">Notices</p>
                        <router-link to="/admin/notices" class="text-[11px] text-primary hover:underline mt-1 inline-flex items-center">
                            Notice Circulars <ArrowRight class="w-3 h-3 ml-1" />
                        </router-link>
                    </div>
                    <div class="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                        <Bell class="w-6 h-6" />
                    </div>
                </BaseCard>
            </div>

            <!-- Filters & Actions Header -->
            <BaseCard class="p-4 sm:p-6">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <!-- Search Input -->
                    <div class="relative flex-1 max-w-md">
                        <Search class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Search by job title, company, or tech stack..."
                            class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-border-main rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                    </div>

                    <!-- Filter Dropdowns & Create Button -->
                    <div class="flex flex-wrap items-center gap-3">
                        <select
                            v-model="jobTypeFilter"
                            class="px-3 py-2 bg-slate-50 border border-border-main rounded-xl text-sm text-text-main focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                            <option value="all">All Job Types</option>
                            <option value="Full-Time">Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Remote">Remote</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                        </select>

                        <select
                            v-model="statusFilter"
                            class="px-3 py-2 bg-slate-50 border border-border-main rounded-xl text-sm text-text-main focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        >
                            <option value="all">All Statuses</option>
                            <option value="active">Active (Open)</option>
                            <option value="closed">Closed</option>
                        </select>

                        <router-link to="/admin/notices">
                            <BaseButton variant="outline" size="sm">
                                <Bell class="w-4 h-4 mr-1.5" />
                                All Notices
                            </BaseButton>
                        </router-link>

                        <BaseButton variant="primary" size="sm" @click="openCreateModal">
                            <Plus class="w-4 h-4 mr-1.5" />
                            Post Job Circular
                        </BaseButton>
                    </div>
                </div>
            </BaseCard>

            <!-- Job Circulars Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BaseCard
                    v-for="job in filteredJobs"
                    :key="job.id"
                    class="p-5 flex flex-col justify-between hover:border-slate-300 transition-colors"
                >
                    <div class="space-y-4">
                        <!-- Top Header with Company & Role -->
                        <div class="flex items-start justify-between gap-3">
                            <div class="flex items-start space-x-3">
                                <div class="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-sm text-primary shrink-0">
                                    {{ getInitials(job.company) }}
                                </div>
                                <div>
                                    <h3 class="font-bold text-base text-text-main hover:text-primary transition-colors cursor-pointer" @click="viewJobDetail(job)">
                                        {{ job.title }}
                                    </h3>
                                    <p class="text-xs font-medium text-text-muted mt-0.5">
                                        {{ job.company }} • <span class="text-text-main font-semibold">{{ job.location }}</span>
                                    </p>
                                </div>
                            </div>

                            <div class="flex items-center space-x-1 shrink-0">
                                <button
                                    @click="editJob(job)"
                                    class="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-slate-100 transition-colors"
                                    title="Edit Job"
                                >
                                    <Edit3 class="w-4 h-4" />
                                </button>
                                <button
                                    @click="deleteJob(job)"
                                    class="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                                    title="Delete Job"
                                >
                                    <Trash2 class="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <!-- Badges row -->
                        <div class="flex flex-wrap items-center gap-2">
                            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-light text-primary">
                                {{ job.type }}
                            </span>
                            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                                {{ job.salaryRange }}
                            </span>
                            <BaseBadge :variant="job.status === 'active' ? 'secondary' : 'neutral'" size="sm">
                                <span class="capitalize">{{ job.status }}</span>
                            </BaseBadge>
                        </div>

                        <!-- Brief Description -->
                        <p class="text-xs text-text-muted line-clamp-2">
                            {{ job.description }}
                        </p>

                        <!-- Posted by Alumnus note -->
                        <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                            <div class="flex items-center space-x-2">
                                <UserCheck class="w-4 h-4 text-emerald-600" />
                                <span class="text-text-muted">
                                    Posted by: <strong class="text-text-main">{{ job.postedBy }}</strong>
                                </span>
                            </div>
                            <span class="text-[11px] text-slate-400">Deadline: {{ job.deadline }}</span>
                        </div>
                    </div>

                    <!-- Card Footer Actions -->
                    <div class="pt-4 mt-4 border-t border-border-main flex items-center justify-between">
                        <button
                            v-if="job.status === 'active'"
                            @click="toggleStatus(job, 'closed')"
                            class="text-xs text-slate-500 hover:text-rose-600 font-medium transition-colors"
                        >
                            Close Circular
                        </button>
                        <button
                            v-else
                            @click="toggleStatus(job, 'active')"
                            class="text-xs text-primary font-medium hover:underline"
                        >
                            Re-activate
                        </button>

                        <div class="flex items-center space-x-2">
                            <BaseButton variant="outline" size="sm" @click="viewJobDetail(job)">
                                <Eye class="w-3.5 h-3.5 mr-1" />
                                Details
                            </BaseButton>
                            <a :href="job.applyUrl" target="_blank" rel="noopener">
                                <BaseButton variant="primary" size="sm">
                                    <ExternalLink class="w-3.5 h-3.5 mr-1" />
                                    Apply Link
                                </BaseButton>
                            </a>
                        </div>
                    </div>
                </BaseCard>
            </div>

            <!-- Empty State -->
            <div v-if="filteredJobs.length === 0" class="text-center py-12 bg-white rounded-2xl border border-dashed border-border-main">
                <Briefcase class="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 class="text-base font-bold text-text-main">No job postings found</h4>
                <p class="text-xs text-text-muted mt-1">Try resetting search filters or post a new circular.</p>
            </div>
        </div>

        <!-- Post / Edit Job Circular Modal -->
        <BaseModal
            :is-open="isModalOpen"
            :title="isEditing ? 'Edit Job Circular' : 'Post New Career Opportunity'"
            max-width="2xl"
            @close="isModalOpen = false"
        >
            <form @submit.prevent="saveJob" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="sm:col-span-2">
                        <label class="block text-xs font-semibold text-text-main mb-1">
                            Job Role Title <span class="text-danger">*</span>
                        </label>
                        <BaseInput
                            v-model="form.title"
                            placeholder="e.g. Senior Laravel & Vue.js Full-Stack Engineer"
                            required
                        />
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-text-main mb-1">
                            Company / Employer Name <span class="text-danger">*</span>
                        </label>
                        <BaseInput
                            v-model="form.company"
                            placeholder="e.g. Pathao / Brain Station 23 / SiliconBD"
                            required
                        />
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-text-main mb-1">
                            Employment Type <span class="text-danger">*</span>
                        </label>
                        <BaseSelect v-model="form.type" required>
                            <option value="Full-Time">Full-Time (Onsite)</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Remote">Remote</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Contract">Contract / Project-based</option>
                            <option value="Internship">Internship</option>
                        </BaseSelect>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-text-main mb-1">
                            Workplace Location <span class="text-danger">*</span>
                        </label>
                        <BaseInput
                            v-model="form.location"
                            placeholder="e.g. Banani, Dhaka or Worldwide Remote"
                            required
                        />
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-text-main mb-1">
                            Salary Range / Compensation
                        </label>
                        <BaseInput
                            v-model="form.salaryRange"
                            placeholder="e.g. ৳80,000 – ৳1,20,000 / Negotiable"
                        />
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-text-main mb-1">
                            Application Deadline <span class="text-danger">*</span>
                        </label>
                        <BaseInput
                            v-model="form.deadline"
                            type="date"
                            required
                        />
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-text-main mb-1">
                            Application Email or Web URL <span class="text-danger">*</span>
                        </label>
                        <BaseInput
                            v-model="form.applyUrl"
                            placeholder="https://company.com/jobs or careers@company.com"
                            required
                        />
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-text-main mb-1">
                            Alumnus Reference / Poster Name
                        </label>
                        <BaseInput
                            v-model="form.postedBy"
                            placeholder="e.g. Engr. Farhan (Batch '12)"
                        />
                    </div>

                    <div class="sm:col-span-2">
                        <label class="block text-xs font-semibold text-text-main mb-1">
                            Job Description & Requirements <span class="text-danger">*</span>
                        </label>
                        <BaseTextarea
                            v-model="form.description"
                            rows="5"
                            placeholder="Outline key responsibilities, mandatory skillsets, experience required, and benefits..."
                            required
                        />
                    </div>
                </div>

                <div class="flex items-center justify-end space-x-3 pt-4 border-t border-border-main">
                    <BaseButton type="button" variant="outline" @click="isModalOpen = false">
                        Cancel
                    </BaseButton>
                    <BaseButton type="submit" variant="primary">
                        {{ isEditing ? 'Update Circular' : 'Post Circular' }}
                    </BaseButton>
                </div>
            </form>
        </BaseModal>

        <!-- View Job Details Modal -->
        <BaseModal
            :is-open="isDetailModalOpen"
            title="Job Opportunity Details"
            max-width="lg"
            @close="isDetailModalOpen = false"
        >
            <div v-if="selectedJob" class="space-y-4">
                <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div class="flex items-center space-x-3 mb-3">
                        <div class="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-base">
                            {{ getInitials(selectedJob.company) }}
                        </div>
                        <div>
                            <h3 class="font-bold text-base text-text-main">{{ selectedJob.title }}</h3>
                            <p class="text-xs text-text-muted">{{ selectedJob.company }} • {{ selectedJob.location }}</p>
                        </div>
                    </div>

                    <div class="flex flex-wrap gap-2 text-xs">
                        <span class="px-2 py-0.5 rounded bg-primary-light text-primary font-semibold">{{ selectedJob.type }}</span>
                        <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">{{ selectedJob.salaryRange }}</span>
                        <span class="px-2 py-0.5 rounded bg-slate-200 text-slate-800">Deadline: {{ selectedJob.deadline }}</span>
                    </div>
                </div>

                <div class="bg-white p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <h4 class="font-bold text-text-main uppercase text-[11px] tracking-wider text-slate-500">Responsibilities & Requirements:</h4>
                    <p class="text-text-main leading-relaxed whitespace-pre-line">{{ selectedJob.description }}</p>
                </div>

                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <span class="text-text-muted">Direct Referral Contact:</span>
                    <span class="font-bold text-text-main">{{ selectedJob.postedBy }}</span>
                </div>

                <div class="flex items-center justify-between pt-2">
                    <BaseButton variant="outline" size="sm" @click="isDetailModalOpen = false">
                        Close
                    </BaseButton>
                    <a :href="selectedJob.applyUrl" target="_blank" rel="noopener">
                        <BaseButton variant="primary" size="sm">
                            <ExternalLink class="w-3.5 h-3.5 mr-1" />
                            Apply on Portal / Send CV
                        </BaseButton>
                    </a>
                </div>
            </div>
        </BaseModal>
    </AdminLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseSelect from '@/components/ui/BaseSelect.vue';
import BaseTextarea from '@/components/ui/BaseTextarea.vue';
import {
    Briefcase,
    Building2,
    Globe,
    Bell,
    ArrowRight,
    Search,
    Plus,
    Edit3,
    Trash2,
    UserCheck,
    Eye,
    ExternalLink
} from 'lucide-vue-next';

const searchQuery = ref('');
const jobTypeFilter = ref('all');
const statusFilter = ref('all');

const isModalOpen = ref(false);
const isEditing = ref(false);
const isDetailModalOpen = ref(false);
const selectedJob = ref(null);

const form = ref({
    id: null,
    title: '',
    company: '',
    type: 'Full-Time',
    location: '',
    salaryRange: '',
    deadline: '',
    applyUrl: '',
    postedBy: 'Engr. Farhan (Batch 2012)',
    description: '',
    status: 'active'
});

const jobs = ref([
    {
        id: 1,
        title: 'Lead Software Architect (Laravel & Cloud)',
        company: 'DataSoft Systems BD',
        type: 'Full-Time',
        location: 'Gulshan 2, Dhaka',
        salaryRange: '৳1,50,000 – ৳2,00,000',
        deadline: '2026-11-20',
        applyUrl: 'https://careers.datasoft-bd.com',
        postedBy: 'Kazi Mahbub (Batch 2012)',
        description: 'Seeking an experienced lead engineer to architect cloud-native web services and financial processing microservices using PHP 8.2+, Laravel, Docker, and PostgreSQL.',
        status: 'active'
    },
    {
        id: 2,
        title: 'Senior Frontend Engineer (Vue 3 / TypeScript)',
        company: 'NextGen Fintech Labs',
        type: 'Remote',
        location: 'Remote (BD / Global)',
        salaryRange: '৳1,20,000 – ৳1,60,000',
        deadline: '2026-11-15',
        applyUrl: 'mailto:jobs@nextgenfintech.io',
        postedBy: 'Tanvir Hossain (Batch 2012)',
        description: 'Join our distributed engineering squad building high-throughput payment dashboards and mobile-responsive financial user interfaces.',
        status: 'active'
    },
    {
        id: 3,
        title: 'Senior Audit & Accounts Officer',
        company: 'Square Pharmaceuticals Ltd.',
        type: 'Full-Time',
        location: 'Uttara, Dhaka',
        salaryRange: '৳65,000 – ৳85,000',
        deadline: '2026-11-05',
        applyUrl: 'https://squarepharma.com.bd/careers',
        postedBy: 'Md. Rafiqul Hasan (Batch 2012)',
        description: 'Looking for CA CC or M.Com graduates with 3+ years experience in corporate balance sheets, VAT/tax submissions, and internal compliance auditing.',
        status: 'active'
    },
    {
        id: 4,
        title: 'Digital Marketing & Community Manager',
        company: 'Creative Media Agency',
        type: 'Hybrid',
        location: 'Dhanmondi, Dhaka',
        salaryRange: '৳45,000 – ৳60,000',
        deadline: '2026-10-31',
        applyUrl: 'https://creativemedia.com/join',
        postedBy: 'Mehedi Hasan (Batch 2012)',
        description: 'Manage brand social campaigns, video creative storytelling, SEO strategy, and community engagement for high-growth tech clients.',
        status: 'active'
    }
]);

const activeJobsCount = computed(() => jobs.value.filter(j => j.status === 'active').length);

const filteredJobs = computed(() => {
    return jobs.value.filter(j => {
        const matchesSearch =
            j.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            j.company.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            j.location.toLowerCase().includes(searchQuery.value.toLowerCase());

        const matchesType = jobTypeFilter.value === 'all' || j.type === jobTypeFilter.value;
        const matchesStatus = statusFilter.value === 'all' || j.status === statusFilter.value;

        return matchesSearch && matchesType && matchesStatus;
    });
});

const getInitials = (name) => {
    if (!name) return 'NS';
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
};

const openCreateModal = () => {
    isEditing.value = false;
    form.value = {
        id: null,
        title: '',
        company: '',
        type: 'Full-Time',
        location: '',
        salaryRange: '',
        deadline: '',
        applyUrl: '',
        postedBy: 'Engr. Farhan (Batch 2012)',
        description: '',
        status: 'active'
    };
    isModalOpen.value = true;
};

const editJob = (job) => {
    isEditing.value = true;
    form.value = { ...job };
    isModalOpen.value = true;
};

const saveJob = () => {
    if (isEditing.value) {
        const idx = jobs.value.findIndex(j => j.id === form.value.id);
        if (idx !== -1) {
            jobs.value[idx] = { ...form.value };
        }
    } else {
        jobs.value.unshift({
            ...form.value,
            id: Date.now()
        });
    }
    isModalOpen.value = false;
};

const deleteJob = (job) => {
    if (confirm(`Are you sure you want to delete circular "${job.title}"?`)) {
        jobs.value = jobs.value.filter(j => j.id !== job.id);
    }
};

const toggleStatus = (job, newStatus) => {
    job.status = newStatus;
};

const viewJobDetail = (job) => {
    selectedJob.value = job;
    isDetailModalOpen.value = true;
};
</script>
