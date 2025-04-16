const path = require('path');
const moduleAlias = require('module-alias');

moduleAlias.addAliases({
  '@features': path.resolve(__dirname, 'src/app/user_interface'),
  '@components': path.resolve(__dirname, 'src/app/components'),
  '@postgres': path.resolve(__dirname, 'src/server/postgres'),
  '@errors': path.resolve(__dirname, 'src/server/errors'),
  '@logger': path.resolve(__dirname, 'src/server/services/logger'),
  '@domains': path.resolve(__dirname, 'src/server/domains'),
  '@server-services': path.resolve(__dirname, 'src/server/services'),
  '@client-services': path.resolve(__dirname, 'src/app/services'),
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig
