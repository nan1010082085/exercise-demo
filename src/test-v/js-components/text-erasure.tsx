import { defineComponent } from "vue";
import styles from './styles/text-erasure.module.scss'

const TextErasure = defineComponent({
  setup() {
    return () => <div class={styles.textErasure}>
      <p>
        “在一个遥远的星系中，有一个由智慧生物居住的星球，这个星球被茂密的森林和广阔的海洋覆盖，其居民们拥有高度发达的科技，能够与银河系中的其他文明进行交流与贸易，但随着时间的流逝，他们发现自己的星球正逐渐受到一种未知暗物质的影响，这种暗物质不仅威胁到了星球的生态平衡，还逐渐侵蚀着居民们的心灵，导致社会动荡不安，为了拯救自己的家园，星球上的科学家们联合起来，启动了一项前所未有的探索任务，他们计划派遣一艘装备有最先进科技的宇宙飞船，穿越虫洞，寻找能够对抗暗物质的神秘元素，而这艘飞船的指挥官是一位勇敢而智慧的女性，她的名字叫做艾莉亚，她不仅要面对未知宇宙的挑战，还要克服内部的分歧和疑虑，带领团队完成这一艰巨的任务。”
      </p>
      <p class={styles.erasure}>
        <span class={styles.text}>
          “在一个遥远的星系中，有一个由智慧生物居住的星球，这个星球被茂密的森林和广阔的海洋覆盖，其居民们拥有高度发达的科技，能够与银河系中的其他文明进行交流与贸易，但随着时间的流逝，他们发现自己的星球正逐渐受到一种未知暗物质的影响，这种暗物质不仅威胁到了星球的生态平衡，还逐渐侵蚀着居民们的心灵，导致社会动荡不安，为了拯救自己的家园，星球上的科学家们联合起来，启动了一项前所未有的探索任务，他们计划派遣一艘装备有最先进科技的宇宙飞船，穿越虫洞，寻找能够对抗暗物质的神秘元素，而这艘飞船的指挥官是一位勇敢而智慧的女性，她的名字叫做艾莉亚，她不仅要面对未知宇宙的挑战，还要克服内部的分歧和疑虑，带领团队完成这一艰巨的任务。”
        </span>
      </p>

      <p>文字消除滚动</p>
    </div>
  }
})

export default TextErasure;