<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
            <span class="card-title">Home Bookkeeping</span>
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
                >This field should not be empty</small>
                <small
                    class="helper-text invalid"
                    v-else-if="$v.email.$dirty && !$v.email.email"
                >Please type correct email</small>
            </div>
            <div class="input-field">
                <input
                    id="password"
                    type="password"
                    v-model.trim="password"
                    :class="{ invalid: ($v.password.$dirty && !$v.password.required) ||
                    ($v.password.$dirty && !$v.password.minLength) }"
                >
                <label for="password">Password</label>
                <small
                    class="helper-text invalid"
                    v-if="$v.password.$dirty && !$v.password.required"
                >Please fill in password field</small>
                <small
                    class="helper-text invalid"
                    v-else-if="$v.password.$dirty && !$v.password.minLength"
                >Password length should be at least 8 characters</small>
            </div>
            <div class="input-field">
                <input
                    id="name"
                    type="text"
                    class="validate"
                    v-model.trim="name"
                    :class="{ invalid: ($v.name.$dirty && !$v.name.required) }"
                >
                <label for="name">Name</label>
                <small
                    class="helper-text invalid"
                    v-if="$v.name.$dirty && !$v.name.required"
                >Please type your name</small>
            </div>
            <p>
                <label>
                    <input type="checkbox" v-model="checkbox"/>
                    <span>I agree to the Terms of Use</span>
                </label>
            </p>
        </div>
        <div class="card-action">
            <div>
                <button
                    class="btn waves-effect waves-light auth-submit"
                    type="submit"
                >
                    Register
                    <i class="material-icons right">send</i>
                </button>
            </div>

            <p class="center">
                Already have an account?
                <router-link to="/login">Sign in!</router-link>
            </p>
        </div>
    </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';

export default {
    name: 'Register',
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
