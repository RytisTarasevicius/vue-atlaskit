import IconWrapper from './IconWrapper';
            import { h } from 'vue'

export default {
    name: 'ChildIssuesIcon',
    props: {
        size: {
            type: String
        },
        primaryColor: {
            type: String
        },
        secondaryColor: {
            type: String
        }
    },
    render() {
        // eslint-disable-next-line max-len
        return h(IconWrapper, { ...this.$props ,  innerHTML: '<svg viewBox="0 0 24 24"><g fill="currentColor" fill-rule="evenodd"><path d="M11 7h2v5h-2zm5 6h2v3h-2zM6 13h2v3H6z"/><path d="M7 11h10a1 1 0 0 1 1 1v1H6v-1a1 1 0 0 1 1-1z"/><path d="M5 18v1h4v-1H5zm0-2h4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2zm10 2v1h4v-1h-4zm0-2h4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2zM10 5v1h4V5h-4zm0-2h4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" fill-rule="nonzero"/></g></svg>'  });
    }
};
