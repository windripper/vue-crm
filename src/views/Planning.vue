<template>
    <div>
        <div class="page-title">
            <h3>Planning</h3>
            <h4>{{ info.balance | currency('USD') }}</h4>
        </div>

        <Loader v-if="isLoading"/>

        <p class="center" v-else-if="!categories.length">
            You don't have any categories yet.
            <router-link to="/categories">Add a new category</router-link>
        </p>

        <section v-else>
            <div v-for="cat in categories" :key="cat.id">
                <p>
                    <strong>{{ cat.title }}:</strong>
                    Spent {{ cat.spent | currency }} out of {{ cat.limit | currency }}
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

export default {
    name: 'Planning',
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
            const tooltip = `${tooltipValue < 0 ? 'In excess of' : 'Left'}
             ${this.$options.filters.currency(Math.abs(tooltipValue))}`;

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
