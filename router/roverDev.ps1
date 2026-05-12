$env:APOLLO_KEY="service:FederatedSubscriptionsGraph:IyamQQM366YUrwzQJHUYFQ"
$env:APOLLO_GRAPH_REF="FederatedSubscriptionsGraph@current"
#$env:APOLLO_ROUTER_LOG=debug
#$env:APOLLO_ROUTER_LOG=trace

rover dev --supergraph-config supergraph.yaml --router-config router-config.yaml --log error


