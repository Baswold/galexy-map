/**
 * UI Management Module
 * Handles UI updates, user interactions, and information display
 */

/**
 * DOM element cache to avoid repeated queries
 */
const elements = {
    loading: null,
    starCount: null,
    planetCount: null,
    systemCount: null,
    cameraPos: null,
    info: null
};

/**
 * Initialize UI element references
 * Call this once at startup
 */
export function initializeUI() {
    elements.loading = document.getElementById('loading');
    elements.starCount = document.getElementById('starCount');
    elements.planetCount = document.getElementById('planetCount');
    elements.systemCount = document.getElementById('systemCount');
    elements.cameraPos = document.getElementById('cameraPos');
    elements.info = document.getElementById('info');

    console.log('UI initialized');
}

/**
 * Show loading screen with message
 *
 * @param {string} message - Loading message to display
 */
export function showLoading(message = 'Loading astronomical data...') {
    if (elements.loading) {
        elements.loading.textContent = message;
        elements.loading.style.display = 'block';
    }
}

/**
 * Hide loading screen
 */
export function hideLoading() {
    if (elements.loading) {
        elements.loading.style.display = 'none';
    }
}

/**
 * Show error message
 *
 * @param {string} message - Error message to display
 */
export function showError(message) {
    if (elements.loading) {
        elements.loading.textContent = `Error: ${message}`;
        elements.loading.style.display = 'block';
        elements.loading.style.color = '#ff6b6b';
    }
}

/**
 * Update statistics display
 *
 * @param {Object} stats - Statistics object
 * @param {number} stats.stars - Number of stars
 * @param {number} stats.planets - Number of planets
 * @param {number} stats.systems - Number of planetary systems
 */
export function updateStatistics({ stars, planets, systems }) {
    if (elements.starCount) {
        elements.starCount.textContent = stars.toLocaleString();
    }

    if (elements.planetCount) {
        elements.planetCount.textContent = planets.toLocaleString();
    }

    if (elements.systemCount) {
        elements.systemCount.textContent = systems.toLocaleString();
    }
}

/**
 * Update camera position display
 *
 * @param {Object} position - Camera position
 * @param {number} position.x - X coordinate
 * @param {number} position.y - Y coordinate
 * @param {number} position.z - Z coordinate
 */
export function updateCameraPosition({ x, y, z }) {
    if (elements.cameraPos) {
        elements.cameraPos.textContent =
            `Position: (${x.toFixed(1)}, ${y.toFixed(1)}, ${z.toFixed(1)})`;
    }
}

/**
 * Calculate number of unique systems from planet data
 *
 * @param {Array<Object>} planets - Array of planet objects
 * @returns {number} Number of unique star systems
 */
export function countUniqueSystems(planets) {
    const systems = new Set(planets.map(planet => planet.star));
    return systems.size;
}

/**
 * Format large numbers for display
 *
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

/**
 * Create and show a tooltip
 *
 * @param {string} text - Tooltip text
 * @param {number} x - X position (screen coordinates)
 * @param {number} y - Y position (screen coordinates)
 */
export function showTooltip(text, x, y) {
    let tooltip = document.getElementById('tooltip');

    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'tooltip';
        tooltip.style.position = 'absolute';
        tooltip.style.background = 'rgba(0, 0, 0, 0.8)';
        tooltip.style.color = '#fff';
        tooltip.style.padding = '8px 12px';
        tooltip.style.borderRadius = '5px';
        tooltip.style.fontSize = '14px';
        tooltip.style.pointerEvents = 'none';
        tooltip.style.zIndex = '1000';
        document.body.appendChild(tooltip);
    }

    tooltip.textContent = text;
    tooltip.style.left = `${x + 15}px`;
    tooltip.style.top = `${y + 15}px`;
    tooltip.style.display = 'block';
}

/**
 * Hide tooltip
 */
export function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}

/**
 * Update info panel with detailed object information
 *
 * @param {Object} objectData - Data about the selected object
 */
export function updateInfoPanel(objectData) {
    if (!objectData) {
        return;
    }

    // Future: Create detailed info panel for selected stars/planets
    console.log('Selected object:', objectData);
}

/**
 * Create loading progress indicator
 *
 * @param {number} current - Current progress value
 * @param {number} total - Total value
 * @returns {string} Progress message
 */
export function getLoadingProgress(current, total) {
    const percentage = Math.round((current / total) * 100);
    return `Loading... ${percentage}%`;
}

/**
 * Add keyboard shortcut information to UI
 *
 * @param {Array<Object>} shortcuts - Array of shortcut objects
 */
export function displayKeyboardShortcuts(shortcuts) {
    // Future: Create keyboard shortcuts help overlay
    console.log('Available shortcuts:', shortcuts);
}
