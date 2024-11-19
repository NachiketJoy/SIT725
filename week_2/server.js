const express =  require('express')
const app = express();
const path = require('path');

const PORT = process.env.port | 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the 'public' directory(images,css,javaScript)
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file as the root url
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// function to add 2 numbers
const addNumber = (num1, num2) =>{
  return num1 + num2
}
// function to subtract 2 numbers
const subtractNumber = (num1, num2) =>{
  return num1 - num2
}

// addition using Get req
app.get("/add", (req, res) => {
  const getNum01 = Number(req.query.num1);
  const getNum02 = Number(req.query.num2);

  // check if the value is a number
  if (isNaN(getNum01) || isNaN(getNum02)) {
    return res.status(400).send("Both num1 and num2 must be valid numbers.");
  }

  const sum = addNumber(getNum01, getNum02)
  // res.json({statuscocde:200, data: sum });
  res.send(`The sum for ${getNum01} + ${getNum02} is ${sum}`);
});

// subtraction using Get req
app.get("/subtract", (req, res) => {
  const getNum01 = Number(req.query.num1);
  const getNum02 = Number(req.query.num2);

  if (isNaN(getNum01) || isNaN(getNum02)) {
    return res.status(400).send("Both num1 and num2 must be valid numbers.");
  }

  const diff = subtractNumber(getNum01, getNum02)
  res.send(`The difference for ${getNum01} - ${getNum02} is ${diff}`);
});
 
// addition using post req
app.post("/", (req, res) => {
  // get the form data for num1 and num2
  const postNum1 = Number(req.body.num1);
  const postNum2 = Number(req.body.num2);

  const sum = addNumber(postNum1, postNum2)
  res.send(`The sum for ${postNum1} + ${postNum2} is ${sum}`);
  });

app.listen(
  PORT, 
    () => console.log(`Server running on port: ${PORT}`)
)