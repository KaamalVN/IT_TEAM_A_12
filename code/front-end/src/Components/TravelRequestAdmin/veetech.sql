-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 10, 2023 at 10:16 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `veetech`
--

-- --------------------------------------------------------

--
-- Table structure for table `accompany_detail_table`
--

CREATE TABLE `accompany_detail_table` (
  `id` int(11) NOT NULL,
  `created_date` date NOT NULL,
  `last_updated_date` date NOT NULL,
  `created_time` time DEFAULT NULL,
  `last_updated_time` time DEFAULT NULL,
  `trip_id` int(11) DEFAULT NULL,
  `accompany_employee_id` int(11) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `accompany_employee_table`
--

CREATE TABLE `accompany_employee_table` (
  `id` int(11) NOT NULL,
  `trip_id` int(11) NOT NULL,
  `accompany_employee_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `approver_mapping_table`
--

CREATE TABLE `approver_mapping_table` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `approver_employee_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `approver_mapping_table`
--

INSERT INTO `approver_mapping_table` (`id`, `employee_id`, `approver_employee_id`) VALUES
(1, 2, 5),
(2, 2, 6),
(3, 2, 7),
(4, 2, 8),
(5, 1, 9),
(6, 1, 10),
(7, 1, 11),
(8, 1, 12);

-- --------------------------------------------------------

--
-- Table structure for table `approver_table`
--

CREATE TABLE `approver_table` (
  `id` int(11) NOT NULL,
  `approver_level_id` varchar(25) NOT NULL,
  `company_id` int(11) DEFAULT NULL,
  `created_date` date NOT NULL,
  `last_updated_date` date NOT NULL,
  `created_time` time DEFAULT NULL,
  `last_updated_time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `approver_table`
--

INSERT INTO `approver_table` (`id`, `approver_level_id`, `company_id`, `created_date`, `last_updated_date`, `created_time`, `last_updated_time`) VALUES
(1, 'A1', 1, '0000-00-00', '0000-00-00', NULL, NULL),
(2, 'A2', 1, '0000-00-00', '0000-00-00', NULL, NULL),
(3, 'A3', 1, '0000-00-00', '0000-00-00', NULL, NULL),
(4, 'Travel Desk', 1, '0000-00-00', '0000-00-00', NULL, NULL),
(5, 'Finance Desk', 1, '0000-00-00', '0000-00-00', NULL, NULL),
(6, 'A1', 2, '0000-00-00', '0000-00-00', NULL, NULL),
(7, 'A2', 2, '0000-00-00', '0000-00-00', NULL, NULL),
(8, 'Travel Desk', 2, '0000-00-00', '0000-00-00', NULL, NULL),
(9, 'Finance Desk', 2, '0000-00-00', '0000-00-00', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `billing_entity_table`
--

CREATE TABLE `billing_entity_table` (
  `id` int(11) NOT NULL,
  `billing_entity_id` int(11) NOT NULL,
  `billing_entity` varchar(50) NOT NULL,
  `created_date` date NOT NULL,
  `last_updated_date` date NOT NULL,
  `created_time` time DEFAULT NULL,
  `last_updated_time` time DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `billing_entity_table`
--

INSERT INTO `billing_entity_table` (`id`, `billing_entity_id`, `billing_entity`, `created_date`, `last_updated_date`, `created_time`, `last_updated_time`, `company_id`) VALUES
(1, 1, 'Vee Tech', '0000-00-00', '0000-00-00', NULL, NULL, NULL),
(2, 2, 'Vee Image', '0000-00-00', '0000-00-00', NULL, NULL, NULL),
(3, 3, 'Vee Health Care', '0000-00-00', '0000-00-00', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `broadband_request_table`
--

CREATE TABLE `broadband_request_table` (
  `id` int(11) NOT NULL,
  `broadband_id` int(11) NOT NULL,
  `broadband_claim_date` date NOT NULL,
  `broadband_amount` decimal(8,2) NOT NULL,
  `broadband_status_id` int(11) NOT NULL,
  `broadband_type_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `broadband_type_table`
--

CREATE TABLE `broadband_type_table` (
  `id` int(11) NOT NULL,
  `broadband_type_id` int(11) NOT NULL,
  `broadband_type` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `broadband_type_table`
--

INSERT INTO `broadband_type_table` (`id`, `broadband_type_id`, `broadband_type`) VALUES
(1, 1, 'Broadband'),
(2, 2, 'Mobile');

-- --------------------------------------------------------

--
-- Table structure for table `city_table`
--

CREATE TABLE `city_table` (
  `id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `city_name` varchar(50) NOT NULL,
  `state_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `city_table`
--

INSERT INTO `city_table` (`id`, `city_id`, `city_name`, `state_id`) VALUES
(1, 1, 'Salem', 1),
(2, 2, 'Bengaluru', 2),
(3, 3, 'Quezon City', 4),
(4, 4, 'Makati', 4),
(5, 123, 'Namakkal', 1);

-- --------------------------------------------------------

--
-- Table structure for table `company_table`
--

CREATE TABLE `company_table` (
  `id` int(10) NOT NULL,
  `company_id` varchar(25) NOT NULL,
  `company_name` varchar(35) NOT NULL,
  `company_mail_id` varchar(35) NOT NULL,
  `company_logo` varchar(150) DEFAULT NULL,
  `company_address` varchar(50) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_date` date NOT NULL,
  `last_updated_date` date NOT NULL,
  `created_time` time DEFAULT NULL,
  `last_updated_time` time DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company_table`
--

INSERT INTO `company_table` (`id`, `company_id`, `company_name`, `company_mail_id`, `company_logo`, `company_address`, `is_active`, `created_date`, `last_updated_date`, `created_time`, `last_updated_time`, `country_id`, `state_id`, `city_id`) VALUES
(1, '1', 'Veetech', 'veetech@gmail.com', NULL, '', 0, '0000-00-00', '0000-00-00', NULL, NULL, 1, 1, 1),
(2, '2', 'HK tech', 'hk@gmail.com', NULL, '', 0, '0000-00-00', '0000-00-00', NULL, NULL, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `country_table`
--

CREATE TABLE `country_table` (
  `id` int(11) NOT NULL,
  `country_id` int(11) NOT NULL,
  `country_name` varchar(50) NOT NULL,
  `currency` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `country_table`
--

INSERT INTO `country_table` (`id`, `country_id`, `country_name`, `currency`) VALUES
(1, 101, 'India', 'INR'),
(2, 102, 'Philippines', 'peso');

-- --------------------------------------------------------

--
-- Table structure for table `department_table`
--

CREATE TABLE `department_table` (
  `id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  `department_name` varchar(50) NOT NULL,
  `created_date` date NOT NULL,
  `last_updated_by` date NOT NULL,
  `created_time` time DEFAULT NULL,
  `last_updated_time` time DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department_table`
--

INSERT INTO `department_table` (`id`, `department_id`, `department_name`, `created_date`, `last_updated_by`, `created_time`, `last_updated_time`, `employee_id`) VALUES
(1, 1, 'Informaion Technology', '2023-03-21', '2023-03-22', '15:00:44', '15:00:58', 1),
(2, 2, 'Computer Science', '2023-03-21', '2023-03-21', '15:00:44', '15:02:44', 2),
(3, 3, 'HK', '0000-00-00', '0000-00-00', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `designation_table`
--

CREATE TABLE `designation_table` (
  `id` int(11) NOT NULL,
  `designation_id` int(11) NOT NULL,
  `designation_name` varchar(100) NOT NULL,
  `company_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `designation_table`
--

INSERT INTO `designation_table` (`id`, `designation_id`, `designation_name`, `company_id`) VALUES
(1, 1, 'Employee', 1),
(2, 2, 'Approver', 2),
(3, 3, 'Admin', 2);

-- --------------------------------------------------------

--
-- Table structure for table `employee_table`
--

CREATE TABLE `employee_table` (
  `id` int(11) NOT NULL,
  `employee_id` varchar(25) NOT NULL,
  `employee_name` varchar(35) NOT NULL,
  `Phone` int(11) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `address` varchar(200) NOT NULL,
  `employee_dob` date DEFAULT NULL,
  `passport_number` varchar(20) DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  `passport_name` varchar(50) DEFAULT NULL,
  `aadhar_number` double DEFAULT NULL,
  `dl_number` varchar(30) DEFAULT NULL,
  `pan_number` varchar(30) DEFAULT NULL,
  `created_date` date NOT NULL,
  `last_updated_date` date NOT NULL,
  `created_time` time DEFAULT NULL,
  `last_updated_time` time DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `designation_id` int(11) DEFAULT NULL,
  `approver_level_id` int(11) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee_table`
--

INSERT INTO `employee_table` (`id`, `employee_id`, `employee_name`, `Phone`, `mail`, `address`, `employee_dob`, `passport_number`, `expiry_date`, `passport_name`, `aadhar_number`, `dl_number`, `pan_number`, `created_date`, `last_updated_date`, `created_time`, `last_updated_time`, `company_id`, `designation_id`, `approver_level_id`, `department_id`) VALUES
(1, 'E1', 'Sample1', 874897, 'example@gmail.com', '5 roads,Salem', '2001-04-03', '123456789012', '2024-04-26', 'Sample1', 1.234567812345678e15, 'AB12312H1', 'AB12312H1', '2023-03-21', '2023-03-21', '15:03:49', '15:03:59', 2, 1, 6, 1),
(2, 'E2', 'Sample2', 874676, 'sample@gmail.com', '4 roads,Salem', '2001-04-04', '123456789012', '2024-04-26', 'Sample2', 1.234567812345678e15, 'AB12312H1', 'AB12312H1', '2023-03-21', '2023-03-21', '15:03:49', '15:03:59', 1, 1, 1, 1),
(4, 'E3', 'Admin', 8903831, 'admin@gmail.com', 'salem', '2002-04-05', '12345678912', '2024-04-11', 'Sample3', 1.234567812345678e15, 'AB12312H1', 'AB12312H1', '0000-00-00', '0000-00-00', NULL, NULL, 1, 3, 1, 1),
(5, 'E5', 'Approver1', 0, 'approver1@gmail.com', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, NULL, 1, 2, 2, 1),
(6, 'E6', 'Approver2', 0, 'approver2@gmail.com', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, NULL, 1, 2, 3, 1),
(7, 'E7', 'Travel Desk', 0, 'traveldesk@gmail.com', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, NULL, 1, 1, 4, 1),
(8, 'E8', 'Finance Desk', 0, 'financedesk@gmail.com', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, NULL, 1, 1, 5, 1),
(9, 'E9', 'HK approver 1', 0, 'hka1@gmail.com', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, NULL, 2, NULL, 7, 3),
(10, 'E10', 'HK approver 2', 0, 'hka2@gmail.com', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, NULL, 2, 2, 8, 3),
(11, 'E11', 'HK Travel Desk', 0, 'hktr@gmail.com', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, NULL, 2, 2, 8, 3),
(12, 'E12', 'HK Finance Desk', 0, 'hkfd@gmail.com', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0000-00-00', '0000-00-00', NULL, NULL, 2, 2, 9, 3);

-- --------------------------------------------------------

--
-- Table structure for table `login_table`
--

CREATE TABLE `login_table` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(40) NOT NULL,
  `employee_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login_table`
--

INSERT INTO `login_table` (`id`, `email`, `password`, `employee_id`) VALUES
(1, 'sample@gmail.com', '123', 1),
(2, 'example@gmail.com', '123', 2),
(3, 'admin@gmail.com', '123', 4),
(4, 'approver1@gmail.com', '123', 5),
(5, 'approver2@gmail.com', '123', 6),
(6, 'traveldesk@gmail.com', '123', 7),
(7, 'financedesk@gmail.com', '123', 8),
(8, 'hka1@gmail.com', '123', 9),
(9, 'hka2@gmail.com', '123', 10),
(10, 'hktr@gmail.com', '123', 11),
(11, 'hkfd@gmail.com', '123', 12);

-- --------------------------------------------------------

--
-- Table structure for table `purpose_of_visit_table`
--

CREATE TABLE `purpose_of_visit_table` (
  `id` int(11) NOT NULL,
  `purpose_of_visit_id` int(11) NOT NULL,
  `purpose_of_visit` varchar(100) NOT NULL,
  `created_date` date NOT NULL,
  `last_updated_date` date NOT NULL,
  `created_time` time DEFAULT NULL,
  `last_updated_time` time DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purpose_of_visit_table`
--

INSERT INTO `purpose_of_visit_table` (`id`, `purpose_of_visit_id`, `purpose_of_visit`, `created_date`, `last_updated_date`, `created_time`, `last_updated_time`, `company_id`) VALUES
(1, 1, 'Attend Training', '2023-03-21', '2023-03-21', '15:10:19', '15:15:19', 1),
(2, 2, 'Attend Course', '2023-03-21', '2023-03-21', '15:10:19', '15:10:19', 2),
(3, 3, 'Business trip', '0000-00-00', '0000-00-00', NULL, NULL, 1),
(4, 4, 'Conduct Interview', '0000-00-00', '0000-00-00', NULL, NULL, 1),
(5, 5, 'Conduct training', '0000-00-00', '0000-00-00', NULL, NULL, 1),
(6, 6, 'Customer meeting', '0000-00-00', '0000-00-00', NULL, NULL, 1),
(7, 7, 'Meeting', '0000-00-00', '0000-00-00', NULL, NULL, 1),
(8, 8, 'Relocation', '0000-00-00', '0000-00-00', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `state_table`
--

CREATE TABLE `state_table` (
  `id` int(11) NOT NULL,
  `state_id` int(11) DEFAULT NULL,
  `state` varchar(40) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `state_table`
--

INSERT INTO `state_table` (`id`, `state_id`, `state`, `country_id`) VALUES
(1, 1, 'Tamil Nadu', 101),
(2, 2, 'karnataka', 101),
(3, 3, 'Okada', 102),
(4, 4, 'Manila', 102);

-- --------------------------------------------------------

--
-- Table structure for table `status_table`
--

CREATE TABLE `status_table` (
  `id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL,
  `status` varchar(30) NOT NULL,
  `company_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `status_table`
--

INSERT INTO `status_table` (`id`, `status_id`, `status`, `company_id`) VALUES
(1, 1, 'Under Consideration', 1),
(2, 2, 'A2 Approved', 1),
(3, 3, 'A3 Approved', 1),
(4, 4, 'Travel Desk Approved', 1),
(5, 5, 'Approved', 1),
(6, 6, 'Rejected', 1),
(7, 7, 'Under Consideration', 2),
(8, 8, 'A2 Approved', 2),
(9, 9, 'Travel Desk Approved', 2),
(10, 10, 'Approved', 2),
(11, 11, 'Rejected', 2);

-- --------------------------------------------------------

--
-- Table structure for table `travel_mode_table`
--

CREATE TABLE `travel_mode_table` (
  `id` int(11) NOT NULL,
  `travel_mode_id` int(11) NOT NULL,
  `travel_mode` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `travel_mode_table`
--

INSERT INTO `travel_mode_table` (`id`, `travel_mode_id`, `travel_mode`) VALUES
(1, 1, 'Air'),
(2, 2, 'Car'),
(3, 3, 'Bus'),
(4, 4, 'Train');

-- --------------------------------------------------------

--
-- Table structure for table `travel_request_table`
--

CREATE TABLE `travel_request_table` (
  `id` int(11) NOT NULL,
  `trip_id` int(11) NOT NULL,
  `departure_date` date NOT NULL,
  `departure_time` time NOT NULL,
  `return_date` date NOT NULL,
  `return_time` time NOT NULL,
  `accompanying_count` int(11) DEFAULT NULL,
  `opt_for_advance` tinyint(1) DEFAULT NULL,
  `adv_accomodation_amount` decimal(8,2) DEFAULT NULL,
  `adv_travel_amount` decimal(8,2) DEFAULT NULL,
  `railway_class` varchar(20) DEFAULT NULL,
  `railway_category` varchar(20) DEFAULT NULL,
  `travel_comment` varchar(100) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `purpose_of_visit_id` int(11) DEFAULT NULL,
  `billing_entity_id` int(11) DEFAULT NULL,
  `travel_mode_id` int(11) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `from_city_id` int(11) DEFAULT NULL,
  `to_city_id` int(11) DEFAULT NULL,
  `trip_type` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `travel_request_table`
--

INSERT INTO `travel_request_table` (`id`, `trip_id`, `departure_date`, `departure_time`, `return_date`, `return_time`, `accompanying_count`, `opt_for_advance`, `adv_accomodation_amount`, `adv_travel_amount`, `railway_class`, `railway_category`, `travel_comment`, `employee_id`, `purpose_of_visit_id`, `billing_entity_id`, `travel_mode_id`, `status_id`, `from_city_id`, `to_city_id`, `trip_type`) VALUES
(1, 1, '2023-09-20', '21:17:00', '2023-09-30', '12:17:00', 0, 1, 1500.00, 2000.00, 'AC Class', 'First Class', 'Very good', 2, 1, 1, 4, 2, 1, 2, 1),
(2, 2, '2023-09-19', '17:48:00', '2023-09-30', '20:48:00', 1, 1, 1500.00, 2000.00, 'AC Class', 'First Class', 'hello', 2, 1, 1, 4, 1, 1, 2, 1),
(3, 3, '2023-09-20', '19:43:00', '2023-09-29', '22:43:00', 0, 1, 1500.00, 2000.00, '', '', 'hello', 2, 1, 1, 3, 1, 3, 4, 2),
(4, 4, '2023-10-04', '09:41:00', '2023-10-19', '03:38:00', 0, 0, 0.00, 0.00, '', '', 'hello', 4, 1, 1, 1, 1, 1, 2, 1),
(5, 5, '2023-10-09', '19:47:00', '2023-10-17', '20:47:00', 0, 1, 1500.00, 2000.00, '', '', 'hello', 5, 1, 1, 1, 1, 1, 2, 1),
(6, 6, '2023-10-09', '17:52:00', '2023-10-19', '20:52:00', 0, 0, 0.00, 0.00, '', '', 'Very good', 6, 1, 1, 3, 1, 1, 2, 1),
(7, 7, '2023-10-10', '14:56:00', '2023-10-17', '18:56:00', 0, 0, 0.00, 0.00, '', '', 'Very good', 1, 1, 1, 3, 8, 1, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `trip_type_table`
--

CREATE TABLE `trip_type_table` (
  `id` int(11) NOT NULL,
  `trip_type_id` int(11) NOT NULL,
  `trip_type` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trip_type_table`
--

INSERT INTO `trip_type_table` (`id`, `trip_type_id`, `trip_type`) VALUES
(1, 1, 'Domestic'),
(2, 2, 'International');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accompany_detail_table`
--
ALTER TABLE `accompany_detail_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `trip_id` (`trip_id`),
  ADD KEY `accompany_employee_id` (`accompany_employee_id`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `accompany_employee_table`
--
ALTER TABLE `accompany_employee_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `trip_id` (`trip_id`),
  ADD KEY `employee_id` (`accompany_employee_id`);

--
-- Indexes for table `approver_mapping_table`
--
ALTER TABLE `approver_mapping_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `approver_employee_id` (`approver_employee_id`);

--
-- Indexes for table `approver_table`
--
ALTER TABLE `approver_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indexes for table `billing_entity_table`
--
ALTER TABLE `billing_entity_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indexes for table `broadband_request_table`
--
ALTER TABLE `broadband_request_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `broadband_type_id` (`broadband_type_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `broadband_type_table`
--
ALTER TABLE `broadband_type_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `city_table`
--
ALTER TABLE `city_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `state_id` (`state_id`);

--
-- Indexes for table `company_table`
--
ALTER TABLE `company_table`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_company_id` (`company_id`),
  ADD UNIQUE KEY `unique_company_name` (`company_name`),
  ADD KEY `country_id` (`country_id`),
  ADD KEY `city_id` (`city_id`),
  ADD KEY `company_table_ibfk_2` (`state_id`);

--
-- Indexes for table `country_table`
--
ALTER TABLE `country_table`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `country_id` (`country_id`);

--
-- Indexes for table `department_table`
--
ALTER TABLE `department_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `designation_table`
--
ALTER TABLE `designation_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indexes for table `employee_table`
--
ALTER TABLE `employee_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `company_id` (`company_id`),
  ADD KEY `designation_id` (`designation_id`),
  ADD KEY `department_id` (`department_id`),
  ADD KEY `approver_level_id` (`approver_level_id`);

--
-- Indexes for table `login_table`
--
ALTER TABLE `login_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `purpose_of_visit_table`
--
ALTER TABLE `purpose_of_visit_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `company_id` (`company_id`);

--
-- Indexes for table `state_table`
--
ALTER TABLE `state_table`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `state_id` (`state_id`),
  ADD KEY `country_id` (`country_id`);

--
-- Indexes for table `status_table`
--
ALTER TABLE `status_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `status_company_id` (`company_id`);

--
-- Indexes for table `travel_mode_table`
--
ALTER TABLE `travel_mode_table`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `travel_request_table`
--
ALTER TABLE `travel_request_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `purpose_of_visit_id` (`purpose_of_visit_id`),
  ADD KEY `billing_entity_id` (`billing_entity_id`),
  ADD KEY `travel_mode_id` (`travel_mode_id`),
  ADD KEY `status_id` (`status_id`),
  ADD KEY `from_city_id` (`from_city_id`),
  ADD KEY `to_city_id` (`to_city_id`),
  ADD KEY `trip_type` (`trip_type`);

--
-- Indexes for table `trip_type_table`
--
ALTER TABLE `trip_type_table`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accompany_detail_table`
--
ALTER TABLE `accompany_detail_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `accompany_employee_table`
--
ALTER TABLE `accompany_employee_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `approver_mapping_table`
--
ALTER TABLE `approver_mapping_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `approver_table`
--
ALTER TABLE `approver_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `billing_entity_table`
--
ALTER TABLE `billing_entity_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `broadband_request_table`
--
ALTER TABLE `broadband_request_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `broadband_type_table`
--
ALTER TABLE `broadband_type_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `city_table`
--
ALTER TABLE `city_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `company_table`
--
ALTER TABLE `company_table`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `country_table`
--
ALTER TABLE `country_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `department_table`
--
ALTER TABLE `department_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `designation_table`
--
ALTER TABLE `designation_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `employee_table`
--
ALTER TABLE `employee_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `login_table`
--
ALTER TABLE `login_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `state_table`
--
ALTER TABLE `state_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `status_table`
--
ALTER TABLE `status_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `travel_request_table`
--
ALTER TABLE `travel_request_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accompany_detail_table`
--
ALTER TABLE `accompany_detail_table`
  ADD CONSTRAINT `accompany_detail_table_ibfk_1` FOREIGN KEY (`trip_id`) REFERENCES `travel_request_table` (`id`),
  ADD CONSTRAINT `accompany_detail_table_ibfk_2` FOREIGN KEY (`accompany_employee_id`) REFERENCES `employee_table` (`id`),
  ADD CONSTRAINT `accompany_detail_table_ibfk_3` FOREIGN KEY (`department_id`) REFERENCES `department_table` (`id`);

--
-- Constraints for table `accompany_employee_table`
--
ALTER TABLE `accompany_employee_table`
  ADD CONSTRAINT `FK_employee_id` FOREIGN KEY (`accompany_employee_id`) REFERENCES `employee_table` (`id`),
  ADD CONSTRAINT `FK_trip_id` FOREIGN KEY (`trip_id`) REFERENCES `travel_request_table` (`id`);

--
-- Constraints for table `approver_mapping_table`
--
ALTER TABLE `approver_mapping_table`
  ADD CONSTRAINT `approver_mapping_table_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee_table` (`id`),
  ADD CONSTRAINT `approver_mapping_table_ibfk_2` FOREIGN KEY (`approver_employee_id`) REFERENCES `employee_table` (`id`);

--
-- Constraints for table `approver_table`
--
ALTER TABLE `approver_table`
  ADD CONSTRAINT `approver_company_id_fk` FOREIGN KEY (`company_id`) REFERENCES `company_table` (`id`);

--
-- Constraints for table `billing_entity_table`
--
ALTER TABLE `billing_entity_table`
  ADD CONSTRAINT `billing_entity_table_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `company_table` (`id`);

--
-- Constraints for table `broadband_request_table`
--
ALTER TABLE `broadband_request_table`
  ADD CONSTRAINT `broadband_request_table_ibfk_2` FOREIGN KEY (`broadband_type_id`) REFERENCES `broadband_type_table` (`id`),
  ADD CONSTRAINT `broadband_request_table_ibfk_3` FOREIGN KEY (`employee_id`) REFERENCES `employee_table` (`id`);

--
-- Constraints for table `city_table`
--
ALTER TABLE `city_table`
  ADD CONSTRAINT `city_table_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `state_table` (`state_id`);

--
-- Constraints for table `company_table`
--
ALTER TABLE `company_table`
  ADD CONSTRAINT `company_table_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `country_table` (`id`),
  ADD CONSTRAINT `company_table_ibfk_2` FOREIGN KEY (`state_id`) REFERENCES `state_table` (`id`),
  ADD CONSTRAINT `company_table_ibfk_3` FOREIGN KEY (`city_id`) REFERENCES `city_table` (`id`);

--
-- Constraints for table `department_table`
--
ALTER TABLE `department_table`
  ADD CONSTRAINT `department_table_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee_table` (`id`);

--
-- Constraints for table `employee_table`
--
ALTER TABLE `employee_table`
  ADD CONSTRAINT `approver_level_id` FOREIGN KEY (`approver_level_id`) REFERENCES `approver_table` (`id`);

--
-- Constraints for table `state_table`
--
ALTER TABLE `state_table`
  ADD CONSTRAINT `state_country_fk` FOREIGN KEY (`country_id`) REFERENCES `country_table` (`country_id`);

--
-- Constraints for table `status_table`
--
ALTER TABLE `status_table`
  ADD CONSTRAINT `status_company_id` FOREIGN KEY (`company_id`) REFERENCES `company_table` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
