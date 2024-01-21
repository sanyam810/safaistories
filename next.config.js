/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:["lh3.googleusercontent.com","firebasestorage.googleapis.com"]
    },
    webpack: (config) => {
        config.module.rules.push({
          test: /\.(mp3)$/,
          type: "asset/resource",
        });
    
        return config;
    },
}

module.exports = nextConfig
