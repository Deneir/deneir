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

## API

This project uses two API routes :

[https://gitlab.synthesio.com/synthesio/monopoly/blob/master/src/frag/apidoc.md](https://gitlab.synthesio.com/synthesio/monopoly/blob/master/src/frag/apidoc.md)


# hand written Infra map

https://www.lucidchart.com/documents/edit/eb05650b-90f3-4c57-8031-a5dc8dc917da/0eqBfotfVGlV

# Project steps

* prepare design mock up of what the app will look like
* outline project iterations
* basic react app setup, use create react app
* find a graph library: build a list with pros and cons, then make a choice (and make sure we can change our mind)
* first PoC of view at instance level

# Feature list
## graph features
* instance level view with dependencies
* entity type (datastore/kafka queue/work unit with different shape)
* "central" nodes declustering, by hiding them or something (everybody connects to data, it's going to visually mess up the graph)
* status at process level
* instance detail (list of processes of the instance, with their status)
* status at instance level
* color coding by service
* chain grouping (needs API update)
* status at chain level
* in/out dependency links (needs API update)
* text search to find and filter entities
* graph & status history

## tooling & project features
* easy install + `just tell me what to do` style doc
* api contract documentation + examples
* define what config file we need, with what info, to run the app
* have a system that allows us to write the config file in json or yml (or maybe just yml, whatever)

# Project guidelines

* private repository for the first few iterations
* all documentation and information about the project in the repository
* define how the application will be deployed and used
* spotless commit message history (we could use the angular commit convention cf. https://gist.github.com/stephenparish/9941e89d80e2bc58a153 )
* describe interfaces and provide mocks
