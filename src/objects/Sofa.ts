export default class Sofa extends THREE.Mesh{
    constructor(){


      super();

    }
}

var vertexShader = `
      varying vec2 vUv;
      varying vec3 vViewPosition;
      void main()
      {
        vUv = uv;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        vViewPosition = - mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
`;

var fragmentShader= `




			uniform sampler2D map;
      uniform float shininess;
			varying vec2 vUv;
      uniform vec3 diffuse;
      uniform vec3 specular;
      uniform float opacity;
      uniform vec3 emissive;
      uniform vec3 ambientLightColor;

      uniform sampler2D normalMap;
      uniform vec2 normalScale;


      vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {

        vec3 q0 = dFdx( eye_pos.xyz );
        vec3 q1 = dFdy( eye_pos.xyz );
        vec2 st0 = dFdx( vUv.st );
        vec2 st1 = dFdy( vUv.st );

        vec3 S = normalize( q0 * st1.t - q1 * st0.t );
        vec3 T = normalize( -q0 * st1.s + q1 * st0.s );
        vec3 N = normalize( surf_norm );

        vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
        mapN.xy = normalScale * mapN.xy;
        mat3 tsn = mat3( S, T, N );
        return normalize( tsn * mapN );

      }

      varying vec3 vViewPosition;
      #define saturate(a) clamp( a, 0.0, 1.0 )

      #if MAX_DIR_LIGHTS > 0

      	uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];
      	uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];

      #endif
      vec3 F_Schlick( in vec3 specularColor, in float dotLH ) {


      	float fresnel = exp2( ( -5.55437 * dotLH - 6.98316 ) * dotLH );

      	return ( 1.0 - specularColor ) * fresnel + specularColor;

      }
      float G_BlinnPhong_Implicit( /* in float dotNL, in float dotNV */ ) {


      	return 0.25;

      }
      float D_BlinnPhong( in float shininess, in float dotNH ) {


      	return ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );

      }
      vec3 BRDF_BlinnPhong( in vec3 specularColor, in float shininess, in vec3 normal, in vec3 lightDir, in vec3 viewDir ) {

      	vec3 halfDir = normalize( lightDir + viewDir );

      	float dotNH = saturate( dot( normal, halfDir ) );
      	float dotLH = saturate( dot( lightDir, halfDir ) );

      	vec3 F = F_Schlick( specularColor, dotLH );

      	float G = G_BlinnPhong_Implicit( /* dotNL, dotNV */ );

      	float D = D_BlinnPhong( shininess, dotNH );

      	return F * G * D;

      }



			void main( void ) {
        vec3 outgoingLight = vec3( 0.0 );
      	vec4 diffuseColor = vec4( diffuse, opacity );
      	vec3 totalAmbientLight = ambientLightColor;
      	vec3 totalEmissiveLight = emissive;

        vec3 fdx = dFdx( vViewPosition );
        vec3 fdy = dFdy( vViewPosition );
        vec3 normal = normalize( cross( fdx, fdy ) );
        normal = perturbNormal2Arb( -vViewPosition, normal );

        vec3 totalDiffuseLight = vec3( 0.0 );
        vec3 totalSpecularLight = vec3( 0.0 );

        vec3 viewDir = normalize( vViewPosition );
        float specularStrength;
	      specularStrength = 1.0;



        #if MAX_DIR_LIGHTS > 0

        	for ( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {

        		vec3 lightColor = directionalLightColor[ i ];

        		vec3 lightDir = directionalLightDirection[ i ];


        		float cosineTerm = saturate( dot( normal, lightDir ) );

        		totalDiffuseLight += lightColor * cosineTerm;


        			vec3 brdf = BRDF_BlinnPhong( specular, shininess, normal, lightDir, viewDir );

        		totalSpecularLight += brdf * specularStrength * lightColor * cosineTerm;

        	}

        #endif
        //vec4 texel = texture2D( map, vUv );
        vec4 texelColor = texture2D( map, vUv );
        diffuseColor = texelColor;

        //outgoingLight += diffuseColor.rgb * ( totalDiffuseLight + totalAmbientLight ) + totalSpecularLight + totalEmissiveLight;
        outgoingLight += diffuseColor.rgb  + totalSpecularLight + totalEmissiveLight;


        gl_FragColor = vec4( outgoingLight, diffuseColor.a );
			}
`


// var objLoader = new (<any>THREE).OBJLoader();
// this.name = 'WonderObjLoaderObject';
// objLoader.load('resource/sofa/sofa.obj', ( object )=> {
//   var geometry = object.children[0].geometry;
//   console.log(geometry)
//
//   var sofa = new THREE.Mesh(geometry,new THREE.MeshPhongMaterial({
//     //color: 0xffffff,
//     map:THREE.ImageUtils.loadTexture( "resource/textures/T_Couch_Mask.jpg" ),
//   //  normalMap:THREE.ImageUtils.loadTexture( "resource/textures/T_Couch_N.jpg" )
//   }));
//   sofa.position.set(0,0,0);
//   this.add(sofa);
//
//   var sofa2 = new THREE.Mesh(geometry,new THREE.ShaderMaterial( {
//   	uniforms: uniforms,
//   	vertexShader: vertexShader,
//   	fragmentShader: fragmentShader,
//     derivatives:true
//   } ))
//   sofa2.position.set(2000,0,0);
//   this.add(sofa2);
// });
//



// var sofaShaderSphere = new SofaShaderSphere(1000);
// sofaShaderSphere.position.setY(1500);
// this.addDynamic(sofaShaderSphere);
// var vaseShaderSphere = new VaseShaderSphere(1000);
// vaseShaderSphere.position.setX(-3000);
// vaseShaderSphere.position.setY(1500);
// this.addDynamic(vaseShaderSphere);
// this.addDynamic( new RotatingCube(1*1000,0x00ff00) );

// var sofa = new Sofa();
// this.add(sofa);

// var uniforms = {
//     time: { type: "f", value: 1.0 },
//     resolution: { type: "v2", value: new THREE.Vector2() },
//     map: { type: "t", value: THREE.ImageUtils.loadTexture( "resource/textures/T_Couch_Mask.jpg" ) },
//     normalMap: { type: "t", value: THREE.ImageUtils.loadTexture( "resource/textures/T_Couch_N.jpg" ) },
//     normalScale: { type: "v2", value: new THREE.Vector2(1,1) },
// };
//uniforms.texture.value.wrapS = uniforms.texture.value.wrapT = THREE.RepeatWrapping;
