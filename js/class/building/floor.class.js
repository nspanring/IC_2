class Floor extends Entity {
  constructor(group,number,x,z, size){
    super() // call constructor of Entity
    this.group = group;
    this.x = x
    this.z = z
    //this.size = size; // The size (m2) of the Building
    //               group,x,y,z,width,depth,height,color=0xffffff, opacity=0.5
    Animation.addMeshBox(this.group,this.x,40*(number),this.z,size,size,40,0xffffff)
  }
}
exports.Floor = Floor
