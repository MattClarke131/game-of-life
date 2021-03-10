module.exports = {
  roots: [
    "./src"
  ],
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  testMatch: [
    "**/(*.)+spec.ts"
  ]
}
