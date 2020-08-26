import { chunkArray } from '@/utils/chunkArray';

export default {
    data() {
        return {
            page: +this.$route.query.page || 1,
            pageSize: 5,
            pageCount: 0,
            allData: [],
            pageData: []
        };
    },
    methods: {
        setPagination(allData) {
            this.allData = chunkArray(allData, this.pageSize);
            this.pageCount = this.allData.length;
            this.pageData = this.allData[this.page - 1] || this.allData[0];
        },
        pageChangeHandler(page) {
            this.$router.push(`${this.$route.path}?page=${page}`);
            this.pageData = this.allData[page - 1] || this.allData[0];
        }
    }
};
