-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-05-2017 a las 23:08:49
-- Versión del servidor: 10.1.13-MariaDB
-- Versión de PHP: 5.5.37

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `carteleras`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cartelera`
--

CREATE TABLE `cartelera` (
  `id` bigint(20) NOT NULL,
  `borrado` int(11) NOT NULL,
  `fechaCreacion` datetime DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `publica` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cartelera`
--

INSERT INTO `cartelera` (`id`, `borrado`, `fechaCreacion`, `nombre`, `publica`) VALUES
(1, 0, '2017-05-05 17:30:46', 'Ingresantes', 0),
(2, 0, '2017-05-05 17:30:46', 'Primer año', 0),
(3, 0, '2017-05-05 17:30:46', 'Segundo año', 0),
(4, 0, '2017-05-05 17:30:46', 'Tercer año', 0),
(5, 0, '2017-05-05 17:30:46', 'Cuarto año', 0),
(6, 0, '2017-05-05 17:30:46', 'Quinto año', 0),
(7, 0, '2017-05-05 17:30:46', 'Institucional', 0),
(8, 0, '2017-05-05 17:30:46', 'Eventos', 0),
(9, 0, '2017-05-05 17:30:46', 'Ofrecimientos laborales', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario`
--

CREATE TABLE `comentario` (
  `id` bigint(20) NOT NULL,
  `borrado` int(11) NOT NULL,
  `fechaCreacion` datetime DEFAULT NULL,
  `texto` varchar(255) DEFAULT NULL,
  `PERSONA_ID` bigint(20) NOT NULL,
  `PUBLICACION_ID` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `comentario`
--

INSERT INTO `comentario` (`id`, `borrado`, `fechaCreacion`, `texto`, `PERSONA_ID`, `PUBLICACION_ID`) VALUES
(28, 0, '2017-05-05 17:30:50', 'Comentario 1', 13, 22),
(29, 0, '2017-05-05 17:30:50', 'Comentario 2', 14, 23),
(30, 0, '2017-05-05 17:30:50', 'Comentario 3', 15, 24),
(31, 0, '2017-05-05 17:30:50', 'Comentario 4', 16, 25),
(32, 0, '2017-05-05 17:30:50', 'Comentario 5', 17, 26),
(33, 0, '2017-05-05 17:30:50', 'Comentario 6', 19, 27),
(35, 0, '2017-05-09 16:42:50', 'Agregando comentario a la base!', 10, 22),
(58, 0, '2017-05-25 11:12:57', 'Probando agregar comentarios!', 10, 57);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habilitadas`
--

CREATE TABLE `habilitadas` (
  `PUBLICADOR_ID` bigint(20) NOT NULL,
  `CARTELERA_ID` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `habilitadas`
--

INSERT INTO `habilitadas` (`PUBLICADOR_ID`, `CARTELERA_ID`) VALUES
(16, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hibernate_sequence`
--

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(70),
(70),
(70),
(70);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `intereses`
--

CREATE TABLE `intereses` (
  `PERSONA_ID` bigint(20) NOT NULL,
  `CARTELERA_ID` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `intereses`
--

INSERT INTO `intereses` (`PERSONA_ID`, `CARTELERA_ID`) VALUES
(13, 3),
(13, 4),
(13, 5),
(13, 6),
(13, 9),
(14, 3),
(14, 4),
(15, 3),
(15, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `TIPO_PUBLICADOR` varchar(31) NOT NULL,
  `id` bigint(20) NOT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `borrado` int(11) NOT NULL,
  `dni` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fechaNacimiento` datetime DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rol` int(11) NOT NULL,
  `usuario` varchar(255) DEFAULT NULL,
  `legajo` varchar(255) DEFAULT NULL,
  `tieneFoto` int(11) NOT NULL,
  `nombreArchivo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`TIPO_PUBLICADOR`, `id`, `apellido`, `borrado`, `dni`, `email`, `fechaNacimiento`, `nombre`, `password`, `rol`, `usuario`, `legajo`, `tieneFoto`, `nombreArchivo`) VALUES
('AD', 10, 'Oreja', 0, 123456, 'facundooreja@gmail.com', '2017-05-01 00:00:00', 'Facundo', 'admin', 1, 'admin1', NULL, 1, '10_0.1933189593027611.jpg'),
('AD', 11, 'Cuida Bici', 0, 30123456, 'admin2@admin.com', '2017-05-05 17:30:48', 'Luis', 'admin', 1, 'admin2', NULL, 0, NULL),
('AD', 12, 'Maddog', 0, 30123456, 'admin3@admin.com', '2017-05-05 17:30:48', 'John', 'admin', 1, 'admin3', NULL, 0, NULL),
('AL', 13, 'Mendivil', 0, 36734753, 'maximendivil22@gmail.com', '1993-01-02 23:43:12', 'Maximiliano Ezequiel', 'mmendivil123', 3, 'maximendivil', NULL, 0, NULL),
('AL', 14, 'Ringuelet', 0, 123456, 'ezeringue@gmail.com', '1927-03-16 00:00:00', 'Ezequiel', 'eringuelet123', 3, 'ezeringue', '12000/1', 0, NULL),
('AL', 15, 'La Frazia', 0, 321654, 'ellucho@gmail.com', '2017-05-05 17:30:48', 'Luciano', 'llafrazia123', 3, 'lucholafrazia', '11900/1', 0, NULL),
('PR', 16, 'Fava', 0, 12345678, 'laurafava@gmail.com', '2017-05-05 17:30:48', 'Laura', 'lfava123', 2, 'laurafava', NULL, 0, NULL),
('PR', 17, 'Rossi', 0, 12345678, 'gustavorossi@gmail.com', '2017-05-05 17:30:48', 'Gustavo', 'grossi123', 2, 'grossi', NULL, 0, NULL),
('PR', 18, 'Perez', 0, 12345678, 'jppez@gmail.com', '2017-05-05 17:30:48', 'Juan Pablo', 'jpperez123', 2, 'jpperez', NULL, 0, NULL),
('PU', 19, '1', 0, 12345678, 'publicador1@gmail.com', '2017-05-05 17:30:49', 'Publicador', '123', 4, 'publicador1', NULL, 0, NULL),
('PU', 20, '2', 0, 12345678, 'publicador2@gmail.com', '2017-05-05 17:30:49', 'Publicador', '123', 4, 'publicador2', NULL, 0, NULL),
('PU', 21, '3', 0, 12345678, 'publicador3@gmail.com', '2017-05-05 17:30:49', 'Publicador', '123', 4, 'publicador3', NULL, 0, NULL),
('AD', 50, 'prueba', 1, 123, '123', '2017-05-17 00:00:00', 'prueba', 'prueba', 1, 'prueba', NULL, 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicacion`
--

CREATE TABLE `publicacion` (
  `id` bigint(20) NOT NULL,
  `borrado` int(11) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `fechaCreacion` datetime DEFAULT NULL,
  `multimedia` varchar(255) DEFAULT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `CARTELERA_ID` bigint(20) NOT NULL,
  `PERSONA_ID` bigint(20) NOT NULL,
  `aceptaComentarios` int(11) NOT NULL,
  `tieneArchivo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `publicacion`
--

INSERT INTO `publicacion` (`id`, `borrado`, `descripcion`, `fechaCreacion`, `multimedia`, `titulo`, `CARTELERA_ID`, `PERSONA_ID`, `aceptaComentarios`, `tieneArchivo`) VALUES
(22, 0, 'Es una prueba', '2017-05-05 17:30:49', '', 'Prueba', 1, 16, 0, 0),
(23, 0, 'Es una prueba', '2017-05-05 17:30:49', '', 'Prueba2', 2, 17, 0, 0),
(24, 0, 'Es una prueba', '2017-05-05 17:30:49', '', 'Prueba3', 3, 18, 0, 0),
(25, 0, 'Es una prueba', '2017-05-05 17:30:49', '', 'Prueba4', 4, 19, 0, 0),
(26, 0, 'Es una prueba', '2017-05-05 17:30:49', '', 'Prueba5', 5, 20, 0, 0),
(27, 0, 'Es una prueba', '2017-05-05 17:30:49', '', 'Prueba6', 6, 21, 0, 0),
(54, 1, 'Estoy probando subir un archivo', '2017-05-22 18:42:52', '', 'Probando', 1, 10, 1, 1),
(55, 1, 'Agregando una imagen, modificando', '2017-05-22 18:58:00', '', 'Probando', 1, 10, 1, 0),
(56, 0, 'Agregando una imagen, modificando', '2017-05-22 18:59:11', '10_0.06403826276335556.jpg', 'Probando', 1, 10, 1, 1),
(57, 0, 'Probando crear una publicación sin archivo multimedia', '2017-05-25 11:03:39', '', 'Publicación sin archivo', 1, 10, 1, 0),
(59, 0, NULL, '2017-05-25 11:44:12', '16_0.22705461009905203.png', 'Publicación de un profesor', 3, 16, 1, 1),
(60, 0, 'Publicación de prueba', '2017-05-25 13:08:09', '', 'Publicación', 1, 10, 1, 0),
(61, 0, 'probando!', '2017-05-25 17:48:05', '', 'Publicación', 1, 10, 1, 0),
(62, 0, 'Probando', '2017-05-25 17:48:50', '', 'Publicación', 1, 10, 1, 0),
(63, 0, 'Probando una crear una publicación', '2017-05-25 17:51:53', '', 'Publicacion', 1, 10, 1, 0),
(64, 0, 'Agregando una publicacion', '2017-05-25 17:53:25', '', 'Publicacion', 2, 10, 1, 0),
(65, 0, 'Agregando una publicación a la cartelera', '2017-05-25 17:57:23', '', 'Publicacion', 4, 10, 1, 0),
(66, 0, 'Agregando una publicación', '2017-05-25 18:10:08', '', 'Publicación', 2, 10, 1, 0),
(67, 0, 'Agregando una publicacion', '2017-05-25 18:11:16', '', 'Publicacion', 2, 10, 1, 0),
(68, 0, 'Agregando una publicación', '2017-05-25 18:12:11', '', 'Publicación', 3, 10, 1, 0),
(69, 0, 'Agregando una publicación', '2017-05-25 18:14:19', '', 'Publicación', 5, 10, 1, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cartelera`
--
ALTER TABLE `cartelera`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK5iarnipx1s8wgny1x6a31t6f7` (`PERSONA_ID`),
  ADD KEY `FKclsdhfe4dagse6axfb3bwbqi7` (`PUBLICACION_ID`);

--
-- Indices de la tabla `habilitadas`
--
ALTER TABLE `habilitadas`
  ADD PRIMARY KEY (`PUBLICADOR_ID`,`CARTELERA_ID`),
  ADD KEY `FK62xib3olaqthk7osldpic2hhm` (`CARTELERA_ID`);

--
-- Indices de la tabla `intereses`
--
ALTER TABLE `intereses`
  ADD PRIMARY KEY (`PERSONA_ID`,`CARTELERA_ID`),
  ADD KEY `FKh6jhmuxbjgepe0otaj901gskk` (`CARTELERA_ID`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `publicacion`
--
ALTER TABLE `publicacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK1bcm08ovsow2odrvppigstbmr` (`CARTELERA_ID`),
  ADD KEY `FKmsdsopypb2b2x8i9rds0cqrml` (`PERSONA_ID`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD CONSTRAINT `FK5iarnipx1s8wgny1x6a31t6f7` FOREIGN KEY (`PERSONA_ID`) REFERENCES `persona` (`id`),
  ADD CONSTRAINT `FKclsdhfe4dagse6axfb3bwbqi7` FOREIGN KEY (`PUBLICACION_ID`) REFERENCES `publicacion` (`id`);

--
-- Filtros para la tabla `habilitadas`
--
ALTER TABLE `habilitadas`
  ADD CONSTRAINT `FK211e5kapofq2y5iw8q26f8cuq` FOREIGN KEY (`PUBLICADOR_ID`) REFERENCES `persona` (`id`),
  ADD CONSTRAINT `FK62xib3olaqthk7osldpic2hhm` FOREIGN KEY (`CARTELERA_ID`) REFERENCES `cartelera` (`id`);

--
-- Filtros para la tabla `intereses`
--
ALTER TABLE `intereses`
  ADD CONSTRAINT `FK1yq0f3w1jfqxfd6rgq8ffstx7` FOREIGN KEY (`PERSONA_ID`) REFERENCES `persona` (`id`),
  ADD CONSTRAINT `FKh6jhmuxbjgepe0otaj901gskk` FOREIGN KEY (`CARTELERA_ID`) REFERENCES `cartelera` (`id`);

--
-- Filtros para la tabla `publicacion`
--
ALTER TABLE `publicacion`
  ADD CONSTRAINT `FK1bcm08ovsow2odrvppigstbmr` FOREIGN KEY (`CARTELERA_ID`) REFERENCES `cartelera` (`id`),
  ADD CONSTRAINT `FKmsdsopypb2b2x8i9rds0cqrml` FOREIGN KEY (`PERSONA_ID`) REFERENCES `persona` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
