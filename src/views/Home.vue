<template>
    <div>
        <div class="page-title">
            <h3>{{ 'HomeTitle' | localize}}</h3>

            <button class="btn waves-effect waves-light btn-small" @click="refresh">
                <i class="material-icons">refresh</i>
            </button>
        </div>

        <Loader v-if="isLoading"/>

        <div v-else class="row">

            <HomeBalance
                :rates="currency.rates"
            />

            <HomeCurrency
                :rates="currency.rates"
                :date="currency.date"
            />
        </div>
    </div>
</template>

<script>
import HomeBalance from '@/components/HomeBalance';
import HomeCurrency from '@/components/HomeCurrency';

export default {
    name: 'Home',
    components: {
        HomeBalance,
        HomeCurrency
    },
    metaInfo() {
        return {
            title: this.$title('HomeTitle')
        };
    },
    data: () => ({
        isLoading: true,
        currency: null
    }),
    methods: {
        async refresh() {
            this.isLoading = true;
            this.currency = await this.$store.dispatch('info/fetchCurrency');
            this.isLoading = false;
        }
    },
    async mounted() {
        this.currency = await this.$store.dispatch('info/fetchCurrency');
        this.isLoading = false;
    }
};
</script>
