<template>
    <div>
        <div class="page-title">
            <h3>{{ 'PlanningTitle' | localize }}</h3>
            <h4>{{ info.balance | currency('USD') }}</h4>
        </div>

        <Loader v-if="isLoading"/>

        <p class="center" v-else-if="!categories.length">
            {{ 'PlanningWarning' | localize }}
            <router-link to="/categories">{{ 'PlanningAddCategory' | localize }}</router-link>
        </p>

        <section v-else>
            <div v-for="cat in categories" :key="cat.id">
                <p>
                    <strong>{{ cat.title }}:</strong>
                    {{ 'PlanningSpent' | localize }}
                    {{ cat.spent | currency }}
                    {{ 'PlanningOutOf' | localize }}
                    {{ cat.limit | currency }}
                </p>
                <div class="progress" v-tooltip="cat.tooltip">
                    <div
                        class="determinate"
                        :class="cat.progressColor"
                        :style="{ width: cat.progressLine + '%' }"
                    ></div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import localizeFilter from '@/filters/localize.filter';

export default {
    name: 'Planning',
    metaInfo() {
        return {
            title: this.$title('PlanningTitle')
        };
    },
    data: () => ({
        isLoading: true,
        categories: [],
    }),
    computed: {
        ...mapGetters({ info: 'info/getInfo' })
    },
    async mounted() {
        const records = await this.$store.dispatch('record/fetchRecords');
        const categories = await this.$store.dispatch('category/fetchCategories');

        this.categories = categories.map(cat => {
            const spent = records
                .filter(record => record.categoryId === cat.id)
                .filter(record => record.type === 'expense')
                .reduce((total, record) => {
                    return total += +record.amount;
                }, 0);

            const percent = 100 * spent / cat.limit;
            const progressLine = percent > 100 ? 100 : percent;
            const progressColor = percent < 60
                ? 'green'
                : percent < 100
                    ? 'yellow'
                    : 'red';

            const tooltipValue = cat.limit - spent;
            const valueToLocalize = `${tooltipValue < 0 ? 'PlanningExcess' : 'PlanningLeft'}`;
            const tooltip = localizeFilter(valueToLocalize)
                + `${this.$options.filters.currency(Math.abs(tooltipValue))}`;

            return {
                ...cat,
                progressLine,
                progressColor,
                spent,
                tooltip
            };
        });

        this.isLoading = false;
    }
};
</script>

<style scoped>

</style>
