/**
 * Main Application Module
 * Initializes and runs the Galaxy Forge visualization
 */

import { initializeScene, setupResizeListener, getCameraInfo } from './scene-manager.js';
import { loadAllData } from './data-loader.js';
import { createStarField } from './star-renderer.js';
import { createPlanets } from './planet-renderer.js';
import {
    initializeUI,
    showLoading,
    hideLoading,
    showError,
    updateStatistics,
    updateCameraPosition,
    countUniqueSystems
} from './ui-manager.js';
import { initializeInteractions, focusOnObject } from './interaction-manager.js';
import { showInfoPanel, hideInfoPanel } from './info-panel.js';
import { initializeSearch, searchAll } from './search-filter.js';
import {
    initializeKeyboardShortcuts,
    registerShortcut,
    showShortcutsHelp
} from './keyboard-shortcuts.js';

/**
 * Application state
 */
const appState = {
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    starField: null,
    planetGroup: null,
    isRunning: false,
    cleanupResize: null
};

/**
 * Animation loop
 * Updates controls and renders the scene
 */
function animate() {
    if (!appState.isRunning) {
        return;
    }

    requestAnimationFrame(animate);

    // Update controls (handles damping)
    if (appState.controls) {
        appState.controls.update();
    }

    // Update camera position display
    if (appState.camera) {
        const cameraInfo = getCameraInfo(appState.camera);
        updateCameraPosition(cameraInfo.position);
    }

    // Render scene
    if (appState.renderer && appState.scene && appState.camera) {
        appState.renderer.render(appState.scene, appState.camera);
    }
}

/**
 * Load and visualize astronomical data
 */
async function loadAndVisualize() {
    try {
        showLoading('Loading star data...');

        // Load all data
        const { stars, planets } = await loadAllData();

        if (stars.length === 0) {
            throw new Error('Could not load star data. Please ensure data/hygdata_v3.csv exists.');
        }

        showLoading('Creating visualization...');

        // Create visualizations
        appState.starField = createStarField(stars, appState.scene);

        if (planets.length > 0) {
            appState.planetGroup = createPlanets(planets, stars, appState.scene);
        }

        // Update statistics
        const systemCount = countUniqueSystems(planets);
        updateStatistics({
            stars: stars.length,
            planets: planets.length,
            systems: systemCount
        });

        // Initialize search system
        initializeSearch(stars, planets);

        // Initialize interactions (click and hover)
        initializeInteractions(appState.camera, appState.scene, appState.renderer, {
            onSelect: (objectData) => {
                if (objectData) {
                    console.log('Selected:', objectData);
                    showInfoPanel(objectData);
                    // Optional: focus on selected object
                    // focusOnObject(objectData, appState.controls);
                } else {
                    hideInfoPanel();
                }
            },
            onHover: (objectData) => {
                // Future: Show tooltip on hover
            }
        });

        // Setup keyboard shortcuts
        setupKeyboardShortcuts();

        // Hide loading screen
        hideLoading();

        console.log('Visualization complete!');
        console.log(`- ${stars.length} stars`);
        console.log(`- ${planets.length} planets`);
        console.log(`- ${systemCount} planetary systems`);

    } catch (error) {
        console.error('Failed to load visualization:', error);
        showError(error.message);
    }
}

/**
 * Setup keyboard shortcuts
 * @private
 */
function setupKeyboardShortcuts() {
    // Help menu
    registerShortcut('?', () => {
        showShortcutsHelp();
    }, { description: 'Show keyboard shortcuts help' });

    registerShortcut('h', () => {
        showShortcutsHelp();
    }, { description: 'Show keyboard shortcuts help' });

    // Escape to close panels
    registerShortcut('Escape', () => {
        hideInfoPanel();
    }, { description: 'Close info panel' });

    // Home - reset camera
    registerShortcut('Home', () => {
        if (appState.camera && appState.controls) {
            appState.camera.position.set(0, 100, 200);
            appState.controls.target.set(0, 0, 0);
            appState.controls.update();
        }
    }, { description: 'Reset camera to initial position' });

    // Search shortcut
    registerShortcut('f', () => {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
        }
    }, { ctrl: true, description: 'Focus search box' });

    console.log('Keyboard shortcuts configured');
}

/**
 * Initialize and start the application
 */
async function init() {
    try {
        console.log('Initializing Galaxy Forge...');

        // Initialize UI
        initializeUI();

        // Initialize keyboard shortcuts system
        initializeKeyboardShortcuts();

        // Initialize Three.js scene
        const sceneData = initializeScene();
        appState.scene = sceneData.scene;
        appState.camera = sceneData.camera;
        appState.renderer = sceneData.renderer;
        appState.controls = sceneData.controls;

        // Set up resize handling
        appState.cleanupResize = setupResizeListener(appState.camera, appState.renderer);

        // Start animation loop
        appState.isRunning = true;
        animate();

        // Load and visualize data
        await loadAndVisualize();

    } catch (error) {
        console.error('Initialization failed:', error);
        showError('Failed to initialize application: ' + error.message);
    }
}

/**
 * Cleanup and shutdown
 */
function shutdown() {
    console.log('Shutting down Galaxy Forge...');

    appState.isRunning = false;

    if (appState.cleanupResize) {
        appState.cleanupResize();
    }

    // Additional cleanup can be added here
}

// Start the application when the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Handle page unload
window.addEventListener('beforeunload', shutdown);

// Export for potential external access
export { appState, init, shutdown };
