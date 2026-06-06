// Helper untuk conditional dynamic export
// Untuk Android build, gunakan force-static
// Untuk web build, gunakan force-dynamic
export const dynamic = process.env.BUILD_MODE === 'android' ? 'force-static' : 'force-dynamic';
