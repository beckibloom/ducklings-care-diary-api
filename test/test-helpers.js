function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      diary,
      students,
      users
      RESTART IDENTITY CASCADE`
  )
};

module.exports = {
  cleanTables,
};