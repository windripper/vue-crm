<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>{{ 'CategoryEditTitle' | localize }}</h4>
            </div>

            <form @submit.prevent="submitHandler">
                <div class="input-field">
                    <select ref="select" v-model="current">
                        <option
                            v-for="c in categories"
                            :key="c.id"
                            :value="c.id"
                        >{{ c.title }}
                        </option>
                    </select>
                    <label>{{ 'CategoryChoose' | localize }}</label>
                </div>

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
                    {{ 'CategoryUpdate' | localize }}
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { minValue, required } from 'vuelidate/lib/validators';

export default {
    name: 'CategoryEdit',
    props: {
        categories: {
            type: Array,
            required: true
        }
    },
    data: () => ({
        select: null,
        title: '',
        limit: 10,
        current: null
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
                const data = {
                    id: this.current,
                    title: this.title,
                    limit: this.limit
                };

                await this.$store.dispatch('category/updateCategory', data);
                this.$message(`Category ${this.title} was successfully updated`);
                this.$emit('updated', data);
            } catch(e) {
                throw e;
            }
        }
    },
    watch: {
        current(catID) {
            const { title, limit } = this.categories.find(c => c.id === catID);
            this.title = title;
            this.limit = limit;
        }
    },
    created() {
        const { id, title, limit } = this.categories[0];
        this.current = id;
        this.title = title;
        this.limit = limit;
    },
    mounted() {
        // eslint-disable-next-line
        this.select = M.FormSelect.init(this.$refs.select);
        // eslint-disable-next-line
        M.updateTextFields();
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
