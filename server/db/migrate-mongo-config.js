const mongodb = {
  mongodb: {
    url: "mongodb://localhost:27017",
    databaseName: "strweb_database",
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: 'commonjs',
};

export default mongodb;
