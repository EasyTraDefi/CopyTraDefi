import { composePlugins, withNx } from '@nx/next';

const nextConfig = {
  webpack: (config) => {
    config.externals = [
      ...(config.externals || []),
      'bigint',
      'node-gyp-build',
    ];
    return config;
  },
  nx: {
    svgr: false,
  },
  experimental: {
    esmExternals: true,
  },
};

const plugins = [
  withNx,
];

export default composePlugins(...plugins)(nextConfig);


// //@ts-check

// // eslint-disable-next-line @typescript-eslint/no-var-requires
// // const { composePlugins, withNx } = require('@nx/next');
// import { composePlugins, withNx } from '@nx/next';
// /**
//  * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
//  **/
// const nextConfig = {
//   webpack: (config) => {
//     config.externals = [
//       ...(config.externals || []),
//       'bigint',
//       'node-gyp-build',
//     ];
//     return config;
//   },
//   nx: {
//     // Set this to true if you would like to use SVGR
//     // See: https://github.com/gregberge/svgr
//     svgr: false,
//   },
// };

// const plugins = [
//   // Add more Next.js plugins to this list if needed.
//   withNx,
// ];

// // module.exports = composePlugins(...plugins)(nextConfig);
// export default composePlugins(...plugins)(nextConfig);
