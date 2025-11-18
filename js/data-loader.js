/**
 * Data Loading Module
 * Handles loading and parsing of astronomical data from CSV files
 */

import { DATA_FILES, CSV_COLUMNS } from './constants.js';

/**
 * Parse CSV text into array of objects
 *
 * @param {string} csvText - Raw CSV text
 * @returns {Array<Object>} Array of row objects with column headers as keys
 * @private
 */
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');

    if (lines.length === 0) {
        return [];
    }

    const headers = lines[0].split(',');
    const data = [];

    // Parse each line (skip header)
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();

        if (!line) {
            continue; // Skip empty lines
        }

        const values = line.split(',');
        const row = {};

        headers.forEach((header, index) => {
            row[header] = values[index];
        });

        data.push(row);
    }

    return data;
}

/**
 * Validate star data object
 *
 * @param {Object} star - Star data object
 * @returns {boolean} True if valid
 * @private
 */
function isValidStar(star) {
    const x = parseFloat(star[CSV_COLUMNS.STARS.X]);
    const y = parseFloat(star[CSV_COLUMNS.STARS.Y]);
    const z = parseFloat(star[CSV_COLUMNS.STARS.Z]);

    return !isNaN(x) && !isNaN(y) && !isNaN(z);
}

/**
 * Validate planet data object
 *
 * @param {Object} planet - Planet data object
 * @returns {boolean} True if valid
 * @private
 */
function isValidPlanet(planet) {
    const x = parseFloat(planet[CSV_COLUMNS.PLANETS.X]);
    const y = parseFloat(planet[CSV_COLUMNS.PLANETS.Y]);
    const z = parseFloat(planet[CSV_COLUMNS.PLANETS.Z]);

    return !isNaN(x) && !isNaN(y) && !isNaN(z);
}

/**
 * Load and parse star data from CSV file
 *
 * @returns {Promise<Array<Object>>} Array of star objects with parsed coordinates
 * @throws {Error} If file cannot be loaded or parsed
 */
export async function loadStarData() {
    try {
        const response = await fetch(DATA_FILES.STARS);

        if (!response.ok) {
            throw new Error(`Failed to fetch star data: ${response.status} ${response.statusText}`);
        }

        const csvText = await response.text();
        const rawData = parseCSV(csvText);

        const stars = [];

        for (const row of rawData) {
            if (!isValidStar(row)) {
                continue; // Skip invalid entries
            }

            stars.push({
                x: parseFloat(row[CSV_COLUMNS.STARS.X]),
                y: parseFloat(row[CSV_COLUMNS.STARS.Y]),
                z: parseFloat(row[CSV_COLUMNS.STARS.Z]),
                mag: parseFloat(row[CSV_COLUMNS.STARS.MAGNITUDE]),
                spect: row[CSV_COLUMNS.STARS.SPECTRAL_CLASS],
                name: row[CSV_COLUMNS.STARS.PROPER_NAME]
            });
        }

        console.log(`Successfully loaded ${stars.length} stars`);
        return stars;

    } catch (error) {
        console.error('Error loading star data:', error);
        throw error;
    }
}

/**
 * Load and parse planet data from CSV file
 *
 * @returns {Promise<Array<Object>>} Array of planet objects with parsed data
 * @throws {Error} If file cannot be loaded or parsed
 */
export async function loadPlanetData() {
    try {
        const response = await fetch(DATA_FILES.PLANETS);

        if (!response.ok) {
            throw new Error(`Failed to fetch planet data: ${response.status} ${response.statusText}`);
        }

        const csvText = await response.text();
        const rawData = parseCSV(csvText);

        const planets = [];

        for (const row of rawData) {
            if (!isValidPlanet(row)) {
                continue; // Skip invalid entries
            }

            planets.push({
                x: parseFloat(row[CSV_COLUMNS.PLANETS.X]),
                y: parseFloat(row[CSV_COLUMNS.PLANETS.Y]),
                z: parseFloat(row[CSV_COLUMNS.PLANETS.Z]),
                name: row[CSV_COLUMNS.PLANETS.NAME],
                star: row[CSV_COLUMNS.PLANETS.STAR],
                orbit: parseFloat(row[CSV_COLUMNS.PLANETS.ORBIT_AU]),
                radius: parseFloat(row[CSV_COLUMNS.PLANETS.RADIUS_EARTH]),
                type: row[CSV_COLUMNS.PLANETS.TYPE]
            });
        }

        console.log(`Successfully loaded ${planets.length} planets`);
        return planets;

    } catch (error) {
        console.error('Error loading planet data:', error);
        // Return empty array instead of throwing - planets are optional
        return [];
    }
}

/**
 * Load all astronomical data
 *
 * @returns {Promise<Object>} Object containing stars and planets arrays
 */
export async function loadAllData() {
    const [stars, planets] = await Promise.all([
        loadStarData(),
        loadPlanetData()
    ]);

    return { stars, planets };
}
