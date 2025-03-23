import react from '@vitejs/plugin-react-swc';

export default {
  optimizeDeps: {
    exclude: ['@noir-lang/noirc_abi', '@noir-lang/acvm_js'],

    esbuildOptions: {
      target: 'esnext',

    },
    
  },
  plugins: [react()],
};
