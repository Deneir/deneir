# To do list

## frag
  * [ ] move to previous frag graph format
  * [ ] add dependencies and dependents info in graph format
  * [ ] add the `service` info as a tag in frag, rather than a regular field
  * [ ] rename the `instances` API endpoint to `details`
  * [ ] add the chain tags for all components

## details panel
  * [ ] fix details panel layout
  * [ ] add info from the details api to the details panel
  * [ ] make sure Deneir works smooth without a `details` API

## zoom to fit page
  * [ ] polish zoom to fit page feature (after changing hierarchy level, filtering, etc.)
  * [ ] zoom to fit should not be applied on drag or click
  * [ ] zoom to fit should not continue ticking after zoomed
  * [ ] canvas is unresponsive after a rerender

## zooming/grouping
  * [ ] make filters panel controlled to receive filter updates
  * [ ] search should be updated according to grouping
  * [ ] define the status of a grouped node with the sum of the nodes it contains
  * [ ] define the links between groups based on the links between the nodes they contain
  * [ ] when clicking on a group node, we should move down a level in the hierarchy and filter by the value of the group we clicked

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
