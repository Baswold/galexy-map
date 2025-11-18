/**
 * Search and Filter Module
 * Provides search and filtering capabilities for stars and planets
 */

/**
 * Search state
 */
const searchState = {
    allStars: [],
    allPlanets: [],
    filteredStars: [],
    filteredPlanets: [],
    activeFilters: {
        starTypes: new Set(),
        planetTypes: new Set(),
        minMagnitude: -Infinity,
        maxMagnitude: Infinity,
        maxDistance: Infinity
    }
};

/**
 * Initialize search and filter system
 *
 * @param {Array} stars - Array of star objects
 * @param {Array} planets - Array of planet objects
 */
export function initializeSearch(stars, planets) {
    searchState.allStars = stars || [];
    searchState.allPlanets = planets || [];
    searchState.filteredStars = [...searchState.allStars];
    searchState.filteredPlanets = [...searchState.allPlanets];

    console.log('Search system initialized with', stars.length, 'stars and', planets.length, 'planets');
}

/**
 * Search for stars by name
 *
 * @param {string} query - Search query
 * @returns {Array} Matching stars
 */
export function searchStars(query) {
    if (!query || query.trim().length === 0) {
        return searchState.filteredStars;
    }

    const lowerQuery = query.toLowerCase();

    return searchState.filteredStars.filter(star => {
        const name = (star.name || '').toLowerCase();
        return name.includes(lowerQuery);
    });
}

/**
 * Search for planets by name
 *
 * @param {string} query - Search query
 * @returns {Array} Matching planets
 */
export function searchPlanets(query) {
    if (!query || query.trim().length === 0) {
        return searchState.filteredPlanets;
    }

    const lowerQuery = query.toLowerCase();

    return searchState.filteredPlanets.filter(planet => {
        const name = (planet.name || '').toLowerCase();
        const star = (planet.star || '').toLowerCase();
        return name.includes(lowerQuery) || star.includes(lowerQuery);
    });
}

/**
 * Search both stars and planets
 *
 * @param {string} query - Search query
 * @returns {Object} Object with stars and planets arrays
 */
export function searchAll(query) {
    return {
        stars: searchStars(query),
        planets: searchPlanets(query)
    };
}

/**
 * Filter stars by spectral type
 *
 * @param {Array<string>} types - Spectral types to include (e.g., ['O', 'B', 'A'])
 */
export function filterBySpectralType(types) {
    if (!types || types.length === 0) {
        searchState.activeFilters.starTypes.clear();
        return;
    }

    searchState.activeFilters.starTypes = new Set(types.map(t => t.toUpperCase()));
    applyFilters();
}

/**
 * Filter planets by type
 *
 * @param {Array<string>} types - Planet types to include
 */
export function filterByPlanetType(types) {
    if (!types || types.length === 0) {
        searchState.activeFilters.planetTypes.clear();
        return;
    }

    searchState.activeFilters.planetTypes = new Set(types);
    applyFilters();
}

/**
 * Filter stars by magnitude range
 *
 * @param {number} min - Minimum magnitude (inclusive)
 * @param {number} max - Maximum magnitude (inclusive)
 */
export function filterByMagnitude(min, max) {
    searchState.activeFilters.minMagnitude = min !== undefined ? min : -Infinity;
    searchState.activeFilters.maxMagnitude = max !== undefined ? max : Infinity;
    applyFilters();
}

/**
 * Filter stars by distance
 *
 * @param {number} maxDistance - Maximum distance in parsecs
 */
export function filterByDistance(maxDistance) {
    searchState.activeFilters.maxDistance = maxDistance !== undefined ? maxDistance : Infinity;
    applyFilters();
}

/**
 * Apply all active filters
 *
 * @private
 */
function applyFilters() {
    // Filter stars
    searchState.filteredStars = searchState.allStars.filter(star => {
        // Spectral type filter
        if (searchState.activeFilters.starTypes.size > 0) {
            const type = star.spect ? star.spect.charAt(0).toUpperCase() : '';
            if (!searchState.activeFilters.starTypes.has(type)) {
                return false;
            }
        }

        // Magnitude filter
        if (star.mag !== undefined) {
            if (star.mag < searchState.activeFilters.minMagnitude ||
                star.mag > searchState.activeFilters.maxMagnitude) {
                return false;
            }
        }

        // Distance filter
        const distance = Math.sqrt(star.x * star.x + star.y * star.y + star.z * star.z);
        if (distance > searchState.activeFilters.maxDistance) {
            return false;
        }

        return true;
    });

    // Filter planets
    searchState.filteredPlanets = searchState.allPlanets.filter(planet => {
        // Planet type filter
        if (searchState.activeFilters.planetTypes.size > 0) {
            if (!searchState.activeFilters.planetTypes.has(planet.type)) {
                return false;
            }
        }

        return true;
    });

    console.log('Filters applied:', searchState.filteredStars.length, 'stars,', searchState.filteredPlanets.length, 'planets');
}

/**
 * Clear all filters
 */
export function clearFilters() {
    searchState.activeFilters.starTypes.clear();
    searchState.activeFilters.planetTypes.clear();
    searchState.activeFilters.minMagnitude = -Infinity;
    searchState.activeFilters.maxMagnitude = Infinity;
    searchState.activeFilters.maxDistance = Infinity;

    searchState.filteredStars = [...searchState.allStars];
    searchState.filteredPlanets = [...searchState.allPlanets];

    console.log('All filters cleared');
}

/**
 * Get all unique spectral types in dataset
 *
 * @returns {Array<string>} Array of spectral types
 */
export function getAvailableSpectralTypes() {
    const types = new Set();

    searchState.allStars.forEach(star => {
        if (star.spect) {
            const type = star.spect.charAt(0).toUpperCase();
            types.add(type);
        }
    });

    return Array.from(types).sort();
}

/**
 * Get all unique planet types in dataset
 *
 * @returns {Array<string>} Array of planet types
 */
export function getAvailablePlanetTypes() {
    const types = new Set();

    searchState.allPlanets.forEach(planet => {
        if (planet.type) {
            types.add(planet.type);
        }
    });

    return Array.from(types).sort();
}

/**
 * Get current filter state
 *
 * @returns {Object} Active filters
 */
export function getActiveFilters() {
    return {
        starTypes: Array.from(searchState.activeFilters.starTypes),
        planetTypes: Array.from(searchState.activeFilters.planetTypes),
        minMagnitude: searchState.activeFilters.minMagnitude,
        maxMagnitude: searchState.activeFilters.maxMagnitude,
        maxDistance: searchState.activeFilters.maxDistance
    };
}

/**
 * Get filtered results
 *
 * @returns {Object} Filtered stars and planets
 */
export function getFilteredResults() {
    return {
        stars: searchState.filteredStars,
        planets: searchState.filteredPlanets
    };
}
