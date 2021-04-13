# Advanced Configuration

## Setting up the APIs and base configuration

The minimum required configuration to run Deneir is as follows:

```json
{
  "apiBaseUrl": "https://your-base-url.cool",
  "graphUrl": "graph",
  "detailsUrl": "instances",
  "authToken": "your-auth-token"
}
```

* `apiBaseUrl`: the base url of your API
* `graphUrl`: the endpoint that exposes your graph
* `detailsUrl`: the endpoint that exposes the details of the nodes of your graph

Deneir will make API calls like this :
* `https://your-base-url.cool/graph`
* `https://your-base-url.cool/details?instance=instanceId

## Enable graph status polling

You can enable and configure polling to get status updates from your graph API. To do so, simply add the `enablePolling` option in your configuration, and change the `pollingInterval` to a time that is appropriate for your system.

*example:*
```json
{
  "pollingInterval": 5 * 60 * 1000,
  "enablePolling": true,
}
```

## Configuring services types display

To have a different display for each type of service, you must create an `entityTypes` key in your configuration file.

*example:*
```json
{
  "graphUrl": "graph",
  "detailsUrl": "instances",
  "apiBaseUrl": "https://your-base-url.cool",
  "authToken": "your-auth-token",
  "entityTypes": {
    ...
  }
}
```

To describe each service type, you must add them like this

*example:*
```json
{
  ...
  "entityTypes": {
    "kafka": {
      "name": "kafka",
      "shape": "rectangle"
    },
    "mysql": {
      "name": "mysql",
      "shape": "database"
    }
  }
}
```

The default node shape is `circle`

### Node shapes

the available node shapes are as follow
* circle
* database
* hexagon
* pentagon
* rectangle
* square
* triangle

### Node stroke color

If you want to use a shape for more than one type, you can differentiate them using the `strokeColor` key.

*example:*
```json
"scylladb": {
  "name": "scylladb",
  "shape": "database",
  "strokeColor": "#56D1E4"
},
"redis": {
  "name": "redis",
  "shape": "database",
  "strokeColor": "#c6302b"
},
```

### Default status

Nodes that do not have a status color will use by default status. The default value for this setting is "unknown", but you can choose to change to any of those values:

* ok
* warning
* critical
* emergency
* unknown

## Other graphics changes

To make changes to the design of Deneir, you must create an `canvasSettings` key in your configuration file.

*example:*
```json
{
  "graphUrl": "graph",
  "detailsUrl": "instances",
  "apiBaseUrl": "https://your-base-url.cool",
  "authToken": "your-auth-token",
  "canvasSettings": {
    ...
  }
}
```

### Background color

To change the background color, use the `backgroundColor` setting.

*example:*
```json
{
  ...
  "canvasSettings": {
    "backgroundColor": "#131212"
  }
}
```

### Graph scale

To change the maximum and minimum scale of the UI, use the `maximumScale` and `minimumScale` settings.

*example:*
```json
{
  ...
  "canvasSettings": {
    "maximumScale": 0.003,
    "maximumScale": 0.1
  }
}
```

### Zoom

To change how close and how fast the UI zooms on a node, use the `zoom` setting.

*example:*
```json
{
  ...
  "canvasSettings": {
    "zoom": {
      "scale": 0.1,
      "duration": 750
    }
  }
}
```

### Node size and labels

To change how the nodes and labels render, you can override the `nodes` setting.

*example:*
```json
{
  ...
  "canvasSettings": {
    "nodes": {
      "lineWidth": 160,
      "radius": 600,
      "label": {
        "fontSize": 160,
        "fillStyle": "#fff",
        "textAlign": "center",
        "fontType": "bold",
        "fontName": "Comic sans ms"
      }
    }
  }
}
```
