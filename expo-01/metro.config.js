const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Isso desativa a nova função do Expo que estava quebrando o Zustand na Web
config.resolver.unstable_enablePackageExports = false;

module.exports = config;