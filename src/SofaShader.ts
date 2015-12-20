var vertexShader = `
      varying vec2 vUv;

      void main()
      {
        vUv = uv;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * mvPosition;
      }
`;

var fragmentShader= `


      uniform float time;
			uniform vec2 resolution;

			uniform sampler2D texture;

			varying vec2 vUv;

			void main( void ) {
        gl_FragColor = vec4( 1.0, 0.0, 0.0, 0.5 );
			}
`
