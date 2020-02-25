export default {
  canvasSettings: {
    zoom: {
      scale: 0.12,
      duration: 750,
    },
    backgroundColor: '#131212',
    minimumScale: 0.003,
    maximumScale: 'Infinity',
    nodes: {
      lineWidth: 160,
      radius: 600,
      label: {
        fontSize: 160,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        fillStyle: '#fff',
        textAlign: 'center',
        fontType: 'bold',
        fontName: 'Lucida Grande, Lucida Sans Unicode, Arial, Helvetica, sans-serif',
      },
    },
    statusColors: {
      ok: '#6fcc47', // #4e992e
      warning: '#F5C21B', // #c2970a
      ko: '#FF5D55', // #d93a32
    },
    links: {
      bend: 0.1,
      arrowLength: 300,
      arrowWidth: 300,
      startArrow: false,
      endArrow: true,
      startRadius: '600',
      endRadius: '600',
      vectorColor: '#ddd',
    },
  },
  meta: {
    subtitle: 'Details',
    processName: 'processes',
  },
  search: {
    maxResults: 10,
  },
  entityTypes: {
    default: {
      name: 'default',
      shape: 'circle',
      strokeColor: '#',
    },
  },
};
