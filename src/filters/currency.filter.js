import store from '../store';

export default function currencyFilter(value, currency = 'USD') {
    const locale = store.getters['info/getInfo'].locale || 'en-US';

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency
    }).format(value);
}
