<template>
    <table>
        <thead>
        <tr>
            <th>#</th>
            <th>{{ 'HistoryTotal' | localize }}</th>
            <th>{{ 'HistoryDate' | localize }}</th>
            <th>{{ 'HistoryCategory' | localize }}</th>
            <th>{{ 'HistoryType' | localize }}</th>
            <th>{{ 'HistoryOpen' | localize }}</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="(record, index) in records" :key="record.id">
            <td>{{ index + 1 }}</td>
            <td>{{ record.amount | currency('USD') }}</td>
            <td>{{ record.date | date('datetime') }}</td>
            <td>{{ record.categoryName }}</td>
            <td>
                <span
                    class="white-text badge red"
                    :class="record.typeClass"
                >{{ record.typeText | localize }}</span>
            </td>
            <td>
                <button
                    class="btn-small btn"
                    @click="$router.push(`/record/${record.id}`)"
                    v-tooltip="openText"
                >
                    <i class="material-icons">open_in_new</i>
                </button>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'HistoryTable',
    props: {
        records: {
            required: true,
            type: Array
        }
    },
    computed: {
        openText() {
            const locale = this.$store.getters['info/getInfo'].locale || 'en-US';
            return locale === 'en-US' ? 'Open the record' : 'Открыть запись';
        }
    }
};
</script>

<style scoped>

</style>
