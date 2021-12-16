const { exampleToArray, fileToArray } = require("../input-parser");

const example = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;

// const input = exampleToArray(example).map((line) => line.split("").map((val) => +val));
const input = fileToArray("./15.txt").map((line) => line.split("").map((val) => +val));

const vectors = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
]; // top right down left

const createGraph = (twoDArray, width) => {
  const result = {};

  for (let [x, row] of twoDArray.entries()) {
    for (let [y, _] of row.entries()) {
      const adjacents = {};
      vectors.forEach(([dx, dy]) => {
        if (twoDArray[x + dx] && twoDArray[y + dy]) {
          adjacents[x + dx + width * (y + dy)] = twoDArray[x + dx][y + dy];
        }
      });
      result[x + width * y] = adjacents;
    }
  }

  return result;
};

const graphWidth = input[0].length;
const graph = createGraph(input, graphWidth);

let shortestDistanceNode = (distances, visited) => {
  let shortest = null;

  for (let node in distances) {
    let currentIsShortest = shortest === null || distances[node] < distances[shortest];

    if (currentIsShortest && !visited.has(node)) {
      shortest = node;
    }
  }
  return shortest;
};

const dijkstra = (graph, start = "0", end = String(graphWidth * graphWidth - 1)) => {
  let distances = {};
  distances[end] = Number.MAX_SAFE_INTEGER;
  distances = Object.assign(distances, graph[start]);

  let parents = { end: null };
  for (let child in graph[start]) {
    parents[child] = start;
  }

  let visited = new Set();
  let node = shortestDistanceNode(distances, visited);

  while (node) {
    console.log(visited.size);
    let distance = distances[node];
    let children = graph[node];
    for (let child in children) {
      if (child === start) continue;
      else {
        let newDistance = distance + children[child];

        if (!distances[child] || distances[child] > newDistance) {
          distances[child] = newDistance;
          parents[child] = node;
        }
      }
    }
    visited.add(node);
    node = shortestDistanceNode(distances, visited);
  }

  let shortestPath = [end];
  let parent = parents[end];
  while (parent) {
    shortestPath.push(parent);
    parent = parents[parent];
  }
  shortestPath.reverse();

  let results = {
    distance: distances[end],
    path: shortestPath,
  };
  return results;
};

// Part 1
console.log(`P1: Shortest route length is ${dijkstra(graph).distance}`);

// Part 2
const SCALE = 5;
let p2Input = [...input];

// scale y
for (let i = 1; i < SCALE; i++) {
  p2Input = p2Input.concat(input.map((row) => row.map((val) => (val + i > 9 ? val + i - 9 : val + i))));
}

// scale xp
p2Input.forEach((row, i) => {
  for (let y = 1; y < SCALE; y++) {
    p2Input[i] = p2Input[i].concat(row.map((val) => (val + y > 9 ? val + y - 9 : val + y)));
  }
});

const p2GraphWidth = graphWidth * SCALE;
const p2Graph = createGraph(p2Input, p2GraphWidth);

console.log(`P2: Shortest route length is ${dijkstra(p2Graph, 0, Math.pow(p2GraphWidth, 2) - 1).distance}`);