import { DialogPlugin } from 'tdesign-vue-next';

export interface useDialogConfirmProps {
  title: string;
  message: string;
  option: useDialogOptionProps;
}

export interface useDialogOptionProps {
  cancelText?: string;
  confirmText?: string;
  showClose?: boolean;
  closeOnEscKeydown?: boolean;
  closeOnOverlayClick?: boolean;
  placement?: 'top' | 'center';
}

export interface ResolveType {
  event: any;
  trigger: 'confirm' | 'cancel' | 'close';
}

const useDialog = () => {
  
  // dialog confirm
  const confirm = (title: string, message: string, option: useDialogOptionProps = {}): Promise<ResolveType> => {
    const {
      cancelText = '取消',
      confirmText = '确定',
      showClose = false,
      closeOnEscKeydown = false,
      closeOnOverlayClick = false,
      placement = 'center'
    } = option;
    return new Promise((resolve) => {
      const dialog = DialogPlugin({
        header: title,
        body: message,
        confirmBtn: confirmText,
        cancelBtn: cancelText,
        closeBtn: showClose,
        closeOnOverlayClick,
        closeOnEscKeydown,
        placement,
        onConfirm: ({ e }) => {
          resolve({ event: e, trigger: 'confirm' });
          dialog.destroy();
        },
        onClose: ({ e }) => {
          resolve({ event: e, trigger: 'close' });
          dialog.hide();
        },
        onCancel: ({ e }) => {
          resolve({ event: e, trigger: 'cancel' });
          dialog.hide();
        }
      });
    });
  };

  // dialog alert
  const alert = (title: string, message: string, option: useDialogOptionProps = {}): Promise<ResolveType> => {
    const { confirmText = '确定', showClose = false } = option;
    return new Promise((resolve) => {
      const dialog = DialogPlugin.alert({
        header: title,
        body: message,
        confirmBtn: confirmText,
        closeBtn: showClose,
        onConfirm: ({ e }) => {
          resolve({ event: e, trigger: 'confirm' });
          dialog.destroy();
        },
        onClose: ({ e }) => {
          resolve({ event: e, trigger: 'close' });
          dialog.hide();
        }
      });
    });
  };

  return { confirm, alert };
};

export default useDialog;
