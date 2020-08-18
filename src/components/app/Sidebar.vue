<template>
    <ul class="sidenav app-sidenav" :class="{ open: value }">
        <router-link
            v-for="link in links"
            :key="link.url"
            :to="link.url"
            tag="li"
            active-class="active"
            :exact="link.exact"
        >
            <a href="#" class="waves-effect waves-orange pointer">{{ link.title }}</a>
        </router-link>
    </ul>
</template>

<script>
export default {
    props: ['value'],
    name: 'Sidebar',
    data: () => ({
        links: [
            { title: 'Account', url: '/', exact: true },
            { title: 'History', url: '/history'},
            { title: 'Planning', url: '/planning'},
            { title: 'New record', url: '/record'},
            { title: 'Categories', url: '/categories'}
        ]
    })
};
</script>

<style scoped>

</style>
