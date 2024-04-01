/**
 * @Author Yang (yang dong nan)
 * @Date 2024年3月29日 16:36:45
 * @LastEditorAuthors yangdongnan
 * @LastDate 2024年3月29日 16:36:45
 * @Description X6 Graph Option
 */


// 网格
const Grid = {
  size: 10,
  visible: true
};

const Panning = {
  enabled: true,
  modifiers: 'space' // 空格按下触发平移
}

// 定义连接选项
const Connecting = {
  snap: {
    radius: 20
  },
  allowBlank: false,
  allowLoop: false,
  allowNode: false,
  allowEdge: false,
  allowPort: true,
  allowMulti: false,
  router: 'orth',
  connector: {
    name: 'rounded', // normal smooth rounded jumpover
    args: {
      radius: 10
    }
  },
  highlight: false
};

// 定义连接桩
const Ports = {
  groups: {
    top: {
      position: 'top',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#31d0c6',
          fill: '#fff',
          strokeWidth: 1,
          opacity: 0
        }
      }
    },
    left: {
      position: 'left',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#31d0c6',
          fill: '#fff',
          strokeWidth: 1,
          opacity: 0
        }
      }
    },
    right: {
      position: 'right',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#31d0c6',
          fill: '#fff',
          strokeWidth: 1,
          opacity: 0
        }
      }
    },
    bottom: {
      position: 'bottom',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#31d0c6',
          fill: '#fff',
          strokeWidth: 1,
          opacity: 0
        }
      }
    }
  },
  items: [
    {
      id: '1',
      group: 'left'
    },
    {
      id: '2',
      group: 'top'
    },
    {
      id: '3',
      group: 'right'
    },
    {
      id: '4',
      group: 'bottom'
    }
  ]
};

// 高亮器
const Highlighting = {
  magnetAvailable: {
    name: 'stroke',
    args: {
      padding: 2,
      attrs: {
        'stroke-width': 2,
        stroke: '#0052d9'
      }
    }
  },
  // 连接桩吸附时
  magnetAdsorbed: {
    name: 'stroke',
    args: {
      padding: 2,
      attrs: {
        'stroke-width': 2,
        stroke: '#0052d9'
      }
    }
  }
};

export {
  Grid,
  Panning,
  Connecting,
  Ports,
  Highlighting
}
