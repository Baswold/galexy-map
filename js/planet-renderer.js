/**
 * Planet Rendering Module
 * Handles visualization of planets and their orbits
 */

import * as THREE from 'three';
import { getPlanetColor } from './colors.js';
import { SCALE, PLANET, ORBIT } from './constants.js';

/**
 * Calculate visual radius for planet sphere
 * Uses logarithmic scale for better visibility of smaller planets
 *
 * @param {number} radiusEarth - Planet radius in Earth radii
 * @returns {number} Scaled radius for rendering
 * @private
 */
function calculatePlanetRadius(radiusEarth) {
    return Math.max(PLANET.MIN_RADIUS, Math.log(radiusEarth + 1) * PLANET.RADIUS_SCALE);
}

/**
 * Create a map of star names to positions
 *
 * @param {Array<Object>} stars - Array of star objects
 * @returns {Map<string, THREE.Vector3>} Map of star names to positions
 * @private
 */
function createStarPositionMap(stars) {
    const starMap = new Map();

    stars.forEach(star => {
        if (star.name) {
            starMap.set(star.name, new THREE.Vector3(
                star.x * SCALE.STAR_POSITION,
                star.y * SCALE.STAR_POSITION,
                star.z * SCALE.STAR_POSITION
            ));
        }
    });

    return starMap;
}

/**
 * Create orbit path visualization
 *
 * @param {THREE.Vector3} starPos - Position of the parent star
 * @param {number} orbitRadiusAU - Orbital radius in AU
 * @returns {THREE.Line} Orbit line object
 * @private
 */
function createOrbitPath(starPos, orbitRadiusAU) {
    // Convert AU to parsecs and apply scaling
    const orbitRadius = orbitRadiusAU * SCALE.AU_TO_PARSECS * SCALE.ORBIT_RADIUS;

    // Create circular path in XY plane
    const orbitCurve = new THREE.EllipseCurve(
        starPos.x, starPos.y,       // Center
        orbitRadius, orbitRadius,   // X and Y radius (circular orbit)
        0, 2 * Math.PI,             // Start and end angle (full circle)
        false,                       // Not clockwise
        0                           // Rotation
    );

    const points = orbitCurve.getPoints(ORBIT.SEGMENTS);
    const orbitGeometry = new THREE.BufferGeometry();
    const orbitPositions = [];

    // Convert 2D curve points to 3D positions
    points.forEach(point => {
        orbitPositions.push(point.x, starPos.z, point.y);
    });

    orbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(orbitPositions, 3));

    const orbitMaterial = new THREE.LineBasicMaterial({
        color: ORBIT.LINE_COLOR,
        transparent: true,
        opacity: ORBIT.LINE_OPACITY
    });

    const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
    orbitLine.name = 'orbit';

    return orbitLine;
}

/**
 * Create a single planet sphere
 *
 * @param {Object} planet - Planet data object
 * @returns {THREE.Mesh} Planet mesh object
 * @private
 */
function createPlanetSphere(planet) {
    const radius = calculatePlanetRadius(planet.radius);
    const geometry = new THREE.SphereGeometry(
        radius,
        PLANET.SPHERE_SEGMENTS_WIDTH,
        PLANET.SPHERE_SEGMENTS_HEIGHT
    );

    const material = new THREE.MeshBasicMaterial({
        color: getPlanetColor(planet.type),
        transparent: true,
        opacity: PLANET.OPACITY
    });

    const sphere = new THREE.Mesh(geometry, material);

    // Scale and position planet
    sphere.position.set(
        planet.x * SCALE.PLANET_POSITION,
        planet.y * SCALE.PLANET_POSITION,
        planet.z * SCALE.PLANET_POSITION
    );

    sphere.name = planet.name;
    sphere.userData.planet = planet; // Store planet data for interactions

    return sphere;
}

/**
 * Create planet visualization with orbits
 *
 * @param {Array<Object>} planets - Array of planet objects
 * @param {Array<Object>} stars - Array of star objects (for orbit positioning)
 * @param {THREE.Scene} scene - Three.js scene to add planets to
 * @returns {THREE.Group} Group containing all planets and orbits
 */
export function createPlanets(planets, stars, scene) {
    if (!planets || planets.length === 0) {
        console.warn('No planets provided to createPlanets');
        return null;
    }

    const planetGroup = new THREE.Group();
    planetGroup.name = 'planetGroup';

    // Create star position map for orbit drawing
    const starMap = createStarPositionMap(stars);

    // Create each planet and its orbit
    planets.forEach(planet => {
        // Create planet sphere
        const planetSphere = createPlanetSphere(planet);
        planetGroup.add(planetSphere);

        // Create orbit path if parent star exists
        if (planet.star && starMap.has(planet.star)) {
            const starPos = starMap.get(planet.star);
            const orbitPath = createOrbitPath(starPos, planet.orbit);
            orbitPath.userData.planet = planet.name;
            planetGroup.add(orbitPath);
        } else if (planet.star) {
            console.warn(`Star "${planet.star}" not found for planet "${planet.name}"`);
        }
    });

    scene.add(planetGroup);

    console.log(`Created ${planets.length} planets with orbits`);
    return planetGroup;
}

/**
 * Update planet positions (for future orbital animation)
 *
 * @param {THREE.Group} planetGroup - Group containing planets
 * @param {number} deltaTime - Time elapsed since last update
 */
export function updatePlanetPositions(planetGroup, deltaTime) {
    if (!planetGroup) {
        return;
    }

    // Iterate through children and update positions
    planetGroup.children.forEach(child => {
        if (child.userData.planet && child.type === 'Mesh') {
            // Future: Implement orbital mechanics here
            // For now, planets remain in their initial positions
        }
    });
}

/**
 * Find planet by name
 *
 * @param {THREE.Group} planetGroup - Group containing planets
 * @param {string} planetName - Name of planet to find
 * @returns {THREE.Mesh|null} Planet mesh or null if not found
 */
export function findPlanetByName(planetGroup, planetName) {
    if (!planetGroup || !planetName) {
        return null;
    }

    for (const child of planetGroup.children) {
        if (child.name === planetName && child.type === 'Mesh') {
            return child;
        }
    }

    return null;
}

/**
 * Toggle orbit visibility
 *
 * @param {THREE.Group} planetGroup - Group containing planets and orbits
 * @param {boolean} visible - Whether orbits should be visible
 */
export function setOrbitVisibility(planetGroup, visible) {
    if (!planetGroup) {
        return;
    }

    planetGroup.children.forEach(child => {
        if (child.name === 'orbit') {
            child.visible = visible;
        }
    });
}
