<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>{{ 'CategoryCreateTitle' | localize }}</h4>
            </div>

            <form @submit.prevent="submitHandler">
                <div class="input-field">
                    <input
                        id="name"
                        type="text"
                        v-model="title"
                        :class="{ invalid: ($v.title.$dirty && !$v.title.required) }"
                    >
                    <label for="name">{{ 'CategoryName' | localize }}</label>
                    <span
                        v-if="$v.title.$dirty && !$v.title.required"
                        class="helper-text invalid"
                    >{{ 'CategoryNameValidator' | localize }}</span>
                </div>

                <div class="input-field">
                    <input
                        id="limit"
                        type="number"
                        v-model.number="limit"
                        :class="{ invalid: ($v.limit.$dirty && !$v.limit.minValue) }"
                    >
                    <label for="limit">{{ 'CategoryLimit' | localize }}</label>
                    <span
                        v-if="$v.limit.$dirty && !$v.limit.minValue"
                        class="helper-text invalid"
                    >{{ 'CategoryLimitValidator' | localize(minLimit) }}</span>
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                    {{ 'CategoryCreate' | localize }}
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators';

export default {
    name: 'CategoryCreate',
    data: () => ({
        title: '',
        limit: 10
    }),
    validations: {
        title: { required },
        limit: { minValue: minValue(10) }
    },
    computed: {
        minLimit() {
            return this.$v.limit.$params.minValue.min;
        }
    },
    methods: {
        async submitHandler() {
            if (this.$v.$invalid) {
                this.$v.$touch();
                return;
            }

            try {
                const category = await this.$store.dispatch('category/createCategory', {
                    title: this.title,
                    limit: this.limit
                });
                console.log('CategoryCreate', category);
                this.$message(`Category: ${this.title} successfully was created`);
                this.title = '';
                this.limit = 10;
                this.$v.$reset();
                this.$emit('created', category);
            } catch(e) {
                throw e;
            }
        }
    },
    mounted() {
        // eslint-disable-next-line
        M.updateTextFields();
    }
};
</script>

<style scoped>

</style>
