

exports.init = async function (conn1) {

   return true;
   let conn;
   let dropDB = 'drop database if exists bquate_test_musica;'
   let createDB = 'create database bquate_test_musica;';

   let tableUsers = `create table IF NOT EXISTS users(
        id int auto_increment primary key,
        name varchar(100), 
        email varchar(50),
        countrycode varchar(50),
        status int
       );`;

   let tableAlbums = `create table IF NOT EXISTS albums(
           id int auto_increment primary key,
           title varchar(255),
           artist varchar(255),
           label varchar(255),
           upc varchar(255),
           genre varchar(255),
           userid int,
           status int,
           CONSTRAINT albums_users FOREIGN KEY(userid) REFERENCES users(id) 
        ON UPDATE no action ON DELETE no action
       );`;

   let tableTracks = `create table IF NOT EXISTS tracks(
           id int auto_increment primary key,
           title  varchar(255),
           artist  varchar(255),
           isrc  varchar(255),
           albumid int,
           genre  varchar(255),
           userid int,
           status int,
           CONSTRAINT tracks_albums FOREIGN KEY(albumid) REFERENCES albums(id) 
        ON UPDATE no action ON DELETE no action
       );`;

   let tableCountry = `create table IF NOT EXISTS country(
           id int auto_increment primary key,
           code  varchar(50),
           name  varchar(255)
       );`;

   //--USERS
   let insertUsers = `INSERT INTO users(id, name, email, countrycode, status) 
       VALUES
       (22, 'Felipe', 'mercury.musica@gmail.com', 'CO', 1), 
       (24, 'Desire', 'desmandriba@yahoo.com', 'PE', 1),
       (26, 'Diego', 'cobra.rockmetal@gmail.com', 'PE', 1),
       (42, 'Diego', 'diegoreyes.bernardini@gmail.com', 'PE', 1),
       (183, 'Guillermo', 'guillermobruno@rocketmail.com', 'AR', 1),
       (195, 'Joel', 'djcaile@outlook.com', 'CL', 1);`;

   //--ALBUMS
   let insertAlbums = `INSERT INTO albums(id, title, artist, label, upc, genre, userid, status) 
       VALUES
       (10, 'To Hell', 'Cobra', 'Austral Holocaust Productions', '4250936511415', 'ROCK', 26, 1),
       (12, 'After', 'Vanilla Funk', 'Independiente', '634654350398', 'ROCK', 42, 1),
       (13, 'We Are Mercury', 'Mercury', 'All We Do Is Party', '634654350206', 'DANCE', 22, 1),
       (14, 'Amante', 'Desiré Mandrile', 'Lupa', '634654350060', 'R_B_SOUL', 24, 1),
       (142, 'Lethal Strike', 'Cobra', 'Austral Holocaust', '4250936511316', 'ROCK', 26, 1),
       (2146, 'Likeflow (Tropical Dance Music)', 'DJ Caile', 'Independiente', '634654352965', 'DANCE', 195, 1),
       (4587, 'Tormenta', 'Desire Mandrile', NULL, '634654356031', 'ALTERNATIVE', 24, 1),
       (8092, 'Indómitos', 'Desire Mandrile ', NULL, '634654363220', 'POP', 24, 1),
       (10479, 'Cumbia Space (Digital Cumbia 2017)', 'Mooglisound', 'Independiente', '634654367914', 'ELECTRONIC', 195, 1),
       (20840, 'Intensidad', 'Desire Mandrile', 'Independiente', '651973325548', 'LATIN', 24, 1);`;
   // --TRACKS
   let insertTracks = `INSERT INTO tracks(id, title, artist, isrc, albumid, genre, userid, status) 
       VALUES
       (1, 'Cuando pienso en ti', 'Desiré Mandrile Ballón', 'PEDM11403001', 14, 'ROCK', 24, 1),
       (2, 'Lo que no fue no será', 'Desiré Mandrile Ballón', 'PEDM11403002', 14, 'R_B_SOUL', 24, 1),
       (3, 'Ahora', 'Desiré Mandrile Ballón', 'PEDM11403003', 14, 'R_B_SOUL', 24, 1),
       (4, 'Almohada', 'Desiré Mandrile Ballón', 'PEDM11403004', 14, 'R_B_SOUL', 24, 1),
       (5, 'Cuando llegue la hora', 'Desiré Mandrile Ballón', 'PEDM11403005', 14, 'R_B_SOUL', 24, 1),
       (6, 'Mío', 'Desiré Mandrile Ballón', 'PEDM11403006', 14, 'R_B_SOUL', 24, 1),
       (7, 'Que somos amantes', 'Desiré Mandrile Ballón', 'PEDM11403007', 14, 'R_B_SOUL', 24, 1),
       (8, 'Cóncavo y convexo', 'Desiré Mandrile Ballón', 'PEDM11403008', 14, 'R_B_SOUL', 24, 1),
       (9, 'Aventurero', 'Desiré Mandrile Ballón', 'PEDM11403009', 14, 'R_B_SOUL', 24, 1),
       (10, 'Jamás impedirás', 'Desiré Mandrile Ballón', 'PEDM11403010', 14, 'R_B_SOUL', 24, 1),
       (32, 'El lagarto', 'Diego Reyes Bernardini', 'PEBQ91400305', 12, 'ROCK', 42, 1),
       (33, 'Ghostbusters', 'Diego Reyes Bernardini', 'PEBQ91400306', 12, 'ROCK', 42, 1),
       (34, 'Máncora', 'Diego Reyes Bernardini', 'PEBQ91400307', 12, 'ROCK', 42, 1),
       (35, 'Mario Bross', 'Diego Reyes Bernardini', 'PEBQ91400308', 12, 'ROCK', 42, 1),
       (36, 'Mingacho', 'Diego Reyes Bernardini', 'PEBQ91400309', 12, 'ROCK', 42, 1),
       (37, 'Strikeforce', 'Diego Reyes Bernardini', 'PEBQ91400310', 12, 'ROCK', 42, 1),
       (38, 'Payasito', 'Diego Reyes Bernardini', 'PEBQ91400311', 12, 'ROCK', 42, 1),
       (39, 'Beyond the Curse', 'Austral Holocaust Productions', 'PEBQ91400009', 10, 'ROCK', 26, 1),
       (40, 'Fallen Soldier', 'Austral Holocaust Productions', 'PEBQ91400010', 10, 'ROCK', 26, 1),
       (41, 'Danger Zone', 'Austral Holocaust Productions', 'PEBQ91400011', 10, 'ROCK', 26, 1),
       (42, 'Rough Riders', 'Austral Holocaust Productions', 'PEBQ91400012', 10, 'ROCK', 26, 1),
       (43, 'Beware My Wrath', 'Austral Holocaust Productions', 'PEBQ91400013', 10, 'ROCK', 26, 1),
       (44, 'When I Walk the Streets', 'Austral Holocaust Productions', 'PEBQ91400014', 10, 'ROCK', 26, 1),
       (45, 'To Hell', 'Austral Holocaust Productions', 'PEBQ91400015', 10, 'ROCK', 26, 1),
       (46, 'Inner Demon', 'Austral Holocaust Productions', 'PEBQ91400016', 10, 'ROCK', 26, 1),
       (47, 'Overwhelmed', 'Austral Holocaust Productions', 'PEBQ91400364', 142, 'ROCK', 26, 1),
       (48, 'Rockmetal', 'Austral Holocaust Productions', 'PEBQ91400365', 142, 'ROCK', 26, 1),
       (49, 'Men of War', 'Austral Holocaust Productions', 'PEBQ91400366', 142, 'ROCK', 26, 1),
       (50, 'Whitechapel', 'Austral Holocaust Productions', 'PEBQ91400367', 142, 'ROCK', 26, 1),
       (51, 'The Roadrunner (Bite my Dust)', 'Austral Holocaust Productions', 'PEBQ91400368', 142, 'ROCK', 26, 1),
       (52, 'Denim Attack', 'Austral Holocaust Productions', 'PEBQ91400369', 142, 'ROCK', 26, 1),
       (53, 'Blessed by Beer', 'Austral Holocaust Productions', 'PEBQ91400370', 142, 'ROCK', 26, 1),
       (54, 'Scene of Our End', 'Austral Holocaust Productions', 'PEBQ91400371', 142, 'ROCK', 26, 1),
       (55, 'Highland Warrior', 'Austral Holocaust Productions', 'PEBQ91400372', 142, 'ROCK', 26, 1),
       (70, 'Dont You know Why', 'Felipe Gordon, Camilo Gómez, Leonardo La Rotta, Santiago Uribe, Juan Uribe', 'PEBQ91400046', 13, 'DANCE', 22, 1),
       (71, 'Going On (Ft Purple Zippers)', 'Felipe Gordon, Camilo Gómez, Leonardo La Rotta, Santiago Uribe, Juan Uribe', 'PEBQ91400047', 13, 'DANCE', 22, 1),
       (72, 'Jelly Beach', 'Felipe Gordon, Camilo Gómez, Leonardo La Rotta, Santiago Uribe, Juan Uribe', 'PEBQ91400048', 13, 'DANCE', 22, 1),
       (73, 'Right Now', 'Felipe Gordon, Camilo Gómez, Leonardo La Rotta, Santiago Uribe, Juan Uribe', 'PEBQ91400049', 13, 'DANCE', 22, 1),
       (77, 'Likeflow (Tropical Dance Music)', 'Joel Saez', 'PEBQ91502130', 2146, 'DANCE', 195, 1),
       (78, 'Cumbia Space (Digital Cumbia 2017)', NULL, 'PEBQ91610734', 10479, 'ELECTRONIC', 195, 1);`;

   //--COUNTRY
   let insertCountries = `INSERT INTO country(id, code, name) 
       VALUES
       (1, 'AR', 'Argentina'),
       (2, 'CO', 'Colombia'),
       (3, 'PE', 'Peru');`;


   try {
      //conn = await mariaDBpool.getConnection();


      //const rows = await conn.query("SELECT 1 as val");
      //console.log(rows); //[ {val: 1}, meta: ... ]

      //const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);

      //var res = await conn1.query(dropDB);
      //console.log(res);

      //res = await conn1.query(createDB);
      //console.log(res);

      res = await conn1.query(tableUsers);
      console.log(res);

      res = await conn1.query(tableAlbums);
      console.log(res);

      res = await conn1.query(tableTracks);
      console.log(res);

      res = await conn1.query(tableCountry);
      console.log(res);

      res = await conn1.query(insertUsers);
      console.log(res);

      res = await conn1.query(insertAlbums);
      console.log(res);

      res = await conn1.query(insertTracks);
      console.log(res);

      res = await conn1.query(insertCountries);
      console.log(res);

   } catch (err) {
      throw err;
   } finally {
      if (conn) return conn.end();
   }
}


//use bquate_test_musica;

