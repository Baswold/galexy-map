/**
 * Keyboard Shortcuts Module
 * Handles keyboard shortcuts and hotkeys for navigation and controls
 */

/**
 * Keyboard shortcut registry
 */
const shortcuts = new Map();

/**
 * Modifier key state
 */
const modifiers = {
    ctrl: false,
    shift: false,
    alt: false,
    meta: false
};

/**
 * Register a keyboard shortcut
 *
 * @param {string} key - Key name (e.g., 'f', 'Escape', 'Space')
 * @param {Function} callback - Function to call when shortcut is triggered
 * @param {Object} options - Options for the shortcut
 * @param {boolean} options.ctrl - Requires Ctrl key
 * @param {boolean} options.shift - Requires Shift key
 * @param {boolean} options.alt - Requires Alt key
 * @param {string} options.description - Description of what shortcut does
 */
export function registerShortcut(key, callback, options = {}) {
    const shortcutKey = createShortcutKey(key, options);

    shortcuts.set(shortcutKey, {
        key,
        callback,
        options: { ...options },
        description: options.description || ''
    });

    console.log(`Registered shortcut: ${shortcutKey}`);
}

/**
 * Create a unique key for a shortcut based on key and modifiers
 *
 * @param {string} key - Key name
 * @param {Object} options - Modifier options
 * @returns {string} Unique shortcut key
 * @private
 */
function createShortcutKey(key, options) {
    const parts = [];

    if (options.ctrl) parts.push('ctrl');
    if (options.shift) parts.push('shift');
    if (options.alt) parts.push('alt');
    if (options.meta) parts.push('meta');

    parts.push(key.toLowerCase());

    return parts.join('+');
}

/**
 * Handle keydown events
 *
 * @param {KeyboardEvent} event - Keyboard event
 * @private
 */
function handleKeyDown(event) {
    // Update modifier state
    modifiers.ctrl = event.ctrlKey;
    modifiers.shift = event.shiftKey;
    modifiers.alt = event.altKey;
    modifiers.meta = event.metaKey;

    // Create shortcut key from current state
    const shortcutKey = createShortcutKey(event.key, modifiers);

    // Check if shortcut exists
    if (shortcuts.has(shortcutKey)) {
        const shortcut = shortcuts.get(shortcutKey);

        // Prevent default browser behavior
        event.preventDefault();

        // Call the callback
        try {
            shortcut.callback(event);
        } catch (error) {
            console.error(`Error executing shortcut ${shortcutKey}:`, error);
        }
    }
}

/**
 * Handle keyup events
 *
 * @param {KeyboardEvent} event - Keyboard event
 * @private
 */
function handleKeyUp(event) {
    // Update modifier state
    modifiers.ctrl = event.ctrlKey;
    modifiers.shift = event.shiftKey;
    modifiers.alt = event.altKey;
    modifiers.meta = event.metaKey;
}

/**
 * Initialize keyboard shortcuts system
 */
export function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    console.log('Keyboard shortcuts initialized');
}

/**
 * Cleanup keyboard shortcuts
 */
export function disposeKeyboardShortcuts() {
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('keyup', handleKeyUp);

    shortcuts.clear();

    console.log('Keyboard shortcuts disposed');
}

/**
 * Unregister a specific shortcut
 *
 * @param {string} key - Key name
 * @param {Object} options - Modifier options
 */
export function unregisterShortcut(key, options = {}) {
    const shortcutKey = createShortcutKey(key, options);
    shortcuts.delete(shortcutKey);
}

/**
 * Get all registered shortcuts
 *
 * @returns {Array} Array of shortcut information
 */
export function getAllShortcuts() {
    const result = [];

    shortcuts.forEach((shortcut, key) => {
        result.push({
            key,
            displayKey: formatShortcutKey(key),
            description: shortcut.description
        });
    });

    return result.sort((a, b) => a.displayKey.localeCompare(b.displayKey));
}

/**
 * Format shortcut key for display
 *
 * @param {string} key - Shortcut key
 * @returns {string} Formatted key
 * @private
 */
function formatShortcutKey(key) {
    const parts = key.split('+');
    const formatted = parts.map(part => {
        const capitalize = part.charAt(0).toUpperCase() + part.slice(1);
        return capitalize;
    });

    return formatted.join(' + ');
}

/**
 * Show keyboard shortcuts help overlay
 */
export function showShortcutsHelp() {
    let overlay = document.getElementById('shortcutsHelp');

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'shortcutsHelp';
        overlay.className = 'shortcuts-overlay';
        document.body.appendChild(overlay);
    }

    const shortcuts = getAllShortcuts();

    let html = `
        <div class="shortcuts-panel">
            <div class="shortcuts-header">
                <h2>Keyboard Shortcuts</h2>
                <button class="close-btn" onclick="this.closest('.shortcuts-overlay').style.display='none'">×</button>
            </div>
            <div class="shortcuts-content">
    `;

    if (shortcuts.length === 0) {
        html += '<p>No keyboard shortcuts registered.</p>';
    } else {
        html += '<table class="shortcuts-table">';
        shortcuts.forEach(shortcut => {
            html += `
                <tr>
                    <td class="shortcut-key">${shortcut.displayKey}</td>
                    <td class="shortcut-description">${shortcut.description}</td>
                </tr>
            `;
        });
        html += '</table>';
    }

    html += `
            </div>
        </div>
    `;

    overlay.innerHTML = html;
    overlay.style.display = 'flex';
}

/**
 * Hide keyboard shortcuts help overlay
 */
export function hideShortcutsHelp() {
    const overlay = document.getElementById('shortcutsHelp');
    if (overlay) {
        overlay.style.display = 'none';
    }
}
