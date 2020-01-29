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
      color: 'lightskyblue',
      strokeColor: '#fff',
      radius: 600,
      label: {
        fontSize: 120,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        shadowColor: 'rgba(0,0,0,0.8)',
        shadowBlur: 4,
        fillStyle: '#fff',
        textAlign: 'center',
        fontType: 'bold',
        fontName: 'Lucida Grande, Lucida Sans Unicode, Arial, Helvetica, sans-serif',
      },
    },
    statusColors: {
      ok: '#2dd42d',
      warning: 'orange',
      ko: 'red',
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
      color: 'white',
    },
  },
};
