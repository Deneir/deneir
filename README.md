# What is Deneir ?

Deneir is an OpenSource Project using the Apache 2.0 License

Deneir is the web frontend application that represents a graph of registered nodes and their dependency status.

Deneir relies on service registration to get node list

Deneir fetches from external APIs nodes, statuses and dependencies

Deneir is meant to be as agnostic as possible

# Origin
Synthesio has chosen a micro-services oriented architecture. In a micro-services architecture the modification pace become rapidly complex to follow. Deneir was developped as a side-project at Synthesio to cope with our continuous infrastructure changes.

# Goals

## compoments
Have a live list of what is actually in production and the status of each component

## functionnal dependencies
know functionnal dependencies status of components (datasources, API, external resources...)

## impact prediction
answer rapidly this simple question : "if this functionnal work-unit goes south what are the consequences ?"

## naming schemes with many components
Naming schemes often come to a point where you can't remember the name of every single. Worse, when someone new comes in the team it rapidly becomes a nightmare to understand what is actually going on

## schematics
Operation
In microservices- maintain a global up-to-date schema is next to impossible : microservices come and go

## add Metadata to components
Regroup alerts, or configure inhibitions you need metadata on your components

## incident timeline
Record snapshots of the graph, to allow graphical incident replay

# Concepts and glossary

## Entity types

* work units (API, processing daemon)
* kafka queue
* data store (es, scylla, mysql)

## Flexible Hierarchy

Deneir does not have a rigid hiearchy per se. Deneir whishes to be as flexible and as agnostic as possible.

Though to help you understand what has been done here. We provide an example of Synthesio's hierarchy :

| tag | description |
|-|-|
| product | Software suite made by the company |
| app |  Software constituting a product |
| circuit |   Software functionnal flow (can have a version such as v1 v1.5 in the name) |
| service |  Generic software code base (a.k.a. work-unit, api, micro-service,...) |
| instance |  Specialized software code base based on a service |
| process |  A system process running an instance or a service |
| system |  Software technical flow (can be related to one or more circuit) |

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

[apidoc.md](apidoc.md)


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
* [x] dependents and dependencies list with links
* [ ] see only dependents in Graph
* [ ] add URL for instances
* [ ] auto refresh for status update
* [x] Firefox compatibility

# Documentation

- You can change the settings in `config.json.dist`. If this file is changed, you need to update the config in the deploy config.
