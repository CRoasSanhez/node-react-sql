var dbUtil = require("../util/utilDB")
const mariadb = require('mariadb')


// AlbumService applies Album Object validations
var AlbumService = function () {
    var self = this;
    self.queryProps = ["id", "title", "artist", "label", "upc", "genre", "userid", "status"];
    self.album = {
        id: 0, title: "", artist: "", label: "", upc: "", genre: "", userid: 0, status: 0
    };
    self.response = [];

    // Get Albums by filter
    self.Filter2 = async function (filter) {
        await mariadb.createConnection(dbUtil.getProps())
            .then(async (conn1) => {
                let select = "select * from albums a left join users u on (a.userid = u.id) where {{filter}}";
                select = select.replace("{{filter}}", filter);

                self.response = await conn1.query(select);

            })
            .catch(err => {
                console.log("not connected due to error: " + err);
            });

        return self.response;
    };

    // Update albums status to 0 if contains 0 tracks
    self.Filter4 = async function () {
        await mariadb.createConnection(dbUtil.getProps())
            .then(async (conn1) => {
                let select = "select a.id from albums a left join tracks t on (t.albumid = a.id) where t.id is null group by a.id;";
                let update = "UPDATE albums SET status =0 where id in ({{ids}})";
                let query = "select * from albums where status = 0";

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

    // GET Album
    self.GetAlbum = async function () {

        try {
            await mariadb.createConnection(dbUtil.getProps())
                .then(async (conn1) => {
                    self.response = await conn1.query("SELECT * from albums");
                })
                .catch(err => {
                    console.log("not connected due to error: " + err);
                });

            return self.response;
        } catch (e) { console.log(e) }
    };

    // CREATE Album
    self.CreateAlbum = async function () {

        await mariadb.createConnection(dbUtil.getProps())
            .then(async (conn1) => {
                let query = "INSERT INTO albums(id, title, artist, label, upc, genre, userid, status) VALUES ({{values}})";

                query = query.replace("{{values}}", setValues(self.queryProps, self.album));
                console.log(query)
                self.response = await conn1.query(query);
            })
            .catch(err => {
                console.log("not connected due to error: " + err);
            });

        return self.response;

    };

    // UPDATE
    self.UpdateAlbum = async function () {

        await mariadb.createConnection(dbUtil.getProps())
            .then(async (conn1) => {
                let query = "UPDATE albums SET {{setVals}} WHERE id = {{id}}";

                query = query
                    .replace("{{setVals}}", setUpdateValues(self.queryProps, self.album))
                    .replace("{{id}}", self.album.id);

                self.response = await conn1.query(query);
            })
            .catch(err => {
                console.log("not connected due to error: " + err);
            });

        return self.response;

    };

    // DELETE Album
    self.DeleteAlbum = async function () {

        await mariadb.createConnection(dbUtil.getProps())
            .then(async (conn1) => {
                self.response = await conn1.query("DELETE FROM albums WHERE id=" + self.album.id);
            })
            .catch(err => {
                console.log("not connected due to error: " + err);
            });

        return self.response;

    };

}

function setWhereValues(queryParams) {

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

exports.CreateAlbumService = function (album) {
    var service = new AlbumService();
    service.album = album;
    return service;
}
