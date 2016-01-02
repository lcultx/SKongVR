export default class ExtrudeObject extends THREE.Line{
  constructor(){
    super();

    var extrudeSettings = {
    	amount			: 2,
    	steps			: 1
    // material		: 1,
    	// extrudeMaterial : 0,
    	// bevelEnabled	: true,
    	// bevelThickness  : 2,
    	// bevelSize       : 4,
    	// bevelSegments   : 1,
    };



   this.material = new THREE.MeshLambertMaterial( { color: 0xb00000, wireframe: false } );

				var rectLength = 120, rectWidth = 10;

				var rectShape = new THREE.Shape();
				rectShape.moveTo( 0,0 );
				rectShape.lineTo( 0, rectWidth );
				rectShape.lineTo( rectLength, rectWidth );
				rectShape.lineTo( rectLength, 0 );
				rectShape.lineTo( 0, 0 );

        var sqLength = 80;

      var squareShape = new THREE.Shape();
      squareShape.moveTo( 0,0 );
      squareShape.lineTo( 0, sqLength );
      squareShape.lineTo( sqLength, sqLength );
      squareShape.lineTo( sqLength, 0 );
      squareShape.lineTo( 0, 0 );

  // this.geometry = new THREE.ExtrudeGeometry( rectShape, extrudeSettings );

  // this.geometry = new THREE.ShapeGeometry( squareShape, extrudeSettings );
  this.geometry = (<any>squareShape).createPointsGeometry();


  }
}
