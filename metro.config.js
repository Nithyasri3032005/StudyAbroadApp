const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    // Exclude native CMake build folders under node_modules from Metro file watching.
    // These `.cxx` folders are created by native builds and can appear/disappear,
    // causing ENOENT watcher errors on Windows. Blocking them prevents Metro from
    // trying to watch those transient build directories.
    blockList: [
      /node_modules\/react-native-worklets\/android\/\.cxx\/.*$/,
      /node_modules\/react-native-reanimated\/android\/\.cxx\/.*$/,
      /node_modules\/.*\/\.cxx\/.*$/,
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
