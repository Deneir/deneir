export default {
  canvasSettings: {
    zoom: {
      scale: 1,
      duration: 750,
    },
    backgroundColor: '#131212',
    minimumScale: 0.05,
    maximumScale: 1,
    nodes: {
      lineWidth: 10,
      radius: 50,
      label: {
        fontSize: 20,
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
      arrowheadLength: 30,
      arrowWidth: 5,
      arrowheadWidth: 40,
      startArrow: false,
      endArrow: true,

      vectorColor: '#ddd',
    },
  },
  meta: {
    subtitle: 'Details',
    processName: 'processes',
  },
  entityTypes: {
    default: {
      name: 'default',
      shape: 'circle',
    },
  },
};
