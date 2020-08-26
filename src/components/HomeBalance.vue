<template>
    <div class="col s12 m6 l4">
        <div class="card light-blue bill-card">
            <div class="card-content white-text">
                <span class="card-title">{{ 'HomeBalance' | localize }}</span>

                <p
                    class="currency-line"
                    v-for="cur in currencies"
                    :key="cur"
                >
                    <span>
                        {{ getCurrency(cur) | currency(cur) }}
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomeBalance',
    props: ['rates'],
    data: () => ({
        currencies: ['USD', 'EUR', 'GBP']
    }),
    computed: {
        base() {
            // eslint-disable-next-line max-len
            return this.$store.getters['info/getInfo'].balance / (this.rates['USD'] / this.rates['EUR']);
        }
    },
    methods: {
        getCurrency(currency) {
            return Math.floor(this.base * this.rates[currency]);
        }
    }
};
</script>

<style scoped>

</style>
