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
import localizeFilter from '@/filters/localize.filter';

export default {
    props: ['value'],
    name: 'Sidebar',
    data: () => ({
        links: [
            { title: localizeFilter('SidebarAccount'), url: '/', exact: true },
            { title: localizeFilter('SidebarHistory'), url: '/history'},
            { title: localizeFilter('SidebarPlanning'), url: '/planning'},
            { title: localizeFilter('SidebarNewRecord'), url: '/record'},
            { title: localizeFilter('SidebarCategories'), url: '/categories'}
        ]
    })
};
</script>

<style scoped>

</style>
