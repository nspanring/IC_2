class Entity {
  constructor() {
      this.id = world_id + 1; world_id++;
      this.name = syllables[(Math.floor(Math.random() * 3993) + 1 )]+syllables[(Math.floor(Math.random() * 3993) + 1)];
  }
}
