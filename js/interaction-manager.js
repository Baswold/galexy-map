/**
 * Interaction Management Module
 * Handles user interactions with stars and planets (clicks, hover, selection)
 */

import * as THREE from 'three';
import { SCALE } from './constants.js';

/**
 * Interaction state
 */
const state = {
    raycaster: null,
    mouse: new THREE.Vector2(),
    selectedObject: null,
    hoveredObject: null,
    camera: null,
    scene: null,
    renderer: null,
    onSelectCallback: null,
    onHoverCallback: null
};

/**
 * Initialize interaction system
 *
 * @param {THREE.Camera} camera - The camera for raycasting
 * @param {THREE.Scene} scene - The scene containing objects
 * @param {THREE.WebGLRenderer} renderer - The renderer
 * @param {Object} callbacks - Callback functions
 * @param {Function} callbacks.onSelect - Called when object is selected
 * @param {Function} callbacks.onHover - Called when object is hovered
 */
export function initializeInteractions(camera, scene, renderer, callbacks = {}) {
    state.raycaster = new THREE.Raycaster();
    state.camera = camera;
    state.scene = scene;
    state.renderer = renderer;
    state.onSelectCallback = callbacks.onSelect;
    state.onHoverCallback = callbacks.onHover;

    // Set raycaster parameters for better star/planet detection
    state.raycaster.params.Points = {
        threshold: 5  // Pixels threshold for point detection
    };

    // Add event listeners
    renderer.domElement.addEventListener('click', handleClick);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);

    console.log('Interaction system initialized');
}

/**
 * Convert mouse coordinates to normalized device coordinates
 *
 * @param {MouseEvent} event - Mouse event
 * @private
 */
