var dbUtil = require("../util/utilDB")
const mariadb = require('mariadb')


// TracksService applies User Object validations
var TracksService = function () {
    var self = this;
    self.queryProps = ["id", "title", "artist", "isrc", "albumid", "genre", "userid", "status"];
    self.track = {
        id: 0,
        title: "",
        artist: "",
        isrc: "",
        albumid: 0,
        genre: "",
        userid: 0,
        status: 0
    };
    self.response = [];

    self.GetFilter1 = async function () {
        console.log("GetFilter1")

        try {
            await mariadb.createConnection(dbUtil.getProps())
                .then(async (conn1) => {
                    self.response = await conn1.query("select t.*,a.title as album, u.email, c.name as country from tracks t left join users u on (t.userid = u.id) join country c on (u.countrycode = c.code) join albums a on (a.id = t.albumid);");
                })
                .catch(err => {
                    console.log("not connected due to error: " + err);
                });

            return self.response;
        } catch (e) { console.log(e) }
    };

    self.GetFilter3 = async function () {
        await mariadb.createConnection(dbUtil.getProps())
            .then(async (conn1) => {
                let select = "select * from tracks where artist is null;";
                let update = "UPDATE tracks SET artist = 'Guest User' where id in ({{ids}})";

                let ids = await conn1.query(select);

                if (ids.length !== 0) {
                    ids = ids.map((item) => {
                        if (item.id) return item.id;
                    })
                    update = update.replace("{{ids}}", ids.join(','));
                    self.response = await conn1.query(update);
                }

            })
            .catch(err => {
                console.log("not connected due to error: " + err);
            });

        return self.response;
    };

    // Returns tracks with different genre to its album
    self.GetFilter6 = async function () {
        console.log("GetFilter6")

        try {
            await mariadb.createConnection(dbUtil.getProps())
                .then(async (conn1) => {
                    self.response = await conn1.query("select t.* from tracks t left join albums a on (a.id = t.albumid) where a.genre <> t.genre;");
                })
                .catch(err => {
                    console.log("not connected due to error: " + err);
                });

            return self.response;
        } catch (e) { console.log(e) }
    };

    // GET Tracks
    self.GetTracks = async function () {

        try {
            await mariadb.createConnection(dbUtil.getProps())
                .then(async (conn1) => {
                    self.response = await conn1.query("SELECT * from tracks");
                })
                .catch(err => {
                    console.log("not connected due to error: " + err);
                });

            return self.response;
        } catch (e) { console.log(e) }
    };

    // CREATE Track
    self.CreateTrack = async function () {

        await mariadb.createConnection(dbUtil.getProps())
            .then(async (conn1) => {
                let query = "INSERT INTO tracks(id, title, artist, isrc, albumid, genre, userid, status) VALUES ({{values}})";

                query = query.replace("{{values}}", setValues(self.queryProps, self.track));
                console.log(query);
                self.response = await conn1.query(query);
            })
            .catch(err => {
                console.log("not connected due to error: " + err);
            });

        return self.response;

    };

    // UPDATE
    self.UpdateTrack = async function () {

        await mariadb.createConnection(dbUtil.getProps())
            .then(async (conn1) => {
                let query = "UPDATE tracks SET {{setVals}} WHERE id = {{id}}";

                query = query
                    .replace("{{setVals}}", setUpdateValues(self.queryProps, self.track))
                    .replace("{{id}}", self.track.id);
                console.log(query);

                self.response = await conn1.query(query);
            })
            .catch(err => {
                console.log("not connected due to error: " + err);
            });

        return self.response;

    };

    // DELETE Track
    self.DeleteTrack = async function () {

        await mariadb.createConnection(dbUtil.getProps())
            .then(async (conn1) => {
                self.response = await conn1.query("DELETE FROM tracks WHERE id=" + self.track.id);
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

exports.CreateTracksService = function (track = undefined) {
    var service = new TracksService();
    service.track = track;
    return service;
}
