export const getAssetPath = (assetPath) => {
    // For assets in the public folder
    if (assetPath.startsWith('/')) {
        return assetPath;
    }
    // For assets in the src/assets folder
    try {
        return new URL(`../assets/${assetPath}`, import.meta.url).href;
    } catch (error) {
        console.warn(`Could not resolve asset path: ${assetPath}`);
        return assetPath;
    }
};