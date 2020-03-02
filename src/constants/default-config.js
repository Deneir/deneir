export default {
  canvasSettings: {
    zoom: {
      scale: 0.1,
      duration: 750,
    },
    backgroundColor: '#131212',
    minimumScale: 0.003,
    maximumScale: 0.1,
    nodes: {
      lineWidth: 160,
      radius: 600,
      label: {
        fontSize: 160,
        fillStyle: '#fff',
        textAlign: 'center',
        fontType: 'bold',
        fontName: 'Lucida Grande, Lucida Sans Unicode, Arial, Helvetica, sans-serif',
      },
    },
    defaultStatus: 'unknown',
    statusColors: {
      ok: '#6fcc47',
      warning: '#F5C21B',
      critical: '#FF5D55',
      emergency: '#F03',
      unknown: '#aaaaaa',
    },
    statusStrokes: {
      ok: '#4e992e',
      warning: '#c2970a',
      critical: '#d93a32',
      emergency: '#C00',
      unknown: '#888888',
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
    },
  },
};
