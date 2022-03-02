const saveData = (mysql, date, score, failure) => {
  const connection = mysql.createConnection({
    host: "eu-cdbr-west-02.cleardb.net",
    user: "bd2194b91fdc96",
    password: "54d44f06",
    database: "heroku_7d4cfb230efdcec",
  });
  connection.connect();
  //Elmenti az aktuális pont értéket
  const saveDataStr =
    "INSERT INTO `heroku_7d4cfb230efdcec`.`dellaronscore` (`date`, `score`, `failure`) VALUES ('" +
    date +
    "', '" +
    score +
    "', '" +
    failure +
    "');";
  connection.query(saveDataStr, (err, rows, fields) => {
    if (err) throw err;
  });
  //Lekéri az összes pontot
  connection.query(
    "SELECT * FROM  heroku_7d4cfb230efdcec.dellaronsumscore ORDER BY id DESC LIMIT 0, 1",
    (err, rows, fields) => {
      if (err) console.log(err);

      const newScore = rows[0].score + score;
      //Frissíti az összes pontot
      const updateStr =
        "UPDATE `heroku_7d4cfb230efdcec`.`dellaronsumscore` SET `score` = '" +
        newScore +
        "' WHERE (`id` = '1')";
      connection.query(updateStr, (err, rows, fields) => {
        if (err) console.log(err);
        connection.end();
      });
    }
  );
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
    "SELECT * FROM heroku_7d4cfb230efdcec.dellaronscore",
    (err, rows, fields) => {
      if (err) throw err;
    }
  );
  connection.end();
};

const getLatestScore = (mysql) => {
  return new Promise(function (resolve, reject) {
    const connection = mysql.createConnection({
      host: "eu-cdbr-west-02.cleardb.net",
      user: "bd2194b91fdc96",
      password: "54d44f06",
      database: "heroku_7d4cfb230efdcec",
    });
    connection.connect();

    connection.query(
      "SELECT * FROM  heroku_7d4cfb230efdcec.dellaronsumscore ORDER BY id DESC LIMIT 0, 1",
      (err, rows, fields) => {
        if (err) return reject(err);
        resolve(rows[0]);
      }
    );

    connection.end();
  });
};

exports.saveData = saveData;
exports.getData = getData;
exports.getLatestScore = getLatestScore;
