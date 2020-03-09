# To do list

## frag
* [ ] move to previous frag graph format
* [ ] add dependencies and dependents info in graph format
* [ ] add the `service` info as a tag in frag, rather than a regular field
* [ ] rename the `instances` API endpoint to `details`
* [ ] add the chain tags for all components

## details panel
* [ ] add info from the details api to the details panel
* [ ] make sure Deneir works smooth without a `details` API

## filtering
* [ ] allow filtering by tag
* [ ] allow filtering by tag from the details panel
* [ ] allow filtering by status (?)

## zooming/grouping
* [ ] allow grouping/zooming by tags: represent all entities with a same tag value as a single node
* [ ] define the status of a grouped node with the sum of the nodes it contains

## zoom levels
* [ ] define in configuration the hierarchy between tags to define a zoom level feature
* [ ] add breadcrumbs that tell the user where they are in terms of zoom

## status auto refresh
* [ ] basic autorefresh using graph API endpoint + frontend patching
* [ ] use a new 'refresh' endpoint to update entity status

## documentation
* [ ] rewrite feature list as an actual feature list in readme
* [ ] write basic mock graph for demo

## legend
* [ ] add shapes legend

## explore by link mode
* [ ] focus on a single entity, and display its dependencies and dependents, you can explore the graph as you click on other nodes

## pseudo entities
* [ ] allow user to create their own entities (needs new Frag endpoint)

## image export
* [ ] export a png image of the whole graph

## prometheus metrics (advanced details)
* [ ] add extra details URL for specific entity types (to display prometheus metrics)

## view graph history
* [ ] ok settle down we'll see how we do the rest first
