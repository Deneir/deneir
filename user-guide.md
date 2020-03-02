# User guide
## API

To use Deneir, you must provide an API that exposes the graph map of your infrastructure.

### Graph API

TODO: provide payload example with detailed explanation

#### Chain tag
to know on which chain this instance belongs to, example: crawling, instagram, etc.

#### Dependency type/flow
`r`/`w`/`rw`, to know for each dependency if it's receiving or emitting or both, example with a kafka topic which can be read and written

#### Status codes

Each instance agent regularly checks their dependencies health and assign a status code and label. These are the supported statuses:

* `0` ok: resource is up and running
* `1` warning: resource has some errors
* `2` critical: resource has many errors
* `3` emergency: resource is dead
* `4` unknown: resource is in unknown status (timeout for instance)

### Status API

TODO: provide payload example with detailed explanation

## Deployment

### Ready to use version

* Copy and paste the files in the folder on the webserver you want to run Deneir on.
* Create a config.json file, edit to match your needs (cf "Setting up the APIs and base configuration")
* Open in your browser

### Build your own version

* clone the Deneir project
* `cd deneir`
* `npm i && npm run build`
* follow the steps described in "Ready to use version", using the contents of the `build` folder

## Setting up the APIs and base configuration

The minimum required configuration to run Deneir is as follows:

```json
{
  "apiBaseUrl": "https://your-base-url.cool",
  "graphUrl": "graph",
  "statusUrl": "instances",
  "authToken": "your-auth-token"
}
```

* `apiBaseUrl`: the base url of your API
* `graphUrl`: the endpoint that exposes your graph
* `statusUrl`: the endpoint that exposes the statuses of your graph

Deneir will make API calls like this `https://your-base-url.cool/graph`

## Configuring services types display

To have a different display for each type of service, you must create an `entityTypes` key in your configuration file.

*example:*
```json
{
  "graphUrl": "graph",
  "statusUrl": "instances",
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
  "statusUrl": "instances",
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
