import { mount } from '@vue/test-utils';
import InlineEdit from '@/components/Form/InlineEdit.vue';
import InlineEditViewContent from '@/components/Form/InlineEditViewContent.vue';
import InlineEditButtons from '@/components/Form/InlineEditButtons.vue';
import InlineErrorMessage from '@/components/Form/InlineErrorMessage.vue';
import TextField from '@/components/Form/TextField.vue';

const stubs = { InlineEditViewContent };
const props = { value: 'MackBook' };

describe('InlineEdit', () => {
    it('should emit event on enter', async () => {
        const component = mount(InlineEdit, { props, stubs });
        const inlineEditViewContent = component.findComponent(InlineEditViewContent);

        inlineEditViewContent.trigger('click');

        expect(component.vm.isEditing).toBe(true);
        expect(component.vm.editingValue).toBe(props.value);
    });

    it('should show input on editing request', async () => {
        const component = mount(InlineEdit, { props });
        await component.setData({ isEditing: true });

        const viewContent = component.findComponent(InlineEditViewContent);

        await component.vm.$nextTick();
        expect(viewContent.exists()).toBe(false);

        const textField = component.findComponent(TextField);
        expect(textField.exists()).toBe(true);
    });

    it('should render action buttons', async () => {
        const component = mount(InlineEdit, { props });
        component.setData({ isEditing: true });

        await component.vm.$nextTick();
        const inlineEditButtons = component.findComponent(InlineEditButtons);

        expect(inlineEditButtons.exists()).toBe(true);
    });

    it('should cancel inline editing', () => {
        const component = mount(InlineEdit, { props });
        component.setData({ isEditing: true, editingValue: 'Some changed value' });

        component.vm.cancelInlineEdit();

        expect(component.vm.isEditing).toBe(false);
        expect(component.vm.editingValue).toBe(props.value);
    });

    it('should set the state to dirty', async () => {
        const component = mount(InlineEdit, { props });
        const editingValue = 'Some changed value';
        component.setData({ isEditing: true, editingValue });

        await component.vm.$nextTick();

        expect(component.vm.isDirty).toBe(true);
    });

    it('should set the state to not dirty', () => {
        const component = mount(InlineEdit, { props });
        const editingValue = 'Some changed value';
        component.setData({ isEditing: true, editingValue });

        component.setProps({ value: editingValue });
        component.vm.saveInlineEdit();

        expect(component.vm.isDirty).toBe(false);
    });

    it('should handle the validation error', async () => {
        const component = mount(InlineEdit, { props });
        component.setData({ isEditing: true });

        const error = new Error('Validation error');
        error.status = 422;
        error.fieldErrors = [{ message: 'Title cannot be blank' }];

        component.vm.saveInlineEdit(error);
        await component.vm.$nextTick();

        const errorDialog = component.findComponent(InlineErrorMessage);

        expect(component.vm.isEditing).toBe(true);
        expect(component.vm.isLoading).toBe(false);
        expect(component.vm.error).toBe(error);
        expect(errorDialog.props('error')).toBe(error);
    });

    it('should not render validation dialog when error is different type', () => {
        const component = mount(InlineEdit, { props });
        component.setData({ isEditing: true });

        const error = new Error('Asset not found');
        error.status = 404;

        component.vm.saveInlineEdit(error);

        const errorDialog = component.findComponent({ ref: 'error-dialog' });

        expect(component.vm.isEditing).toBe(true);
        expect(component.vm.isLoading).toBe(false);
        expect(component.vm.error).toBe(error);
        expect(errorDialog.exists()).toBe(false);
    });

    it('should return from confirmEditedValue method if value didn\'t change', () => {
        const component = mount(InlineEdit, { props });
        component.setData({ isEditing: true, editingValue: props.value });

        component.vm.confirmEditedValue();

        expect(component.emitted('save-requested')).toBeFalsy();
        expect(component.vm.isEditing).toBe(false);
    });

    it('should emit save-requested event on confirm if value changed', async () => {
        const component = mount(InlineEdit, { props });
        const editingValue = 'changed value';
        component.setData({ isEditing: true, editingValue });

        await component.vm.$nextTick();
        component.vm.confirmEditedValue();

        expect(component.emitted('save-requested')).toBeTruthy();
        expect(component.emitted('save-requested')[0]).toEqual([editingValue, component.vm.saveInlineEdit]);
        expect(component.vm.isLoading).toBe(true);
    });
});
