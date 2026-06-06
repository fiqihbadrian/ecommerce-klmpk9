import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.klmpk9.ecommerce',
  appName: 'Nine Store',
  webDir: 'out',
  server: {
    androidScheme: 'https',
    cleartext: true
  }
};

export default config;
