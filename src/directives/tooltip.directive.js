export default {
    bind(el, { value }) {
        // eslint-disable-next-line
        M.Tooltip.init(el, { html: value, position: 'left' });
    },
    unBind(el) {
        // eslint-disable-next-line
        const tooltip = M.Tooltip.getInstance(el);
        if (tooltip && tooltip.destroy) {
            tooltip.destroy();
        }
    }
};
