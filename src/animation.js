import {
  Color,
  Geometry,
  Matrix4,
  LineBasicMaterial,
  LineSegments,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';

export default function tesseratto() {
    const scene = new Scene();

    const vertices = [
        [0, 0, 0], [0, 3, 0],
        [0, 3, 0], [3, 3, 0],
        [3, 3, 0], [3, 0, 0],
        [3, 0, 0], [0, 0, 0],

        [1, 1, 1], [1, 2, 1],
        [1, 2, 1], [2, 2, 1],
        [2, 2, 1], [2, 1, 1],
        [2, 1, 1], [1, 1, 1],

        [0, 0, 0], [1, 1, 1],
        [0, 3, 0], [1, 2, 1],
        [3, 3, 0], [2, 2, 1],
        [3, 0, 0], [2, 1, 1],
    ];

    const face = new Geometry();
    for (let i=0; i < vertices.length; i++) {
        face.vertices.push(new Vector3(vertices[i][0], vertices[i][1], vertices[i][2]));
    }
    face.translate(-1.5, -1.5, -1.5);

    const geometry = face.clone();
    geometry.merge(face.clone(), new Matrix4().makeRotationX(-Math.PI/2));
    geometry.merge(face.clone(), new Matrix4().makeRotationX(Math.PI/2));
    geometry.merge(face.clone(), new Matrix4().makeRotationY(-Math.PI/2));
    geometry.merge(face.clone(), new Matrix4().makeRotationY(Math.PI/2));

    const material = new LineBasicMaterial({
        color: 0x888888,
    });

    const mesh = new LineSegments(geometry, material);
    mesh.matrixAutoUpdate = false;

    scene.add(mesh);

    const wrapper = document.getElementById('background');
    const canvas = document.getElementById('canvas');
    const bbox = wrapper.getBoundingClientRect();
    const renderer = new WebGLRenderer({
        canvas: canvas,
        antialias: true,
    });

    renderer.setClearColor(new Color(0xffffff));
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(bbox.width, bbox.height);

    const camera = new PerspectiveCamera(70, bbox.width / bbox.height, 1, 1000);
    camera.position.z = 6;

    window.addEventListener('resize', function() {
        const newBbox = wrapper.getBoundingClientRect();
        renderer.setSize(newBbox.width, newBbox.height);
        camera.aspect = newBbox.width / newBbox.height;
        camera.updateProjectionMatrix();
    }, false);

    let scrollPrevious = 0;
    let timePrevious = null;
    function animate(timestamp) {
        // Animate the tesseract rotation and color, plus a
        // simple parallax effect. The coefficients are just
        // magic numbers that have been worked out experimentally
        // to achieve the dessired effect.
        const scrollDelta = window.scrollY - scrollPrevious;
        const timeDelta = timestamp && timePrevious ?
            timestamp - timePrevious :
            0;

        timePrevious = timestamp;
        scrollPrevious = window.scrollY;

        mesh.rotation.x += timeDelta * 0.0005;
        mesh.rotation.y += timeDelta * 0.001;
        mesh.updateMatrix();

        mesh.material.color.addScalar(scrollDelta * 0.0005);

        camera.position.y += scrollDelta * 0.007;
        camera.rotation.x -= scrollDelta * 0.001;
        camera.updateMatrix();

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    animate();
};
