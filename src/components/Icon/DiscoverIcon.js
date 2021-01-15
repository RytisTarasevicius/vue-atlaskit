import IconWrapper from './IconWrapper';
            import { h } from 'vue'

export default {
    name: 'DiscoverIcon',
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
        return h(IconWrapper, { ...this.$props ,  innerHTML: '<svg viewBox="0 0 24 24"><g fill="currentColor" fill-rule="evenodd"><path d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm0 2a9 9 0 1 1 0-18 9 9 0 0 1 0 18z" fill-rule="nonzero"/><path d="M10.86 10.186l3.896-1.948c1.11-.555 1.562-.108 1.005 1.006l-1.948 3.896c-.126.251-.426.55-.673.673l-3.897 1.948c-1.11.556-1.561.11-1.004-1.006l1.947-3.896c.126-.25.426-.55.673-.673zM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></g></svg>'  });
    }
};
