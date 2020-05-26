# To do list

## frag
  * [ ] move to previous frag graph format
  * [ ] add dependencies and dependents info in graph format
  * [ ] add the `service` info as a tag in frag, rather than a regular field
  * [ ] rename the `instances` API endpoint to `details`
  * [ ] add the chain tags for all components

## details panel
  * [ ] add info from the details api to the details panel
  * [ ] make sure Deneir works smooth either with or without a `details` API

## graph animations
  * [ ] when rendering the graph, or rerendering after a filter or a group level change, we should animate only once (not bounce twice)

## filters
 * [ ] when selecting a node hidden by the filters, the app crashes

## zooming/grouping
  * [ ] search should be updated according to grouping

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
