const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// 1) MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Route handlers

function getAllTours(req, res) {
  res.status(200).json({
    requestedAt: req.requestTime,
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
}

function getSingleTour(req, res) {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }
  console.log(tour);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
}

function createTour(req, res) {
  console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign(
    {
      id: newId,
    },
    req.body
  );
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
}

function updateTour(req, res) {
  //TODO
}

function deleteTour(req, res) {
  //TODO
}

function getAllUsers(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
}

function createUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
}
function getSingleUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
}

function updateUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
}
function deleteUser(req, res) {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
}

///3) ROUTES

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getSingleTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getSingleUser)
  .patch(updateUser)
  .delete(deleteUser);

// 4 Start server
const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
