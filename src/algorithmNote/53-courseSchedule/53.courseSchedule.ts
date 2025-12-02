export function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const inDegree = new Array(numCourses).fill(0);
  const adj: number[][] = Array.from({ length: numCourses }, () => []);

  // Build the graph and calculate in-degrees
  for (const [course, pre] of prerequisites) {
    adj[pre].push(course);
    inDegree[course]++;
  }

  const queue: number[] = [];
  // Add all courses with 0 in-degree to the queue
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  let count = 0;
  while (queue.length > 0) {
    const curr = queue.shift()!;
    count++;

    for (const next of adj[curr]) {
      inDegree[next]--;
      if (inDegree[next] === 0) {
        queue.push(next);
      }
    }
  }

  return count === numCourses;
}
