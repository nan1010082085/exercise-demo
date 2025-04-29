import { defineComponent } from 'vue';
import styles from './index.module.scss';

const ExcelToTable = defineComponent({
  setup() {
    return () => {
      return <div class={[styles.excelToTable]}>ExcelToTable</div>;
    };
  }
});


export default ExcelToTable;
