<template>
    <div>
        <div class="page-title">
            <h3>History records</h3>
        </div>

        <div class="history-chart">
            <canvas></canvas>
        </div>

        <Loader v-if="isLoading"/>

        <p class="center" v-else-if="!records.length">
            You have no records.
            <router-link to="/record">Add a new record</router-link>
        </p>

        <section v-else>
            <HistoryTable :records="records"/>
        </section>
    </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable';

export default {
    name: 'History',
    data: () => ({
        isLoading: true,
        records: [],
        categories: [],
    }),
    components: {
        HistoryTable
    },
    async mounted() {
        const records = await this.$store.dispatch('record/fetchRecords');
        this.categories = await this.$store.dispatch('category/fetchCategories');
        this.records = records.map(record => {
            return {
                ...record,
                categoryName: this.categories.find(c => c.id === record.categoryId).title,
                typeClass: record.type === 'income' ? 'green' : 'red',
                typeText: record.type === 'income' ? 'Income' : 'Expense'
            };
        });

        this.isLoading = false;
    }
};
</script>

<style scoped>

</style>
