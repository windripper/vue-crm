import store from '../store';

const en = {
    'login': 'Firstly please login',
    'logout': 'You have been successfully logged out',
    'auth/user-not-found': 'There is no person with this email',
    'auth/wrong-password': 'Sorry, wrong password',
    'profile/change-name': 'Your successfully changed your name',
    'auth/email-already-in-use': 'The email address is already in use by another account'
};

const ru = {
    'login': 'Пожалуйста, войдите в систему',
    'logout': 'Вы успешно вышли из системы',
    'auth/user-not-found': 'Пользователь с такой почтой не найден',
    'auth/wrong-password': 'Неправильный пароль',
    'profile/change-name': 'Вы успешно изменили свое имя',
    'auth/email-already-in-use': 'Пользователь с такой почтой уже существует'
};

const locales = {
    'ru-RU': ru,
    'en-US': en
};

export default function message(message) {
    const locale = store.getters['info/getInfo'].locale || 'en-US';
    return locales[locale][message];
}
