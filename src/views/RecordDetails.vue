<template>
    <div>
        <Loader v-if="isLoading"/>
        <div v-else-if="record">
            <div class="breadcrumb-wrap">
                <router-link to="/history" class="breadcrumb">History</router-link>
                <a class="breadcrumb">
                    {{ record.type === 'income' ? 'Income' : 'Expense' }}
                </a>
            </div>
            <div class="row">
                <div class="col s12 m6">
                    <div
                        class="card"
                        :class="record.recordClass"
                    >
                        <div class="card-content white-text">
                            <p>Description: {{ record.description }}</p>
                            <p>Total: {{ record.amount | currency }}</p>
                            <p>Category: {{ record.categoryName }}</p>

                            <small>{{ record.date | date('datetime') }}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p class="center" v-else>Oops, record with id: {{ $route.params.id }} not found</p>
    </div>
</template>

<script>
export default {
    name: 'RecordDetails',
    data: () => ({
        record: null,
        isLoading: true,
    }),
    async mounted() {
        const { id } = this.$route.params;
        const record = await this.$store.dispatch('record/fetchRecordById', id);
        // eslint-disable-next-line
        const category = await this.$store.dispatch('category/fetchCategoryById', record.categoryId);

        this.record = {
            ...record,
            categoryName: category.title,
            recordClass: record.type === 'income' ? 'green' : 'red'
        };

        this.isLoading = false;
    }
};
</script>

<style scoped>

</style>
