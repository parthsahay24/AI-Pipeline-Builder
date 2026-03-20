from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any

app = FastAPI()

# Allow frontend to access the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Dict[str, Any] = Body(...)):
    """
    Parses the pipeline data sent from the frontend.
    Counts the number of nodes, number of edges, and verifies if the 
    graph is a Directed Acyclic Graph (DAG).
    """
    nodes = pipeline.get("nodes", [])
    edges = pipeline.get("edges", [])
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # 1. Create Adjacency List for the graph
    adj = {node["id"]: [] for node in nodes}
    for edge in edges:
        source = edge.get("source")
        target = edge.get("target")
        # Ensure we only track edges between existing nodes
        if source in adj and target in adj:
            adj[source].append(target)
            
    # 2. Check for Directed Acyclic Graph (DAG) using DFS Cycle Detection
    visited = {}
    
    def has_cycle(node):
        # If we visit a node currently in our DFS path, a cycle exists
        if visited.get(node) == "visiting":
            return True
        # If we already fully explored the node, no need to recheck
        if visited.get(node) == "visited":
            return False
            
        visited[node] = "visiting"
        for neighbor in adj.get(node, []):
            if has_cycle(neighbor):
                return True
        visited[node] = "visited"
        return False
        
    is_dag = True
    for node in adj:
        if node not in visited:
            if has_cycle(node):
                is_dag = False
                break
                
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }
