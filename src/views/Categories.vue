<template>
    <div>
        <div class="page-title">
            <h3>{{ 'CategoriesTitle' | localize }}</h3>
        </div>
        <section>
            <Loader v-if="isLoading"/>
            <div v-else class="row">

                <CategoryCreate @created="addNewCategory"/>

                <CategoryEdit
                    v-if="categories.length"
                    :categories="categories"
                    @updated="updateCategories"
                    :key="categories.length + updateCount"
                />

                <p v-else class="center">{{ 'CategoriesWarning' | localize }}</p>

            </div>
        </section>
    </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate';
import CategoryEdit from '@/components/CategoryEdit';

export default {
    name: 'Categories',
    components: {
        CategoryEdit,
        CategoryCreate
    },
    data: () => ({
        categories: [],
        isLoading: true,
        updateCount: 0
    }),
    metaInfo() {
        return {
            title: this.$title('CategoriesTitle')
        };
    },
    methods: {
        addNewCategory(category) {
            this.categories.push(category);
        },
        updateCategories(category) {
            const index = this.categories.findIndex(c => c.id === category.id);
            this.categories[index].title = category.title;
            this.categories[index].limit = category.limit;
            this.updateCount++;
        }
    },
    async mounted() {
        this.categories = await this.$store.dispatch('category/fetchCategories') || [];
        this.isLoading = false;
    }
};
</script>

<style scoped>

</style>
