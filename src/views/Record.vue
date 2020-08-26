<template>
    <div>
        <div class="page-title">
            <h3>{{ 'RecordTitle' | localize }}</h3>
        </div>

        <Loader v-if="isLoading"/>

        <p class="center" v-else-if="!categories.length">
            {{ 'RecordWarning' | localize }}
            <router-link to="/categories">{{ 'RecordAddCategory' | localize }}</router-link>
        </p>

        <form class="form" v-else @submit.prevent="submitHandler">
            <div class="input-field">
                <select ref="select" v-model="category">
                    <option
                        v-for="c in categories"
                        :key="c.id"
                        :value="c.id"
                    >{{ c.title }}
                    </option>
                </select>
                <label>{{ 'RecordChooseCategory' | localize }}</label>
            </div>

            <p>
                <label>
                    <input
                        class="with-gap"
                        name="type"
                        type="radio"
                        value="income"
                        v-model="type"
                    />
                    <span>{{ 'RecordIncome' | localize }}</span>
                </label>
            </p>

            <p>
                <label>
                    <input
                        class="with-gap"
                        name="type"
                        type="radio"
                        value="expense"
                        v-model="type"
                    />
                    <span>{{ 'RecordExpense' | localize }}</span>
                </label>
            </p>

            <div class="input-field">
                <input
                    id="amount"
                    type="number"
                    v-model.number="amount"
                    :class="{ invalid: ($v.amount.$dirty && !$v.amount.minValue) }"
                >
                <label for="amount">{{ 'RecordTotal' | localize }}</label>
                <span
                    v-if="$v.amount.$dirty && !$v.amount.minValue"
                    class="helper-text invalid"
                >{{ 'RecordMinValue' | localize(amountMinValue) }}</span>
            </div>

            <div class="input-field">
                <input
                    id="description"
                    type="text"
                    v-model="description"
                    :class="{ invalid: ($v.description.$dirty && !$v.description.required) }"
                >
                <label for="description">{{ 'RecordDescription' | localize }}</label>
                <span
                    v-if="$v.description.$dirty && !$v.description.required"
                    class="helper-text invalid"
                >{{ 'RecordDescriptionValidator' | localize }}</span>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                {{ 'RecordCreate' | localize }}
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
import { minValue, required } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';

export default {
    name: 'NewRecord',
    metaInfo() {
        return {
            title: this.$title('RecordTitle')
        };
    },
    data: () => ({
        isLoading: true,
        categories: [],
        select: null,
        category: null,
        type: 'income',
        amount: 1,
        description: ''
    }),
    validations: {
        amount: { minValue: minValue(1) },
        description: { required }
    },
    computed: {
        ...mapGetters({ info: 'info/getInfo' }),
        canCreateRecord() {
            if (this.type === 'income') {
                return true;
            }

            return this.info.balance >= this.amount;
        },
        amountMinValue() {
            return this.$v.amount.$params.minValue.min;
        }
    },
    methods: {
        async submitHandler() {
            if (this.$v.$invalid) {
                this.$v.$touch();
                return;
            }

            if (this.canCreateRecord) {
                try {
                    await this.$store.dispatch('record/createRecord', {
                        categoryId: this.category,
                        amount: this.amount,
                        description: this.description,
                        type: this.type,
                        date: new Date().toJSON()
                    });

                    const balance = this.type === 'income'
                        ? this.info.balance + this.amount
                        : this.info.balance - this.amount;

                    await this.$store.dispatch('info/updateInfo', { balance });
                    this.$message('Record successfully created');
                    this.$v.$reset();
                    this.amount = 1;
                    this.description = '';
                } catch(e) {
                    throw e;
                }
            } else {
                // eslint-disable-next-line
                this.$message(`You don't have enough money on your account (${this.amount - this.info.balance})`);
            }
        }
    },
    async mounted() {
        this.categories = await this.$store.dispatch('category/fetchCategories');
        this.isLoading = false;

        if (this.categories.length) {
            this.category = this.categories[0].id;
        }

        this.$nextTick(() => {
            // eslint-disable-next-line
            this.select = M.FormSelect.init(this.$refs.select);
            // eslint-disable-next-line
            M.updateTextFields();
        });
    },
    beforeDestroy() {
        if (this.select && this.select.destroy) {
            this.select.destroy();
        }
    }
};
</script>

<style scoped>

</style>
