<template>
    <nav class="navbar orange lighten-1">
        <div class="nav-wrapper">
            <div class="navbar-left">
                <a href="#" @click.prevent="$emit('toggle-sidebar')">
                    <i class="material-icons black-text">dehaze</i>
                </a>
                <span class="black-text">{{ date | date('datetime') }}</span>
            </div>

            <ul class="right hide-on-small-and-down">
                <li>
                    <a
                        class="dropdown-trigger black-text"
                        href="#"
                        data-target="dropdown"
                        ref="dropdown"
                    >
                        {{ name }}
                        <i class="material-icons right">arrow_drop_down</i>
                    </a>

                    <ul id='dropdown' class='dropdown-content'>
                        <li>
                            <router-link to="/profile" class="black-text">
                                <i class="material-icons">account_circle</i>
                                {{ 'NavbarProfile' | localize }}
                            </router-link>
                        </li>
                        <li class="divider" tabindex="-1"></li>
                        <li>
                            <a href="#" class="black-text" @click.prevent="logout">
                                <i class="material-icons">assignment_return</i>
                                {{ 'NavbarLogout' | localize }}
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    data: () => ({
        date: new Date(),
        interval: null,
        dropdown: null
    }),
    methods: {
        async logout() {
            await this.$store.dispatch('auth/logout');
            this.$router.push('/login?message=logout');
        }
    },
    computed: {
        name() {
            return this.$store.getters['info/getInfo'].name || 'User_Name';
        }
    },
    mounted() {
        this.interval = setInterval(() => {
            this.date = new Date();
        }, 1000);

        // eslint-disable-next-line
        this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
            constrainWidth: false,
            coverTrigger: false
        });
    },
    beforeDestroy() {
        clearInterval(this.interval);
        if (this.dropdown && this.dropdown.destroy) {
            this.dropdown.destroy();
        }
    }
};
</script>

<style scoped>

</style>
