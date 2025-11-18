/**
 * Star Rendering Module
 * Handles visualization of stars in 3D space
 */

import * as THREE from 'three';
import { getStarColor } from './colors.js';
import { SCALE, STAR } from './constants.js';

/**
 * Calculate star size based on apparent magnitude
 * Magnitude scale is inverted: lower magnitude = brighter star = larger size
 *
 * @param {number} magnitude - Apparent magnitude of the star
 * @returns {number} Size value for rendering
 * @private
 */
function calculateStarSize(magnitude) {
    // Brighter stars (lower magnitude) should be bigger
    const brightness = Math.max(STAR.MIN_BRIGHTNESS, STAR.BRIGHTNESS_SCALE - magnitude);
    return brightness;
}

/**
 * Create star field visualization
 * Uses Three.js Points for efficient rendering of many stars
 *
 * @param {Array<Object>} stars - Array of star objects with position and properties
 * @param {THREE.Scene} scene - Three.js scene to add stars to
 * @returns {THREE.Points} The created star field object
 */
export function createStarField(stars, scene) {
    if (!stars || stars.length === 0) {
        console.warn('No stars provided to createStarField');
        return null;
    }

    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const sizes = [];

    // Build attribute arrays for all stars
    stars.forEach(star => {
        // Scale positions for better visibility
        positions.push(
            star.x * SCALE.STAR_POSITION,
            star.y * SCALE.STAR_POSITION,
            star.z * SCALE.STAR_POSITION
        );

        // Color based on spectral classification
        const colorHex = getStarColor(star.spect);
        const color = new THREE.Color(colorHex);
        colors.push(color.r, color.g, color.b);

        // Size based on apparent magnitude
        const size = calculateStarSize(star.mag);
        sizes.push(size);
    });

    // Set geometry attributes
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    // Create material with additive blending for glow effect
    const material = new THREE.PointsMaterial({
        size: STAR.BASE_SIZE,
        vertexColors: true,
        sizeAttenuation: true,
        transparent: true,
        opacity: STAR.OPACITY,
        blending: THREE.AdditiveBlending
    });

    // Create and add points to scene
    const starField = new THREE.Points(geometry, material);
    starField.name = 'starField';

    // Store star data for potential interactions
    starField.userData.stars = stars;

    scene.add(starField);

    console.log(`Created star field with ${stars.length} stars`);
    return starField;
}

/**
 * Update star field rendering (for future animation/filtering features)
 *
 * @param {THREE.Points} starField - The star field object to update
 * @param {Object} options - Update options (brightness, visibility filters, etc.)
 */
export function updateStarField(starField, options = {}) {
    if (!starField || !starField.material) {
        console.warn('Invalid star field provided to updateStarField');
        return;
    }

    // Apply brightness adjustment
    if (options.brightness !== undefined) {
        starField.material.opacity = Math.max(0, Math.min(1, options.brightness));
    }

    // Apply size scaling
    if (options.sizeScale !== undefined) {
        starField.material.size = STAR.BASE_SIZE * options.sizeScale;
    }

    // Mark material as needing update
    starField.material.needsUpdate = true;
}

/**
 * Find nearest star to a given position
 * Useful for selection and interaction
 *
 * @param {THREE.Points} starField - The star field object
 * @param {THREE.Vector3} position - Position to search from
 * @param {number} maxDistance - Maximum search distance
 * @returns {Object|null} Nearest star object or null if none found
 */
export function findNearestStar(starField, position, maxDistance = Infinity) {
    if (!starField || !starField.userData.stars) {
        return null;
    }

    const stars = starField.userData.stars;
    let nearestStar = null;
    let nearestDistance = maxDistance;

    stars.forEach(star => {
        const starPos = new THREE.Vector3(
            star.x * SCALE.STAR_POSITION,
            star.y * SCALE.STAR_POSITION,
            star.z * SCALE.STAR_POSITION
        );

        const distance = position.distanceTo(starPos);

        if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestStar = star;
        }
    });

    return nearestStar;
}
