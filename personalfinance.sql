-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-08-2024 a las 17:56:52
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `personalfinance`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `type` enum('Income','Expense') NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `date` date NOT NULL DEFAULT curdate(),
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `transactions`
--

INSERT INTO `transactions` (`id`, `type`, `amount`, `category`, `date`, `description`) VALUES
(1, 'Income', '1000000.00', 'Salario', '2024-08-01', 'Pago del salario mensual'),
(2, 'Expense', '200.00', 'Supermercado', '2024-08-02', 'Compra semanal en el supermercado'),
(3, 'Expense', '1000.00', 'Renta', '2024-08-03', 'Pago de la renta de agosto'),
(4, 'Income', '300.00', 'Freelance', '2024-08-05', 'Pago por proyecto freelance'),
(5, 'Expense', '50.00', 'Entretenimiento', '2024-08-07', 'Entradas de cine y bocadillos'),
(6, 'Income', '1500.00', 'Salario', '2024-08-01', 'Pago del salario mensual'),
(7, 'Expense', '122.00', 'uno', '2024-08-13', '1212'),
(8, 'Expense', '1204.00', 'Renta', '2024-08-13', 'Pago de la renta de agosto'),
(9, 'Expense', '120000.00', 'ESTUDIO', '2024-08-13', 'cuadernos'),
(10, 'Income', '200000.00', 'otros', '2024-08-13', 'por un trabajo freelance'),
(11, 'Income', '250000.00', 'otros', '2024-08-13', 'por un trabajo freelance'),
(12, 'Expense', '240001.00', 'otros', '2024-08-13', 'por un trabajo freelance'),
(13, 'Income', '241451.00', 'otros', '2024-08-13', 'por un trabajo freelance'),
(14, 'Expense', '120000.00', 'comida', '2024-08-13', 'gasto 1'),
(16, 'Expense', '320000.00', 'tecnologia', '2024-08-14', 'tv 55 pulgadas');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
