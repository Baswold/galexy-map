/**
 * Color Management
 * Handles color conversions and mappings for stars and planets
 */

/**
 * Stellar Spectral Color Map
 * Based on actual stellar spectral classifications
 * Colors represent black-body radiation temperatures
 */
const SPECTRAL_COLORS = {
    'O': 0x9bb0ff,      // Blue - Hottest stars (30,000-50,000 K)
    'B': 0xaabfff,      // Blue-white (10,000-30,000 K)
    'A': 0xcad7ff,      // White (7,500-10,000 K)
    'F': 0xf8f7ff,      // Yellow-white (6,000-7,500 K)
    'G': 0xfff4ea,      // Yellow like our Sun (5,200-6,000 K)
    'K': 0xffd2a1,      // Orange (3,700-5,200 K)
    'M': 0xffcc6f       // Red-orange - Coolest stars (2,400-3,700 K)
};

/**
 * Planet Type Color Map
 * Colors based on typical planet compositions and atmospheres
 */
const PLANET_TYPE_COLORS = {
    'terrestrial': 0x8b7355,    // Brown/rocky (like Earth, Mars)
    'super_earth': 0x5588aa,    // Blue-gray (larger rocky planets)
    'gas_giant': 0xdaa520,      // Golden/orange (like Jupiter, Saturn)
    'ice_giant': 0x4682b4       // Steel blue (like Uranus, Neptune)
};

/**
 * Default Colors
 */
const DEFAULT_STAR_COLOR = 0xffffff;    // White for unknown spectral types
const DEFAULT_PLANET_COLOR = 0x888888;  // Gray for unknown planet types

/**
 * Convert stellar spectral class to color
 *
 * @param {string} spectralClass - The spectral classification (e.g., "G2V", "M5", "B8Ia")
 * @returns {number} Hex color value
 */
export function getStarColor(spectralClass) {
    if (!spectralClass || typeof spectralClass !== 'string') {
        return DEFAULT_STAR_COLOR;
    }

    // Extract the primary spectral type (first character)
    const spectralType = spectralClass.charAt(0).toUpperCase();

    return SPECTRAL_COLORS[spectralType] || DEFAULT_STAR_COLOR;
}

/**
 * Get planet color based on planet type
 *
 * @param {string} type - Planet type (e.g., "terrestrial", "gas_giant")
 * @returns {number} Hex color value
 */
export function getPlanetColor(type) {
    if (!type || typeof type !== 'string') {
        return DEFAULT_PLANET_COLOR;
    }

    return PLANET_TYPE_COLORS[type] || DEFAULT_PLANET_COLOR;
}

/**
 * Get all available spectral types and their colors
 * Useful for legend or color picker UI elements
 *
 * @returns {Object} Map of spectral types to colors
 */
export function getSpectralColorMap() {
    return { ...SPECTRAL_COLORS };
}

/**
 * Get all available planet types and their colors
 * Useful for legend or filter UI elements
 *
 * @returns {Object} Map of planet types to colors
 */
export function getPlanetColorMap() {
    return { ...PLANET_TYPE_COLORS };
}
