## Infrastructure Architecture

Micro services architecture, complex and implicit dependency graph, over 100 components.

We have an API that exposes status and dependencies for our services.

We want an application that shows how our infrastructure looks.

Netflix does something sort of similar, but network oriented
https://www.youtube.com/watch?v=jWpI8qzqNHk

## Terminology to define

* work unit
* kafka queue
* data store (es, scylla, mysql)

* chain
* service
* instance
* process


## Project guidelines

* private repository for the first few iterations
* all documentation and information about the project in the repository
* define how the application will be deployed and used
* spotless commit message history (we could use the angular commit convention cf. https://gist.github.com/stephenparish/9941e89d80e2bc58a153 )
* describe interfaces and provide mocks