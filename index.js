const http = require("http");
const fs = require("fs");

let output = null;

const replaceMovie = (movieInfo) => {
  const tempMovie = fs.readFileSync(
    `${__dirname}/template-movies.html`,
    "utf-8"
  );
  output = tempMovie.replace("{%MOVIE_TITLE%}", movieInfo.title);
  output = output.replace("{%MOVIE_GENRE%}", movieInfo.genre);
  output = output.replace("{%MOVIE_RATING%}", movieInfo.rating);
  output = output.replace("{%MAIN_CHARACTER%}", movieInfo.character);
  return output;
};

const temp404 = fs.readFileSync(`${__dirname}/404.html`, "utf-8");
const movieData = fs.readFileSync(`${__dirname}/movies.json`, "utf-8");
const movieObj = JSON.parse(movieData);

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/") {
    res.writeHead(200, { "Content-type": "text/html" });
    const movieJsonInfo = movieObj.map((movie) => replaceMovie(movie)).join("");
    console.log(movieJsonInfo);
    res.end(movieJsonInfo);
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end(temp404);
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log(`Listening to requests on port ${5000}`);
});
