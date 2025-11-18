/**
 * Constants and Configuration
 * Central location for all magic numbers and configuration values
 */

// Camera Configuration
export const CAMERA = {
    FOV: 75,
    NEAR_PLANE: 0.1,
    FAR_PLANE: 100000,
    INITIAL_POSITION: { x: 0, y: 100, z: 200 }
};

// Controls Configuration
export const CONTROLS = {
    DAMPING_ENABLED: true,
    DAMPING_FACTOR: 0.05,
    MAX_DISTANCE: 50000,
    MIN_DISTANCE: 1
};

// Visual Scale Factors
export const SCALE = {
    STAR_POSITION: 10,           // Multiply star positions by this for better visibility
    PLANET_POSITION: 10,          // Multiply planet positions by this
    ORBIT_RADIUS: 10,             // Scale factor for orbit visualization
    AU_TO_PARSECS: 4.84814e-6    // Conversion factor from AU to parsecs
};

// Star Rendering
export const STAR = {
    BASE_SIZE: 2,
    MIN_BRIGHTNESS: 0.5,
    BRIGHTNESS_SCALE: 8,          // Scale factor for magnitude-based sizing
    OPACITY: 0.9
};

// Planet Rendering
export const PLANET = {
    MIN_RADIUS: 0.5,
    RADIUS_SCALE: 0.3,           // Scale factor for radius calculation
    SPHERE_SEGMENTS_WIDTH: 16,
    SPHERE_SEGMENTS_HEIGHT: 16,
    OPACITY: 0.9
};

// Orbit Visualization
export const ORBIT = {
    SEGMENTS: 64,                // Number of segments in orbit path
    LINE_COLOR: 0x444444,
    LINE_OPACITY: 0.3
};

// Scene Lighting
export const LIGHTING = {
    AMBIENT_COLOR: 0x333333
};

// Update Intervals
export const UPDATE = {
    INFO_PANEL_MS: 16            // ~60fps for smooth updates
};

// Data Files
export const DATA_FILES = {
    STARS: 'data/hygdata_v3.csv',
    PLANETS: 'data/planets.csv'
};

// CSV Column Names
export const CSV_COLUMNS = {
    STARS: {
        X: 'x',
        Y: 'y',
        Z: 'z',
        MAGNITUDE: 'mag',
        SPECTRAL_CLASS: 'spect',
        PROPER_NAME: 'proper'
    },
    PLANETS: {
        NAME: 'name',
        STAR: 'star',
        X: 'x',
        Y: 'y',
        Z: 'z',
        ORBIT_AU: 'orbit_au',
        RADIUS_EARTH: 'radius_earth',
        TYPE: 'type'
    }
};
