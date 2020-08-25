<template>
    <div>
        <Loader v-if="isLoading"/>
        <div v-else class="app-main-layout">
            <Navbar @toggle-sidebar="isOpen = !isOpen"/>

            <Sidebar v-model="isOpen"/>

            <main class="app-content" :class="{ full: !isOpen }">
                <div class="app-page">
                    <router-view/>
                </div>
            </main>

            <div class="fixed-action-btn">
                <router-link
                    class="btn-floating btn-large blue"
                    to="/record"
                    v-tooltip="'Create a new record'"
                >
                    <i class="large material-icons">add</i>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/app/Navbar';
import Sidebar from '@/components/app/Sidebar';
import messages from '@/utils/messages';

export default {
    name: 'MainLayout',
    components: {
        Navbar,
        Sidebar
    },
    data: () => ({
        isOpen: true,
        isLoading: true
    }),
    computed: {
        error() {
            return this.$store.getters.getError;
        }
    },
    watch: {
        error(fbError) {
            this.$error(messages[fbError.code] || 'Something went wrong');
        }
    },
    async mounted() {
        if (!Object.keys(this.$store.getters['info/getInfo']).length) {
            await this.$store.dispatch('info/fetchInfo');
        }

        this.isLoading = false;
    }
};
</script>

<style scoped>

</style>
