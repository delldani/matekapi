const saveData = (mysql, date, score) => {
  const connection = mysql.createConnection({
    host: "eu-cdbr-west-02.cleardb.net",
    user: "bd2194b91fdc96",
    password: "54d44f06",
    database: "heroku_7d4cfb230efdcec",
  });
  connection.connect();

  const str =
    "INSERT INTO `heroku_7d4cfb230efdcec`.`dellaron` (`datum`, `pont`) VALUES ('" +
    date +
    "', '" +
    score +
    "');";
  connection.query(str, (err, rows, fields) => {
    if (err) throw err;

    console.log("aron tábla: ", rows);
  });

  connection.query(
    "SELECT * FROM heroku_7d4cfb230efdcec.dellaron",
    (err, rows, fields) => {
      if (err) throw err;

      console.log("Adatok: ", rows);
    }
  );

  connection.end();
};

const getData = (mysql) => {
  const connection = mysql.createConnection({
    host: "eu-cdbr-west-02.cleardb.net",
    user: "bd2194b91fdc96",
    password: "54d44f06",
    database: "heroku_7d4cfb230efdcec",
  });
  connection.connect();

  connection.query(
    "SELECT * FROM heroku_7d4cfb230efdcec.dellaron",
    (err, rows, fields) => {
      if (err) throw err;

      console.log("Adatok: ", rows);
    }
  );

  connection.end();
};

exports.saveData = saveData;
exports.getData = getData;
