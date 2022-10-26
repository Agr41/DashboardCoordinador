var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
var passport = require('passport');
const fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var cerrar_sesionRouter = require('./routes/cerrar_sesion');
var cambiar_passwordRouter = require('./routes/cambiar_password');
var crear_alumnosRouter = require('./routes/crear_alumnos');
var crear_maestrosRouter = require('./routes/crear_maestros');
var crear_materiaRouter = require('./routes/crear_materia');
var editar_calificacionesRouter = require('./routes/editar_calificaciones');
var subir_calificacionesRouter = require('./routes/subir_calificaciones');
var editar_maestroRouter = require('./routes/editar_maestro');
var materiasRouter = require('./routes/materias');
var ver_alumnosRouter = require('./routes/ver_alumnos');
var ver_maestrosRouter = require('./routes/ver_maestros');
var ver_calificacionesRouter = require('./routes/ver_calificaciones');
var editar_alumnosRouter = require('./routes/editar_alumnos');

var app = express();

hbs.registerPartials(__dirname + "/views/partials");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/cerrar_sesion', cerrar_sesionRouter);
app.use('/cambiar_password', cambiar_passwordRouter);
app.use('/crear_alumnos', crear_alumnosRouter);
app.use('/crear_maestros', crear_maestrosRouter);
app.use('/crear_materia', crear_materiaRouter);
app.use('/editar_calificaciones', editar_calificacionesRouter);
app.use('/subir_calificaciones', subir_calificacionesRouter);
app.use('/editar_maestro', editar_maestroRouter);
app.use('/materias', materiasRouter);
app.use('/ver_alumnos', ver_alumnosRouter);
app.use('/ver_maestros', ver_maestrosRouter);
app.use('/ver_calificaciones', ver_calificacionesRouter);
app.use('/editar_alumnos', editar_alumnosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
