<script>
import { Pie } from 'vue-chartjs';

export default {
    name: 'HistoryChart',
    props: {
        records: {
            type: Array
        },
        categories: {
            type: Array
        }
    },
    extends: Pie,
    methods: {
        render() {
            this.renderChart({
                labels: this.categories.map(c => c.title),
                datasets: [{
                    label: 'Expenses by category',
                    data: this.categories.map(c => {
                        return this.records.reduce((total, record) => {
                            if (record.categoryId === c.id && record.type === 'expense') {
                                total += +record.amount;
                            }
                            return total;
                        }, 0);
                    }),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            });
        }
    },
    mounted() {
        this.render();
    }
};
</script>

<style scoped>

</style>
