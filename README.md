# Infrastructure Architecture

Micro services architecture, complex and implicit dependency graph, over 100 components.

We have an API that exposes status and dependencies for our services.

We want an application that shows how our infrastructure looks.

Netflix does something sort of similar, but network oriented
https://www.youtube.com/watch?v=jWpI8qzqNHk

# Terminology

## Entity types

### Entity types

* work unit
* kafka queue
* data store (es, scylla, mysql)

### Zoom level

* chain : feature meta group
* service : code base
* instance : set of config to deploy a service code base
* process : thread of instance in a server

# End user distribution
To use the project as an end user

* download the `dist` zip
* unzip it in the deploy folder
* create a `config.json` file from `config.json.dist`
* complete the info in `config.json` according to your setup
* open the `index.html` in your browser

## config file format

For the moment we have chosen json, but we can add yml support if the info stored in the config file grows.

# API

This project uses two API routes :

[https://gitlab.synthesio.com/synthesio/monopoly/blob/master/src/frag/apidoc.md](https://gitlab.synthesio.com/synthesio/monopoly/blob/master/src/frag/apidoc.md)


# hand written Infra map

https://www.lucidchart.com/documents/edit/eb05650b-90f3-4c57-8031-a5dc8dc917da/0eqBfotfVGlV


# Project management (jira)

https://synthesio.atlassian.net/jira/software/projects/DEN/boards/186

# API Format
## Graph endpoint
```js
{
  "data": [
    {
      "id": "data-facebook",
      "type": "mysql",
      "dependents": [
        "spyridon-blink-processv3",
        "spyridon-blink-ongoingv2",
        "spyridon-blink-ongoingv1",
        "spyridon-blink-process",
        "spyridon-blink-indexerv1",
        "spyridon-blackhole-ongoing"
      ]
    },
    ...
  ]
}
```

## Required metadata/tags
* chain: to know on which chain this instance belongs to, example: crawling, instagram, etc.
* flow: r/w/rw, to know for each dependency if it's receiving or emitting or both, example with a kafka topic which can be read and written
* status: each instance agent regularly check their dependency health and assign a status code and label. These are the supported statuses:

```
  // StatusOK is when resource is up and running
  code:   0
  label: "ok"
  // StatusWarnings is when resource has some errors
  code:   1
  label:  "warnings"
  // StatusCritical is when resource has many errors
  code:   2
  label:  "critical"
  // StatusEmergency is when resource is dead
  code:   3
  label:  "emergency"
  // StatusUnknown is when resource is in unknown status (timeout for instance)
  code:   4
  label:  "unknown"
```

proposal for new format:
```js
{
  "data": [
    {
      "id": "usager",
      "type": "kafka",
      "tags": {
        "chain": "instagram"
      },
      "dependents": [
        {
          "instance": "sheridan",
          "flow": "r",
          "status": 0,
          "metadata": {
            "topic": "usager-sheridan"
          }
        },
        {
          "instance": "sybil",
          "flow": "w",
          "status": 2,
          "metadata": {
            "group_id": "grolsch-sheridan",
            "topics": ["usager-sheridan"]
          }
        }
      ]
    },
    ...
  ]
}
```

# Feature list
## graph features
* [x] instance level view with dependencies
* [x] zoom feature (to be defined more clearly)
* [x] status at process level
* [x] instance detail (list of processes of the instance, with their status)
* [x] status at instance level
* [x] color coding by service
* [x] status at chain level
* [x] text search to find and filter entities
* [x] entity type (datastore / Kafka queue/work unit with different shape)
  * [x] circles, squares and databases shapes
  * [ ] hexagons, triangles and whatnot
* [ ] hide nodes & save hidden nodes settings
* [ ] image export (whole canvas)
* [ ] chain grouping (needs API update)
* [ ] in/out dependency links (needs API update)
* [ ] graph & status history
* [ ] integrate Prometheus metrics (lag, rate, etc.)
* [ ] pseudo entities
* [ ] dependents and dependencies list with links
* [ ] see only dependents in Graph
* [ ] add URL for instances
* [ ] auto refresh for status update
* [ ] Firefox compatibility


## tooling & project features
* easy install + `just tell me what to do` style doc
* API contract documentation + examples
* define what config file we need, with what info, to run the app
* have a system that allows us to write the config file in json or yml (or maybe just yml, whatever)

# Project guidelines

* private repository for the first few iterations
* all documentation and information about the project in the repository
* define how the application will be deployed and used
* spotless commit message history (we could use the angular commit convention cf. https://gist.github.com/stephenparish/9941e89d80e2bc58a153 )
* describe interfaces and provide mocks

# Documentation

- You can change the settings in `config.json.dist`. If this file is changed, you need to update the config in the deploy config.