function updateMousePosition(event) {
    const rect = state.renderer.domElement.getBoundingClientRect();

    state.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    state.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

/**
 * Find intersected objects using raycasting
 *
 * @returns {Array} Array of intersection objects
 * @private
 */
function getIntersections() {
    state.raycaster.setFromCamera(state.mouse, state.camera);

    // Check stars (Points)
    const starField = state.scene.getObjectByName('starField');
    const planetGroup = state.scene.getObjectByName('planetGroup');

    const targets = [];
    if (starField) targets.push(starField);
    if (planetGroup) {
        // Add all planet meshes
        planetGroup.children.forEach(child => {
            if (child.type === 'Mesh') {
                targets.push(child);
            }
        });
    }

    return state.raycaster.intersectObjects(targets, false);
}

/**
 * Get star data from intersection
 *
 * @param {Object} intersection - Raycaster intersection object
 * @returns {Object|null} Star data object
 * @private
 */
function getStarFromIntersection(intersection) {
    if (!intersection.object || !intersection.object.userData.stars) {
        return null;
    }

    const stars = intersection.object.userData.stars;
    const index = intersection.index;

    if (index >= 0 && index < stars.length) {
        return {
            type: 'star',
            data: stars[index],
            position: intersection.point
        };
    }

    return null;
}

/**
 * Get planet data from intersection
 *
 * @param {Object} intersection - Raycaster intersection object
 * @returns {Object|null} Planet data object
 * @private
 */
function getPlanetFromIntersection(intersection) {
    if (!intersection.object || !intersection.object.userData.planet) {
        return null;
    }

    return {
        type: 'planet',
        data: intersection.object.userData.planet,
        position: intersection.point,
        mesh: intersection.object
    };
}

/**
 * Handle click events
 *
 * @param {MouseEvent} event - Click event
 * @private
 */
function handleClick(event) {
    updateMousePosition(event);

    const intersections = getIntersections();

    if (intersections.length > 0) {
        const intersection = intersections[0];

        let objectData = null;

        // Check if it's a planet
        objectData = getPlanetFromIntersection(intersection);

        // If not a planet, check if it's a star
        if (!objectData) {
            objectData = getStarFromIntersection(intersection);
        }

        if (objectData) {
            selectObject(objectData);

            if (state.onSelectCallback) {
                state.onSelectCallback(objectData);
            }
        }
    } else {
        // Clicked on empty space - deselect
        deselectObject();

        if (state.onSelectCallback) {
            state.onSelectCallback(null);
        }
    }
}

/**
 * Handle mouse move events for hover effects
 *
 * @param {MouseEvent} event - Mouse move event
 * @private
 */
function handleMouseMove(event) {
    updateMousePosition(event);

    const intersections = getIntersections();

    if (intersections.length > 0) {
        const intersection = intersections[0];

        let objectData = getPlanetFromIntersection(intersection);
        if (!objectData) {
            objectData = getStarFromIntersection(intersection);
        }

        if (objectData) {
            hoverObject(objectData);

            if (state.onHoverCallback) {
                state.onHoverCallback(objectData);
            }

            // Change cursor to pointer
            state.renderer.domElement.style.cursor = 'pointer';
            return;
        }
    }

    // No object hovered
    if (state.hoveredObject) {
        unhoverObject();

        if (state.onHoverCallback) {
            state.onHoverCallback(null);
        }
    }

    state.renderer.domElement.style.cursor = 'default';
}

/**
 * Select an object
 *
 * @param {Object} objectData - Object data (star or planet)
 */
function selectObject(objectData) {
    // Deselect previous if any
    deselectObject();

    state.selectedObject = objectData;

    // Visual feedback for selection
    if (objectData.type === 'planet' && objectData.mesh) {
        // Highlight planet
        objectData.mesh.material.emissive = new THREE.Color(0x444444);
        objectData.mesh.material.emissiveIntensity = 0.5;
    }

    console.log('Selected:', objectData);
}

/**
 * Deselect current object
 */
function deselectObject() {
    if (state.selectedObject) {
        // Remove visual feedback
        if (state.selectedObject.type === 'planet' && state.selectedObject.mesh) {
            state.selectedObject.mesh.material.emissive = new THREE.Color(0x000000);
            state.selectedObject.mesh.material.emissiveIntensity = 0;
        }

        state.selectedObject = null;
    }
}

/**
 * Hover over an object
 *
 * @param {Object} objectData - Object data (star or planet)
 * @private
 */
function hoverObject(objectData) {
    if (state.hoveredObject === objectData) {
        return; // Already hovering
    }

    unhoverObject();
    state.hoveredObject = objectData;

    // Visual feedback for hover (if not selected)
    if (objectData !== state.selectedObject && objectData.type === 'planet' && objectData.mesh) {
        objectData.mesh.material.emissive = new THREE.Color(0x222222);
        objectData.mesh.material.emissiveIntensity = 0.3;
    }
}

/**
 * Remove hover effect
 *
 * @private
 */
function unhoverObject() {
    if (state.hoveredObject) {
        // Remove visual feedback (if not selected)
        if (state.hoveredObject !== state.selectedObject &&
            state.hoveredObject.type === 'planet' &&
            state.hoveredObject.mesh) {
            state.hoveredObject.mesh.material.emissive = new THREE.Color(0x000000);
            state.hoveredObject.mesh.material.emissiveIntensity = 0;
        }

        state.hoveredObject = null;
    }
}

/**
 * Get currently selected object
 *
 * @returns {Object|null} Selected object data
 */
export function getSelectedObject() {
    return state.selectedObject;
}

/**
 * Get currently hovered object
 *
 * @returns {Object|null} Hovered object data
 */
export function getHoveredObject() {
    return state.hoveredObject;
}

/**
 * Focus camera on object
 *
 * @param {Object} objectData - Object to focus on
 * @param {Object} controls - OrbitControls instance
 * @param {number} duration - Animation duration in milliseconds
 */
export function focusOnObject(objectData, controls, duration = 1000) {
    if (!objectData || !objectData.position) {
        return;
    }

    const targetPosition = objectData.position.clone();

    // Set controls target
    controls.target.copy(targetPosition);

    // Calculate good camera position (offset from target)
    const offset = new THREE.Vector3(0, 50, 100);
    const cameraTarget = targetPosition.clone().add(offset);

    // Smoothly move camera (simple version - instant for now)
    state.camera.position.copy(cameraTarget);

    controls.update();

    console.log('Focused on:', objectData.data.name || 'object');
}

/**
 * Cleanup interaction system
 */
export function disposeInteractions() {
    if (state.renderer && state.renderer.domElement) {
        state.renderer.domElement.removeEventListener('click', handleClick);
        state.renderer.domElement.removeEventListener('mousemove', handleMouseMove);
    }

    state.raycaster = null;
    state.selectedObject = null;
    state.hoveredObject = null;

    console.log('Interaction system disposed');
}
