![Image of Deneir](docs/assets/deneir_card.png)

Deneir is an open source graph visualization tool. Graph visualization is a way of representing data modeled in terms of nodes and edges (objects and relationships).

Deneir can be used to represent complex graphs with features like search or custom node classification.

Deneir's datasource could be an [API or a file](#API-Specification)

This tool has been built at Synthesio to get the big picture on our microservice architecture and also have a real time dependancies status.
In a fast-growing environment where microservices and interconnections between them grow exponentially, it helps people to vizualize impacts when a microservice changes, or for monitoring purposes.


## We're open to collaboration!

You want to join the and discuss with the team to participate in the project? 
Just use this link to join our [Slack community](https://join.slack.com/t/deneir/shared_invite/zt-vcu8bo93-9u6Qu11agUmmJy3OJZ1lpA)


## Features

- Beautiful KISS UI
- Custom node classification
- Search and Filters
- Show external information on a node


## Use cases & Demos

All demos: [here](https://deneir.github.io/demos/)


### Microservice dependencies

Deneir can be used to monitor a microservices plaftorm, to visualize services status and their dependencies status (internal or external).

At Synthesio, each microservice registers in a global Consul instance. Doing so, a microservice also exports urls to its dependencies status, configuration, changelog, tags, metrics link and also documentation.
A golang daemon internally named `frag` connects to `consul` and for reading the url list. `frag` asynchronously fetch the content of all these urls and consolidate all routes into a  json tree pollable by `Deneir`.
Then you get an almost live map of Synthesio's microservice infrastructure. Which was the first use case for `Deneir`.


![Deneir for microservice](docs/assets/deneir_microservice.png)
![Deneir for microservice (details)](docs/assets/deneir_microservice_details.png)

[=> Live Demo <=](https://deneir.github.io/demos/microservices/)
[Demo files](https://github.com/deneir/deneir.github.io/tree/main/demos/microservices/)



### Cats

Using tags for taxonomy allows you to list all cats for a specific family or visualize family inheritance.

![Deneir for cats](docs/assets/deneir_cats.png)

[=> Live Demo <=](https://deneir.github.io/demos/cats/)
[Demo files](https://github.com/deneir/deneir.github.io/tree/main/demos/cats/)


### Cooking recipes

![Deneir for cooking recipes](docs/assets/deneir_food.png)

[=> Live Demo <=](https://deneir.github.io/demos/food/)
[Demo files](https://github.com/deneir/deneir.github.io/tree/main/demos/food/)


### Add your use case here

Feel free to submit a PR with your use case and feedback.


## Getting started

We provide a docker-compose file to build and test deneir:
* `docker-compose up -d --build`
* A demo config is created by default but you can create a config.json file with your needs (cf "Advanced configuration")
* Open in your browser [http://localhost:5000](http://localhost:5000)


## Advanced configuration

See [Configuration](docs/configuration.md)


## API Specification

See [API](docs/api.md) and [Openapi file](docs/openapi.yaml)


## Building and contributing

* `npm install && npm run build`
* follow the steps described in "Getting started", using the contents of the `build` folder

## Architecture and tech stack

Deneir is built using `react` and `redux`, its graph is built with `D3` and its CSS is built with `Sass`.
Routing is handled on the front end with `react-router`.

The app is composed of 5 main components:
* [`App`](src/containers/App.js) root container of the application, handles initial loading of the data & mounts the rest of the UI.
* [`LeftPanel`](src/components/LeftPanel/index.js) handles search, filtering and hierarchy navigation.
* [`GraphWrapper`](src/containers/GraphWrapper.js) wraps the D3 code that makes up the graph to make it play nice with react.
* [`NodePanel`](src/components/NodePanel/index.js) displayed when a node is selected, lists all available details on the node and its in and outgoing links.
* [`GeneralInfoPanel`](src/components/GeneralInfoPanel.js) Overview panel, makes a list of nodes grouped by status severity.

## Future

We intend to get implement a few features such as:
- graph persistent storage
- differential states
- historize states based on keyframe+diffs (like in video formats)
- compress storage
- allow events replay (if you have an incident you can replay at the speed you like what happened to see where an incident started for instance)
- incident impact simulator (if I break this node of the graph what can I expect)
