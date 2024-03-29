
// 定义连接选项
export const Connecting = {
  snap: true,
  allowBlank: false,
  allowLoop: false,
  allowNode: false,
  allowEdge: false,
  allowPort: true,
  allowMulti: false
};

// 定义连接桩
export const Ports = {
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
        },
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
        },
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
        },
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
        },
      }
    }
  },
  items: [
    {
      id: '1',
      group: 'left',
    },
    {
      id: '2',
      group: 'top',
    },
    {
      id: '3',
      group: 'right',
    },
    {
      id: '4',
      group: 'bottom',
    }
  ]
}
