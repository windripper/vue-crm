<template>
    <div class="grey darken-1 empty-layout">
        <router-view/>
    </div>
</template>

<script>
import generateMessage from '@/utils/messages';

export default {
    name: 'AuthLayout',
    computed: {
        error() {
            return this.$store.getters.getError;
        }
    },
    watch: {
        error(fbError) {
            this.$error(generateMessage(fbError.code) || 'Something went wrong');
        }
    }
};
</script>

<style scoped>

</style>
