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
                    :class="{ invalid: ($v.password.$dirty && !$v.password.required)}"
                >
                <label for="password">{{ 'AuthPassword' | localize }}</label>
                <small
                    class="helper-text invalid"
                    v-if="$v.password.$dirty && !$v.password.required"
                >{{ 'AuthPasswordEmpty' | localize }}</small>
            </div>
        </div>
        <div class="card-action">
            <div>
                <button
                    class="btn waves-effect waves-light auth-submit"
                    type="submit"
                >
                    {{ 'LoginSignIn' | localize }}
                    <i class="material-icons right">send</i>
                </button>
            </div>

            <p class="center">
                {{ 'LoginCreateText' | localize }}
                <router-link to="/register">{{ 'LoginRegister' | localize }}</router-link>
            </p>
        </div>
    </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';
import generateMessage from '@/utils/messages';

export default {
    name: 'Login',
    metaInfo() {
        return {
            title: this.$title('LoginTitle')
        };
    },
    data: () => ({
        email: '',
        password: '',
    }),
    validations: {
        email: { email, required },
        password: { required, minLength: minLength(6) }
    },
    methods: {
        async submitHandler() {
            if (this.$v.$invalid) {
                this.$v.$touch();
                return;
            }

            const formData = {
                email: this.email,
                password: this.password
            };

            try {
                await this.$store.dispatch('auth/login', formData);
                this.$router.push('/');
            } catch(e) {
                console.log(e);
            }
        }
    },
    mounted() {
        const message = generateMessage(this.$route.query.message);
        if (message) {
            this.$message(message);
        }
    }
};
</script>

<style scoped>

</style>
