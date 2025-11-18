/**
 * Info Panel Module
 * Displays detailed information about selected stars and planets
 */

/**
 * Create and return info panel HTML
 *
 * @param {Object} objectData - Star or planet data
 * @returns {string} HTML string for info panel
 */
function createInfoPanelHTML(objectData) {
    if (!objectData) {
        return '';
    }

    if (objectData.type === 'star') {
        return createStarInfoHTML(objectData.data);
    } else if (objectData.type === 'planet') {
        return createPlanetInfoHTML(objectData.data);
    }

    return '';
}

/**
 * Create HTML for star information
 *
 * @param {Object} star - Star data
 * @returns {string} HTML string
 * @private
 */
function createStarInfoHTML(star) {
    const name = star.name || 'Unknown Star';
    const spectralClass = star.spect || 'Unknown';
    const magnitude = star.mag !== undefined ? star.mag.toFixed(2) : 'Unknown';
    const distance = star.x !== undefined ?
        Math.sqrt(star.x * star.x + star.y * star.y + star.z * star.z).toFixed(2) :
        'Unknown';

    // Determine star type description
    const starTypeDesc = getStarTypeDescription(spectralClass);

    return `
        <div class="info-panel-header">
            <h2>${name}</h2>
            <span class="object-type">Star</span>
        </div>
        <div class="info-panel-content">
            <div class="info-row">
                <span class="info-label">Spectral Class:</span>
                <span class="info-value">${spectralClass}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Type:</span>
                <span class="info-value">${starTypeDesc}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Apparent Magnitude:</span>
                <span class="info-value">${magnitude}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Distance:</span>
                <span class="info-value">${distance} parsecs (${(distance * 3.26).toFixed(2)} light years)</span>
            </div>
            <div class="info-row">
                <span class="info-label">Position (parsecs):</span>
                <span class="info-value">
                    x: ${star.x?.toFixed(2)},
                    y: ${star.y?.toFixed(2)},
                    z: ${star.z?.toFixed(2)}
                </span>
            </div>
        </div>
    `;
}

/**
 * Create HTML for planet information
 *
 * @param {Object} planet - Planet data
 * @returns {string} HTML string
 * @private
 */
function createPlanetInfoHTML(planet) {
    const name = planet.name || 'Unknown Planet';
    const star = planet.star || 'Unknown Star';
    const type = formatPlanetType(planet.type);
    const orbit = planet.orbit !== undefined ? planet.orbit.toFixed(3) : 'Unknown';
    const radius = planet.radius !== undefined ? planet.radius.toFixed(2) : 'Unknown';
    const mass = planet.mass !== undefined ? planet.mass.toFixed(2) : 'Unknown';

    // Calculate orbital period in years if available
    let periodStr = 'Unknown';
    if (planet.period_days) {
        const years = planet.period_days / 365.25;
        if (years < 1) {
            periodStr = `${planet.period_days.toFixed(1)} days`;
        } else {
            periodStr = `${years.toFixed(2)} years`;
        }
    }

    return `
        <div class="info-panel-header">
            <h2>${name}</h2>
            <span class="object-type">Planet</span>
        </div>
        <div class="info-panel-content">
            <div class="info-row">
                <span class="info-label">Parent Star:</span>
                <span class="info-value">${star}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Planet Type:</span>
                <span class="info-value">${type}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Orbital Distance:</span>
                <span class="info-value">${orbit} AU</span>
            </div>
            <div class="info-row">
                <span class="info-label">Orbital Period:</span>
                <span class="info-value">${periodStr}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Radius:</span>
                <span class="info-value">${radius} Earth radii</span>
            </div>
            <div class="info-row">
                <span class="info-label">Mass:</span>
                <span class="info-value">${mass} Earth masses</span>
            </div>
        </div>
    `;
}

/**
 * Get human-readable star type description
 *
 * @param {string} spectralClass - Spectral classification
 * @returns {string} Description
 * @private
 */
function getStarTypeDescription(spectralClass) {
    if (!spectralClass) return 'Unknown';

    const type = spectralClass.charAt(0).toUpperCase();
    const descriptions = {
        'O': 'Blue - Very Hot (30,000-50,000 K)',
        'B': 'Blue-White - Hot (10,000-30,000 K)',
        'A': 'White (7,500-10,000 K)',
        'F': 'Yellow-White (6,000-7,500 K)',
        'G': 'Yellow - Sun-like (5,200-6,000 K)',
        'K': 'Orange (3,700-5,200 K)',
        'M': 'Red - Cool (2,400-3,700 K)',
        'D': 'White Dwarf - Dead Star'
    };

    return descriptions[type] || spectralClass;
}

/**
 * Format planet type for display
 *
 * @param {string} type - Planet type code
 * @returns {string} Formatted type
 * @private
 */
function formatPlanetType(type) {
    if (!type) return 'Unknown';

    const formatted = type.split('_').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

    return formatted;
}

/**
 * Show info panel with object data
 *
 * @param {Object} objectData - Star or planet data
 */
export function showInfoPanel(objectData) {
    let panel = document.getElementById('detailPanel');

    if (!panel) {
        // Create panel if it doesn't exist
        panel = document.createElement('div');
        panel.id = 'detailPanel';
        panel.className = 'detail-panel';
        document.body.appendChild(panel);
    }

    if (!objectData) {
        panel.style.display = 'none';
        return;
    }

    const html = createInfoPanelHTML(objectData);
    panel.innerHTML = html;
    panel.style.display = 'block';
}

/**
 * Hide info panel
 */
export function hideInfoPanel() {
    const panel = document.getElementById('detailPanel');
    if (panel) {
        panel.style.display = 'none';
    }
}

/**
 * Update info panel with new data
 *
 * @param {Object} objectData - Star or planet data
 */
export function updateInfoPanel(objectData) {
    showInfoPanel(objectData);
}
