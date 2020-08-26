import store from '../store';
import ru from '../locales/ru';
import en from '../locales/en';

const locales = {
    'ru-RU': ru,
    'en-US': en
};

export default function localizeFilter(key, ...args) {
    const locale = store.getters['info/getInfo'].locale || 'en-US';
    let result = locales[locale][key] || `[Localize error]: key ${key} not found`;

    if (args && locales[locale][key]) {
        args.forEach(arg => result = result.replace('%slot%', arg));
        return result;
    }

    return result;
}
