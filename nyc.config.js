module.exports = {
  extends: `@istanbuljs/nyc-config-typescript`,
  include: [
    `src/**/*.ts`,
    `src/*.ts`
  ],
  require: [
    `ts-node/register`
  ],
  sourceMap: true,
  instrument: true
}
