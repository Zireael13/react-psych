export class TimelineNodeError extends Error {
  constructor() {
    super('Timeline props not passed to node. Please put node in a Timeline.')
  }
}
