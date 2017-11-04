// Try to avoid basic spam bots by forcing them to evaluate JS code to
// get the email.
window.reachMeOut = function() {
    window.open('mailto:' + window.atob('Z290dXNzb0BnbWFpbC5jb20='), '_blank');
};

window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;
ga('create','UA-XXXXX-Y','auto');ga('send','pageview');

// Background animation
(function tesseratto() {
    var scene = new THREE.Scene();

    var vertices = [
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

    var face = new THREE.Geometry();
    for (var i=0; i < vertices.length; i++) {
        face.vertices.push(new THREE.Vector3(vertices[i][0], vertices[i][1], vertices[i][2]));
    }
    face.translate(-1.5, -1.5, -1.5);

    var geometry = face.clone();
    geometry.merge(face.clone(), new THREE.Matrix4().makeRotationX(-Math.PI/2));
    geometry.merge(face.clone(), new THREE.Matrix4().makeRotationX(Math.PI/2));
    geometry.merge(face.clone(), new THREE.Matrix4().makeRotationY(-Math.PI/2));
    geometry.merge(face.clone(), new THREE.Matrix4().makeRotationY(Math.PI/2));

    var material = new THREE.LineBasicMaterial({
        color: 0x888888,
    });

    var mesh = new THREE.LineSegments(geometry, material);
    mesh.matrixAutoUpdate = false;

    scene.add(mesh);

    var wrapper = document.getElementById('wrapper');
    var canvas = document.getElementById('canvas');
    var bbox = wrapper.getBoundingClientRect();
    var renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
    });

    renderer.setClearColor(new THREE.Color(0xffffff));
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(bbox.width, bbox.height);

    var camera = new THREE.PerspectiveCamera(70, bbox.width / bbox.height, 1, 1000);
    camera.position.z = 6;

    window.addEventListener('resize', function() {
        var newBbox = wrapper.getBoundingClientRect();
        renderer.setSize(newBbox.width, newBbox.height);
        camera.aspect = newBbox.width / newBbox.height;
        camera.updateProjectionMatrix();
    }, false);

    var scrollPrevious = 0;
    var timePrevious = null;
    function animate(timestamp) {
        // Animate the tesseract rotation and color, plus a
        // simple parallax effect. The coefficients are just
        // magic numbers that have been worked out experimentally
        // to achieve the dessired effect.
        var scrollDelta = window.scrollY - scrollPrevious;
        var timeDelta = timestamp && timePrevious ?
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
})();
