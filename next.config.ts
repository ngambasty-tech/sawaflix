import type { NextConfig } from "next";
import mockdata from './app/data/mockdata.json';

const nextConfig: NextConfig = {
  /* config options here */
  experimental:{
    // esmExternals:'loose',
  },
};

export default nextConfig;
