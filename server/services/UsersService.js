var dbUtil = require("../util/utilDB")
const mariadb = require('mariadb')


// UsersService applies User Object validations
var UsersService = function () {
    var self = this;
    self.queryProps = ["id", "name", "email", "countrycode", "status"];
    self.user = {
        id: 0,
        name: "",
        email: "",
        countrycode: "",
        status: 0
    };
    self.response = [];

    // Update users status to 0 if contains 0 tracks or albums
    self.Filter5 = async function () {
        await mariadb.createConnection(dbUtil.getProps())
            .then(async (conn1) => {
                let select = "select u.id from users u left join albums a on (u.id = a.userid) where a.userid is null UNION select u.id from users u left join tracks t on (t.userid = u.id) where t.userid is null;";
                let update = "UPDATE users SET status =0 where id in ({{ids}})";
                let query = "select * from users where status = 0";

                let ids = await conn1.query(select);
                if (ids.length !== 0) {
                    ids = ids.map((item) => {
                        if (item.id) return item.id;
                    })
                    update = update.replace("{{ids}}", ids.join(','));
                    self.response = await conn1.query(update);
                    self.response = await conn1.query(query);
                }

            })
            .catch(err => {
                console.log("not connected due to error: " + err);
            });

        return self.response;
    };

    // GET Users
    self.GetUsers = async function () {

        try {
            await mariadb.createConnection(dbUtil.getProps())
                .then(async (conn1) => {
                    self.response = await conn1.query("SELECT * from users");
                })
                .catch(err => {
                    console.log("not connected due to error: " + err);
                });

            return self.response;
        } catch (e) { console.log(e) }
    };

    // CREATE User
    self.CreateUser = async function () {

        await mariadb.createConnection(dbUtil.getProps())
            .then(async (conn1) => {
                let query = "INSERT INTO users(id, name, email, countrycode, status) VALUES ({{values}})";

                query = query.replace("{{values}}", setValues(self.queryProps, self.user));
                console.log(query)
                self.response = await conn1.query(query);
            })
            .catch(err => {
                console.log("not connected due to error: " + err);
            });

        return self.response;

    };

    // UPDATE
    self.UpdateUser = async function () {

        await mariadb.createConnection(dbUtil.getProps())
            .then(async (conn1) => {
                let query = "UPDATE users SET {{setVals}} WHERE id = {{id}}";

                query = query
                    .replace("{{setVals}}", setUpdateValues(self.queryProps, self.user))
                    .replace("{{id}}", self.user.id);

                self.response = await conn1.query(query);
            })
            .catch(err => {
                console.log("not connected due to error: " + err);
            });

        return self.response;

    };

    // DELETE User
    self.DeleteUser = async function () {

        await mariadb.createConnection(dbUtil.getProps())
            .then(async (conn1) => {
                self.response = await conn1.query("DELETE FROM users WHERE id=" + self.user.id);
            })
            .catch(err => {
                console.log("not connected due to error: " + err);
            });

        return self.response;

    };

}

// return values
function setValues(props, obj) {
    var response = "";
    props.forEach(element => {
        if (obj[element] && isNaN(obj[element])) {
            response += "'" + obj[element] + "',";
        } else {
            response += obj[element] + ",";
        }
    });
    return response.slice(0, response.length - 1)
}

function setUpdateValues(props, obj) {
    var response = "";
    props.forEach(element => {
        if (element === "id") {
            return true;
        }

        if (obj[element] && isNaN(obj[element])) {
            response += element + "='" + obj[element] + "',";
        } else {
            response += element + "=" + obj[element] + ",";
        }
    });
    return response.slice(0, response.length - 1)
}

exports.CreateUsersService = function (user) {
    var service = new UsersService();
    service.user = user;
    return service;
}
