import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'verifyu.app',
  appName: '*',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
