const db = require("../setup/dbConfig").db;
const bcrypt = require("bcrypt");
exports.findUser = async(email)=>{
    db.query(
    `SELECT * FROM users
        WHERE email = $1`,
    [email],(err, result)=>{
        if (err) {
            return err;
        }
        console.log(result.rows)
        return result;
    }
    )
}

exports.insertUser = async(email,hashedPassword)=>{
    db.query(
        `INSERT INTO users (email, password)
        VALUES ($1, $2)
        RETURNING id, password`,
    [email, hashedPassword],
    (err, results) => {
      if (err) {
        throw err;
      }
      return results; 
    }
    )
}

exports.authenticationUser = (email, password)=>{
    return db.query(
        `SELECT * FROM users WHERE email = $1`,
        [email],
        (err, results) => {
          if (err) {
            throw err;
          }
          console.log(results.rows);
  
          if (results.rows.length > 0) {
            const user = results.rows[0];

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        console.log(err);
                        throw err
                    }
                    if (isMatch) {
                        return user
                    } else {
                        //password is incorrect
                        return null;
                    }
                });
            } else {
                return null;
            }
        }
    );
}