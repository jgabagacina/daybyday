-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 01, 2017 at 03:21 PM
-- Server version: 10.1.26-MariaDB
-- PHP Version: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbd`
--
CREATE DATABASE IF NOT EXISTS `dbd` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `dbd`;

-- --------------------------------------------------------

--
-- Table structure for table `songparts`
--

CREATE TABLE `songparts` (
  `PartID` int(11) NOT NULL,
  `PartName` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `songparts`
--

INSERT INTO `songparts` (`PartID`, `PartName`) VALUES
(1, 'Verse 1'),
(2, 'Verse 2'),
(3, 'Verse 3\r\n'),
(4, 'Chorus'),
(5, 'Bridge');

-- --------------------------------------------------------

--
-- Table structure for table `songs`
--

CREATE TABLE `songs` (
  `SongID` int(11) NOT NULL,
  `Title` varchar(500) NOT NULL,
  `Artist` varchar(500) NOT NULL,
  `Language` varchar(500) NOT NULL,
  `Genre` varchar(500) NOT NULL,
  `DateCreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `songs`
--

INSERT INTO `songs` (`SongID`, `Title`, `Artist`, `Language`, `Genre`, `DateCreated`) VALUES
(1, 'Test', 'Test', 'English', 'Praise', '2017-10-01 20:37:44'),
(2, 'AHAAHAHHA', 'HEHEHEH', 'English', 'Praise', '2017-10-01 22:34:45'),
(3, 'Oceans', 'Hillsong United', 'English', 'Worship', '2017-10-01 23:09:58');

-- --------------------------------------------------------

--
-- Table structure for table `songs2`
--

CREATE TABLE `songs2` (
  `SongID` int(11) NOT NULL,
  `SongTitle` varchar(500) NOT NULL,
  `Artist` varchar(500) NOT NULL,
  `Language` varchar(500) NOT NULL,
  `Genre` varchar(500) NOT NULL,
  `DateCreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `songs2`
--

INSERT INTO `songs2` (`SongID`, `SongTitle`, `Artist`, `Language`, `Genre`, `DateCreated`) VALUES
(1, 'So Will I', 'Hillsong United', 'English', 'Worship', '2017-09-11 22:49:28'),
(2, 'Splinters and Stones', 'Hillsong United', 'English', 'Worship', '2017-09-11 22:50:09'),
(3, 'Wonder', 'Hillsong United', 'English', 'Praise', '2017-09-11 22:50:29'),
(4, 'Shadow Step', 'Hillsong United', 'English', 'Worship', '2017-09-11 22:51:46'),
(5, 'Future Marches In', 'Hillsong Worship', 'English', 'Worship\r\n', '2017-09-11 22:52:23'),
(6, 'Greatest Of These', 'Hillsong United', 'English', 'Worship', '2017-09-11 22:53:18'),
(7, 'Oceans', 'Hillsong United', 'English', 'Worship', '2017-09-11 22:53:49'),
(8, 'Let There Be Light', 'Hillsong United', 'English', 'Worship', '2017-09-11 22:54:11');

-- --------------------------------------------------------

--
-- Table structure for table `songslides`
--

CREATE TABLE `songslides` (
  `SlideID` int(11) NOT NULL,
  `SongID` int(11) NOT NULL,
  `Content` text NOT NULL,
  `PartID` int(11) NOT NULL,
  `OrderNumber` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `songslides`
--

INSERT INTO `songslides` (`SlideID`, `SongID`, `Content`, `PartID`, `OrderNumber`) VALUES
(52, 1, 'AHAHAHAHA', 1, 1),
(53, 1, 'AAAAAA', 2, 2),
(54, 1, 'VERS', 3, 3),
(55, 1, 'Tulay', 4, 4),
(59, 2, 'Verse 1<br />\nHEHEHEHEH', 1, 1),
(60, 2, 'AGAGASGASGA', 2, 2),
(61, 2, 'AFASFASFASFa', 3, 3),
(68, 3, 'You call me out upon the waters\nThe great unknown where feet may fail\nAnd there I find You in the mystery\nIn oceans deep\nMy faith will stand', 1, 1),
(69, 3, 'And I will call upon Your name\nAnd keep my eyes above the waves\nWhen oceans rise\nMy soul will rest in Your embrace\nFor I am Yours and You are mine', 1, 2),
(70, 3, 'Your grace abounds in deepest waters\nYour sovereign hand\nWill be my guide\nWhere feet may fail and fear surrounds me\nYou\'ve never failed and You won\'t start now', 1, 3),
(71, 3, 'So I will call upon Your name\nAnd keep my eyes above the waves\nWhen oceans rise\nMy soul will rest in Your embrace\nFor I am Yours and You are mine', 1, 4),
(72, 3, 'Spirit lead me where my trust is without borders\nLet me walk upon the waters\nWherever You would call me', 4, 5),
(73, 3, 'Take me deeper than my feet could ever wander\nAnd my faith will be made stronger\nIn the presence of my Savior', 4, 6);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `UserID` int(11) NOT NULL,
  `UserName` varchar(500) NOT NULL,
  `Password` text NOT NULL,
  `FirstName` varchar(500) NOT NULL,
  `LastName` varchar(500) NOT NULL,
  `DateCreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Token` text NOT NULL,
  `SessionID` text NOT NULL,
  `PSID` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`UserID`, `UserName`, `Password`, `FirstName`, `LastName`, `DateCreated`, `Token`, `SessionID`, `PSID`) VALUES
(1, 'admin', '8f90342703f891b014a7283ef28f399c', 'Day By Day', 'Bicutan', '2017-09-07 19:52:33', 'b1a7bcf10361a0a2146756fd49043d47', '3fc8259eb34abd921a455f2d91148b457a5e9070', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `songparts`
--
ALTER TABLE `songparts`
  ADD PRIMARY KEY (`PartID`);

--
-- Indexes for table `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`SongID`);
ALTER TABLE `songs` ADD FULLTEXT KEY `SongTitle` (`Title`);

--
-- Indexes for table `songs2`
--
ALTER TABLE `songs2`
  ADD PRIMARY KEY (`SongID`);
ALTER TABLE `songs2` ADD FULLTEXT KEY `SongTitle` (`SongTitle`);

--
-- Indexes for table `songslides`
--
ALTER TABLE `songslides`
  ADD PRIMARY KEY (`SlideID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `songparts`
--
ALTER TABLE `songparts`
  MODIFY `PartID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `songs`
--
ALTER TABLE `songs`
  MODIFY `SongID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `songs2`
--
ALTER TABLE `songs2`
  MODIFY `SongID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `songslides`
--
ALTER TABLE `songslides`
  MODIFY `SlideID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
