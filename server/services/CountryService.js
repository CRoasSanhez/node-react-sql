var dbUtil = require("../util/utilDB")
const mariadb = require('mariadb')


// CountryService applies Country Object validations
var CountryService = function () {
    var self = this;
    self.queryProps = ["id", "code", "name"];
    self.country = {
        id: 0, code: "", name: ""
    };
    self.response = [];

    // GET Country
    self.GetCountry = async function () {

        try {
            await mariadb.createConnection(dbUtil.getProps())
                .then(async (conn1) => {
                    self.response = await conn1.query("SELECT * from country");
                })
                .catch(err => {
                    console.log("not connected due to error: " + err);
                });

            return self.response;
        } catch (e) { console.log(e) }
    };

    // CREATE Country
    self.CreateCountry = async function () {

        await mariadb.createConnection(dbUtil.getProps())
            .then(async (conn1) => {
                let query = "INSERT INTO country(id, code, name) VALUES ({{values}})";

                query = query.replace("{{values}}", setValues(self.queryProps, self.country));
                console.log(query)
                self.response = await conn1.query(query);
            })
            .catch(err => {
                console.log("not connected due to error: " + err);
            });

        return self.response;

    };

    // UPDATE
    self.UpdateCountry = async function () {

        await mariadb.createConnection(dbUtil.getProps())
            .then(async (conn1) => {
                let query = "UPDATE country SET {{setVals}} WHERE id = {{id}}";

                query = query
                    .replace("{{setVals}}", setUpdateValues(self.queryProps, self.country))
                    .replace("{{id}}", self.country.id);

                self.response = await conn1.query(query);
            })
            .catch(err => {
                console.log("not connected due to error: " + err);
            });

        return self.response;

    };

    // DELETE Country
    self.DeleteCountry = async function () {

        await mariadb.createConnection(dbUtil.getProps())
            .then(async (conn1) => {
                self.response = await conn1.query("DELETE FROM country WHERE id=" + self.country.id);
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

exports.CreateCountryService = function (country) {
    var service = new CountryService();
    service.country = country;
    return service;
}
