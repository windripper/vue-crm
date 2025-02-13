<template>
    <div>
        <div class="page-title">
            <h3>{{ 'ProfileTitle' | localize }}</h3>
        </div>

        <form class="form" @submit.prevent="submitHandler">
            <div class="input-field">
                <input
                    id="description"
                    type="text"
                    v-model="name"
                    :class="{ invalid: $v.name.$dirty && !$v.name.required }"
                >
                <label for="description">{{ 'ProfileName' | localize }}</label>
                <small
                    class="helper-text invalid"
                    v-if="$v.name.$dirty && !$v.name.required"
                >{{ 'ProfileNameValidator' | localize }}</small>
            </div>

            <div class="switch">
                <label>
                    English
                    <input type="checkbox" v-model="isRuLocale">
                    <span class="lever"></span>
                    Русский
                </label>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                {{ 'ProfileUpdate' | localize }}
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import generateMessage from '@/utils/messages';

export default {
    name: 'Profile',
    metaInfo() {
        return {
            title: this.$title('ProfileTitle')
        };
    },
    data: () => ({
        name: '',
        isRuLocale: false
    }),
    validations: {
        name: { required },
    },
    computed: {
        info() {
            return this.$store.getters['info/getInfo'];
        }
    },
    methods: {
        async submitHandler() {
            if (this.$v.$invalid) {
                this.$v.$touch();
                return;
            }

            try {
                await this.$store.dispatch('info/updateInfo', {
                    name: this.name,
                    locale: this.isRuLocale ? 'ru-RU' : 'en-US'
                });

                this.$message(generateMessage('profile/change-name'));
            } catch(e) {
                throw e;
            }
        }
    },
    mounted() {
        this.name = this.info.name;
        this.isRuLocale = this.info.locale === 'ru-RU';

        setTimeout(() => {
            // eslint-disable-next-line
            M.updateTextFields();
        }, 0);
    }
};
</script>

<style scoped>
.switch {
    margin-bottom: 2rem;
}
</style>
