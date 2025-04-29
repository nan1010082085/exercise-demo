import { defineComponent, onMounted, ref } from 'vue';
import styles from './index.module.scss';
import VuePdfEmbed from 'vue-pdf-embed';
import { GlobalWorkerOptions } from 'pdfjs-dist';
import { ElScrollbar } from 'element-plus';
import workerSrc from 'pdfjs-dist/legacy/build/pdf.worker?url';
GlobalWorkerOptions.workerSrc = workerSrc;
const cMapUrl = '/cmaps/'; // new URL('public/cmaps/', import.meta.url).toString();
console.log(cMapUrl);

const EPdfFile = defineComponent({
  props: {
    source: {
      required: true,
      type: String,
      default: ''
    }
  },
  setup(props, ctx) {
    const pdfEmbed = ref();
    const loading = ref();
    const onLoaded = (e: any) => {
      pdfEmbed.value = e;
      loading.value = false;
    };

    onMounted(() => {
      if (props.source) {
        loading.value = true;
      }
    });

    return () => {
      return (
        <ElScrollbar v-loading={loading.value} class={[styles.pdfFile]} height={600} always>
          <VuePdfEmbed source={{ cMapUrl: cMapUrl, url: props.source }} {...{ attrs: ctx.attrs }} onLoaded={onLoaded}>
            {{
              'after-page': ({ page }: { page: number }) => {
                return (
                  <div class={styles.page}>
                    <span class="text-red-500">{page}</span> / <span>{pdfEmbed.value.numPages}</span>
                  </div>
                );
              }
            }}
          </VuePdfEmbed>
        </ElScrollbar>
      );
    };
  }
});

export default EPdfFile;
