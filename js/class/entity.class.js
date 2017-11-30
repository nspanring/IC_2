if(world_id == undefined) var world_id = 0;
/**
 * Every Object which can be renderd/displayed MUST have this Entity class!
 */
class Entity {
  constructor() {
      this.ID = world_id + 1; world_id++;
      this.name = syllables[(Math.floor(Math.random() * 3993) + 1 )]+syllables[(Math.floor(Math.random() * 3993) + 1)];
  }
}
exports.Entity = Entity
