export default {
    bind(el, { value, arg = 'bottom' }) {
        // eslint-disable-next-line
        M.Tooltip.init(el, { html: value, position: arg });
    },
    unBind(el) {
        // eslint-disable-next-line
        const tooltip = M.Tooltip.getInstance(el);
        if (tooltip && tooltip.destroy) {
            tooltip.destroy();
        }
    }
};
