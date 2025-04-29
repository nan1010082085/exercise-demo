import { computed, defineComponent, onUnmounted, ref } from 'vue';
import styles from './index.module.scss';
import EPdfFile from '@/components/e-pdf-file';
import { Upload, type RequestMethodResponse, type UploadFile } from 'tdesign-vue-next';

const PreviewPdf = defineComponent({
  setup() {
    const action = ref('');
    const uploadMethod = ref('requestSuccessMethod');
    const requestMethod = computed(
      () =>
        ({
          requestSuccessMethod,
          requestFailMethod
        }[uploadMethod.value])
    );
    const pdfUrl = ref('');

    const requestSuccessMethod = (files: UploadFile | UploadFile[]): Promise<RequestMethodResponse> => {
      console.log(files);
      const data = (Array.isArray(files) ? files[0].raw : files.raw) as File;
      const url = URL.createObjectURL(new Blob([data], { type: data.type }));
      pdfUrl.value = url;
      return new Promise((resolve) => {
        resolve({
          status: 'success',
          response: {
            url
          }
        });
      });
    };
    const requestFailMethod = (files: UploadFile | UploadFile[]): Promise<RequestMethodResponse> => {
      console.log(files);
      return new Promise((resolve) => {
        resolve({
          status: 'fail',
          response: {
            url: ''
          }
        });
      });
    };

    const onRemove = () => {
      URL.revokeObjectURL(pdfUrl.value);
      pdfUrl.value = '';
    };

    onUnmounted(() => {
      if (pdfUrl.value) URL.revokeObjectURL(pdfUrl.value);
    });

    return () => {
      return (
        <div class={[styles.previewPdf]}>
          <div class={[styles.previewPdf__title]}>
            <Upload accept=".pdf" action={action.value} requestMethod={requestMethod.value} onRemove={onRemove} />
          </div>
          <div>{pdfUrl.value && <EPdfFile source={pdfUrl.value} />}</div>
        </div>
      );
    };
  }
});

export default PreviewPdf;
