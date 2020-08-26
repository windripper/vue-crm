<template>
    <div>
        <Loader v-if="isLoading"/>
        <div v-else-if="record">
            <div class="breadcrumb-wrap">
                <router-link to="/history" class="breadcrumb">
                    {{ 'RecordHistory' | localize }}
                </router-link>
                <a class="breadcrumb">
                    {{ recordType | localize }}
                </a>
            </div>
            <div class="row">
                <div class="col s12 m6">
                    <div
                        class="card"
                        :class="record.recordClass"
                    >
                        <div class="card-content white-text">
                            <p>{{ 'RecordDescription' | localize }}: {{ record.description }}</p>
                            <p>{{ 'RecordTotal' | localize }}: {{ record.amount | currency }}</p>
                            <p>{{ 'RecordCategory' | localize }}: {{ record.categoryName }}</p>

                            <small>{{ record.date | date('datetime') }}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p class="center" v-else>{{ 'RecordNotFound' | localize($route.params.id) }}</p>
    </div>
</template>

<script>
export default {
    name: 'RecordDetails',
    metaInfo() {
        return {
            title: this.$title('RecordDetailsTitle')
        };
    },
    data: () => ({
        record: null,
        isLoading: true,
    }),
    computed: {
        recordType() {
            return this.record.type === 'income' ? 'RecordIncome' : 'RecordExpense';
        }
    },
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
