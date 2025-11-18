/**
 * Scene Management Module
 * Handles Three.js scene, camera, renderer, and controls setup
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CAMERA, CONTROLS, LIGHTING } from './constants.js';

/**
 * Initialize Three.js scene with camera, renderer, and controls
 *
 * @returns {Object} Object containing scene, camera, renderer, and controls
 */
export function initializeScene() {
    // Create scene
    const scene = new THREE.Scene();
    scene.name = 'mainScene';

    // Create camera
    const camera = new THREE.PerspectiveCamera(
        CAMERA.FOV,
        window.innerWidth / window.innerHeight,
        CAMERA.NEAR_PLANE,
        CAMERA.FAR_PLANE
    );

    camera.position.set(
        CAMERA.INITIAL_POSITION.x,
        CAMERA.INITIAL_POSITION.y,
        CAMERA.INITIAL_POSITION.z
    );

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Add canvas to document
    document.body.appendChild(renderer.domElement);

    // Create orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = CONTROLS.DAMPING_ENABLED;
    controls.dampingFactor = CONTROLS.DAMPING_FACTOR;
    controls.maxDistance = CONTROLS.MAX_DISTANCE;
    controls.minDistance = CONTROLS.MIN_DISTANCE;
    controls.update();

    // Add ambient lighting for better visibility
    const ambientLight = new THREE.AmbientLight(LIGHTING.AMBIENT_COLOR);
    ambientLight.name = 'ambientLight';
    scene.add(ambientLight);

    console.log('Scene initialized successfully');

    return {
        scene,
        camera,
        renderer,
        controls
    };
}

/**
 * Handle window resize events
 *
 * @param {THREE.Camera} camera - The camera to update
 * @param {THREE.WebGLRenderer} renderer - The renderer to update
 */
export function handleResize(camera, renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * Set up window resize listener
 *
 * @param {THREE.Camera} camera - The camera to update on resize
 * @param {THREE.WebGLRenderer} renderer - The renderer to update on resize
 * @returns {Function} Cleanup function to remove listener
 */
export function setupResizeListener(camera, renderer) {
    const resizeHandler = () => handleResize(camera, renderer);
    window.addEventListener('resize', resizeHandler);

    // Return cleanup function
    return () => window.removeEventListener('resize', resizeHandler);
}

/**
 * Dispose of Three.js resources
 * Important for cleanup and preventing memory leaks
 *
 * @param {Object} sceneData - Object containing scene, renderer, controls
 */
export function disposeScene({ scene, renderer, controls }) {
    // Dispose controls
    if (controls) {
        controls.dispose();
    }

    // Dispose all geometries and materials in scene
    if (scene) {
        scene.traverse((object) => {
            if (object.geometry) {
                object.geometry.dispose();
            }

            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => material.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });
    }

    // Dispose renderer
    if (renderer) {
        renderer.dispose();

        // Remove canvas from DOM
        if (renderer.domElement && renderer.domElement.parentNode) {
            renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
    }

    console.log('Scene disposed successfully');
}

/**
 * Get camera information for display
 *
 * @param {THREE.Camera} camera - The camera to get info from
 * @returns {Object} Camera position and rotation information
 */
export function getCameraInfo(camera) {
    return {
        position: {
            x: camera.position.x,
            y: camera.position.y,
            z: camera.position.z
        },
        rotation: {
            x: camera.rotation.x,
            y: camera.rotation.y,
            z: camera.rotation.z
        }
    };
}
