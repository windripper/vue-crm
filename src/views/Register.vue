<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
            <span class="card-title">{{ 'AuthTitle' | localize }}</span>
            <div class="input-field">
                <input
                    id="email"
                    type="text"
                    v-model.trim="email"
                    :class="{ invalid: ($v.email.$dirty && !$v.email.required) ||
                    ($v.email.$dirty && !$v.email.email) }"
                >
                <label for="email">Email</label>
                <small
                    class="helper-text invalid"
                    v-if="$v.email.$dirty && !$v.email.required"
                >{{ 'AuthEmailEmpty' | localize }}</small>
                <small
                    class="helper-text invalid"
                    v-else-if="$v.email.$dirty && !$v.email.email"
                >{{ 'AuthEmailValidator' | localize }}</small>
            </div>
            <div class="input-field">
                <input
                    id="password"
                    type="password"
                    v-model.trim="password"
                    :class="{ invalid: ($v.password.$dirty && !$v.password.required) ||
                    ($v.password.$dirty && !$v.password.minLength) }"
                >
                <label for="password">{{ 'AuthPassword' | localize }}</label>
                <small
                    class="helper-text invalid"
                    v-if="$v.password.$dirty && !$v.password.required"
                >{{ 'AuthPasswordEmpty' | localize }}</small>
                <small
                    class="helper-text invalid"
                    v-else-if="$v.password.$dirty && !$v.password.minLength"
                >{{ 'AuthPasswordLength' | localize(passwordMinLength)}}</small>
            </div>
            <div class="input-field">
                <input
                    id="name"
                    type="text"
                    class="validate"
                    v-model.trim="name"
                    :class="{ invalid: ($v.name.$dirty && !$v.name.required) }"
                >
                <label for="name">{{ 'RegisterName' | localize }}</label>
                <small
                    class="helper-text invalid"
                    v-if="$v.name.$dirty && !$v.name.required"
                >{{ 'RegisterNameValidator' | localize }}</small>
            </div>
            <p>
                <label>
                    <input type="checkbox" v-model="checkbox"/>
                    <span>{{ 'RegisterTerms' | localize }}</span>
                </label>
            </p>
        </div>
        <div class="card-action">
            <div>
                <button
                    class="btn waves-effect waves-light auth-submit"
                    type="submit"
                >
                    {{ 'Register' | localize }}
                    <i class="material-icons right">send</i>
                </button>
            </div>

            <p class="center">
                {{ 'RegisterLoginText' | localize }}
                <router-link to="/login">{{ 'RegisterLoginLink' | localize }}</router-link>
            </p>
        </div>
    </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';

export default {
    name: 'Register',
    metaInfo() {
        return {
            title: this.$title('RegisterTitle')
        };
    },
    data: () => ({
        email: '',
        password: '',
        name: '',
        checkbox: false
    }),
    validations: {
        email: { email, required },
        password: { required, minLength: minLength(8) },
        name: { required },
        checkbox: { checked: v => v }
    },
    computed: {
        passwordMinLength() {
            return this.$v.limit.$params.minLength.min;
        }
    },
    methods: {
        async submitHandler() {
            if (this.$v.$invalid) {
                this.$v.$touch();
                return;
            }

            const formData = {
                email: this.email,
                password: this.password,
                name: this.name
            };

            try {
                await this.$store.dispatch('auth/register', formData);
                this.$router.push('/');
            } catch(e) {
                console.log(e);
            }
        }
    }
};
</script>

<style scoped>

</style>
