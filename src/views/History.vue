<template>
    <div>
        <div class="page-title">
            <h3>{{ 'HistoryTitle' | localize }}</h3>
        </div>

        <div class="history-chart">
            <HistoryChart
                v-if="categories.length"
                :records="records"
                :categories="categories"
            />
        </div>

        <Loader v-if="isLoading"/>

        <p class="center" v-else-if="!records.length">
            {{ 'HistoryWarning' | localize }}
            <router-link to="/record">{{ 'HistoryRecordLink' | localize }}</router-link>
        </p>

        <section v-else>
            <HistoryTable :records="pageData"/>

            <Paginate
                v-model="page"
                :page-count="pageCount"
                :click-handler="pageChangeHandler"
                :prev-text="prevText"
                :next-text="nextText"
                :container-class="'pagination'"
                :page-class="'waves-effect'"
            />
        </section>
    </div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin';
import HistoryTable from '@/components/HistoryTable';
import HistoryChart from '@/components/HistoryChart';

export default {
    name: 'History',
    mixins: [paginationMixin],
    data: () => ({
        isLoading: true,
        records: [],
        categories: []
    }),
    metaInfo() {
        return {
            title: this.$title('HistoryTitle')
        };
    },
    components: {
        HistoryChart,
        HistoryTable
    },
    computed: {
        prevText() {
            const locale = this.$store.getters['info/getInfo'].locale || 'en-US';
            return locale === 'en-US' ? 'Prev' : 'Назад';
        },
        nextText() {
            const locale = this.$store.getters['info/getInfo'].locale || 'en-US';
            return locale === 'en-US' ? 'Next' : 'Вперед';
        }
    },
    methods: {
        setup(categories) {
            this.setPagination(this.records.map(record => {
                return {
                    ...record,
                    categoryName: categories.find(c => c.id === record.categoryId).title,
                    typeClass: record.type === 'income' ? 'green' : 'red',
                    typeText: record.type === 'income' ? 'Income' : 'Expense'
                };
            }));
        }
    },
    async mounted() {
        this.records = await this.$store.dispatch('record/fetchRecords');
        this.categories = await this.$store.dispatch('category/fetchCategories');

        this.setup(this.categories);

        this.isLoading = false;
    }
};
</script>

<style scoped>

</style>
