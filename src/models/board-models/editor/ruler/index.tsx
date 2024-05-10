import { Transition, defineComponent, inject, ref } from "vue";
import RulerXAxis from "./xAxis";
import RulerYAxis from "./yAxis";
import styles from "./index.module.scss";
import { ElButton } from "element-plus";
import { ClearIcon } from "tdesign-icons-vue-next";
import { DrawerTypeKey } from "../inject.key";

const ToolRuler = defineComponent({
  setup() {
    const drawer = inject(DrawerTypeKey)

    const grid = ref([10, 10]);

    return () => {
      return <Transition name="el-fade-in">
        <div class={styles.tool_ruler} v-show={drawer?.value.ruler}>
          <div class={styles.clear}>
            <ElButton size="small" text icon={<ClearIcon />}></ElButton>
          </div>
          <div class={styles.ruler_xais}>
            <RulerXAxis grid={grid.value}/>
          </div>
          <div class={styles.ruler_yais}>
            <RulerYAxis grid={grid.value}/>
          </div>
        </div>
      </Transition>
    }
  }
})

export default ToolRuler;
