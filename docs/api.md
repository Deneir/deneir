# API

To use Deneir, you must provide an API that exposes the graph map of your infrastructure.

Openapi file: [here](openapi.yaml)

## Graph API

TODO: provide payload example with detailed explanation

### Chain tag
to know on which chain this instance belongs to, example: crawling, instagram, etc.

### Dependency type/flow
`r`/`w`/`rw`, to know for each dependency if it's receiving or emitting or both, example with a kafka topic which can be read and written

### Status codes

Each instance agent regularly checks their dependencies health and assign a status code and label. These are the supported statuses:

* `0` ok: resource is up and running
* `1` warning: resource has some errors
* `2` critical: resource has many errors
* `3` emergency: resource is dead
* `4` unknown: resource is in unknown status (timeout for instance)

## Details API

The details endpoint, if provided, is called when a user clicks on a node to open the details panel.

TODO: provide payload example with detailed explanation
