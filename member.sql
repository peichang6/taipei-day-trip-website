CREATE DATABASE  IF NOT EXISTS `website` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `website`;
-- MySQL dump 10.13  Distrib 8.0.28, for macos11 (x86_64)
--
-- Host: localhost    Database: website
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `follower_count` int NOT NULL DEFAULT '0',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'test2','test','test',12,'2022-02-03 12:56:18'),(2,'Nina','nina','0000',6,'2022-02-03 13:07:30'),(3,'Oscar','iamo','oooooo',31,'2022-02-03 13:08:27'),(4,'H_H','ekqnk','@wouihkjad',1,'2022-02-03 13:09:38'),(5,'123789','56789','ajdu382051',0,'2022-02-03 13:10:07'),(12,'may','may_1','qaz',0,'2022-02-10 16:18:02'),(13,'wu','iamwu','opueyaj',0,'2022-02-10 16:19:13'),(14,'pika','pi4756','nncke',0,'2022-02-10 16:31:21'),(15,'wwq','fdvf','wqr',0,'2022-02-10 16:33:05'),(16,'afada','fewgf','',0,'2022-02-10 16:33:52'),(17,'wu','kadj','hjsdk',0,'2022-02-10 17:42:43'),(19,'小明','ming87','878787',0,'2022-02-10 19:22:24'),(20,'安安','helloann','jeoiwtuihn',0,'2022-02-10 19:24:30'),(21,'wqfegf','wefgsrfdg','pbkdf2:sha256:260000$ZxfiTOn3SVU0ZTDb$1e62bd5b163baddc3c5aa528665671a03072f36a2c59480c11f113e940816039',0,'2022-02-10 22:53:11'),(22,'123','12345','pbkdf2:sha256:260000$lV58tabecmjuEC2w$639a9be7589884b0868e076ddc6f4938b2ec7598eef75290000f928186ffc461',0,'2022-02-10 22:53:38'),(23,'qqq','qqq','pbkdf2:sha256:260000$8WpOZFI8n80UnkVh$58052b223a161044056998f95589be2c1b62141b3b1dab99c633039e7ce4a864',0,'2022-02-10 23:06:23'),(24,'aaa','aaa','pbkdf2:sha256:260000$Unrn9TatLp4Tygv5$3505fb71a77a9e3a4779a3101b57442ada879c02142274785f62b39a772b572c',0,'2022-02-10 23:27:02'),(25,'happy','happy','pbkdf2:sha256:260000$g4v5F2dxZNzwPVr7$d8dccdf5631292b6c01e5b7919b8eaad479997490bdab7e4b1cf13e6610585d9',0,'2022-02-10 23:27:46'),(26,'huhu','huhu','pbkdf2:sha256:260000$FJ6N9wgbrz8BFE3k$ab85e7725516b30b86d04d8fa143cece75260bb2e51b188d39008b249bcd5175',0,'2022-02-10 23:41:24'),(27,'abc','abc','abc',0,'2022-02-11 14:07:27'),(28,'kkk','kkk','kkk',0,'2022-02-11 20:17:06'),(29,'kkkk','kkkk','pbkdf2:sha256:260000$YK37LXZvxqvp4Ye3$d1c045a3c80ae4f6c5b1b2378275830c9403d7df2a2b152c562f5dfc7d831cdc',0,'2022-02-11 20:18:11'),(30,'omg','omg','pbkdf2:sha256:260000$FpU7bJM4H61mFAPG$6518391c10a3da6731e3daff4d4c586b815ff2e01bb7a8e11ec322b21cd90fd0',0,'2022-02-12 02:21:12'),(31,'pool','pooling','pbkdf2:sha256:260000$gQgZDKrqJa8Gbr4c$6a13107c7675eebcbbcf25c25f1680d429b04e3f67cd28bff432b8b235c61348',0,'2022-02-14 18:49:21'),(32,'q','q','pbkdf2:sha256:260000$ft33ycYFWvDQ1XxO$08f319cd5b94a6e69161b372628d54a482e58f3533dc1495bf7d1c398fc3057b',0,'2022-02-21 20:47:13'),(33,'qqq','a2a','123',0,'2022-04-07 01:42:44'),(34,'aaa','qekjhlewtj','123',0,'2022-04-07 01:48:25'),(35,'micky','micky.com','micky',0,'2022-04-07 01:51:55'),(36,'micky1','micky.com.tw','pbkdf2:sha256:260000$wadMQsbTpCIZ2P9x$eeafec56dd0701a9f98aadc4fde630b9755f316f43ade39e03a59af7b57a618b',0,'2022-04-07 02:20:30'),(39,'april','april','pbkdf2:sha256:260000$zWY7ZyOi3bqCag9i$e47e1e52fc32a29eea794173ce762c510cb532a13b289825e6d60a2bb6c52f2f',0,'2022-04-07 15:02:16'),(40,'qqq','qqq@yahoo.com.tw','pbkdf2:sha256:260000$SUx8k4sA9pFNLVIV$ec918817595f94806cfb45ced5a67fffd50eb463ecd21d9655bb5086edab8a2f',0,'2022-04-08 12:39:46'),(41,'fff','fff','pbkdf2:sha256:260000$MVLydzndS1rDR6F8$72c0367e6284d998b9b7cd648ea7cb417df801e634c824b719a1482043fee0d3',0,'2022-04-08 19:19:40'),(42,'ffff','ffff','pbkdf2:sha256:260000$LfDpc5TdYwYv6jbj$265352cedccfbd616b15cc288039a075a4bf92c6308a7d1ecf43a628f98434df',0,'2022-04-08 19:21:35'),(43,'fffff','fffff','pbkdf2:sha256:260000$RdtueVqipf1gdJoa$b2e013971bcd99e5b9ac3c4e0fb01795290223f6b2649e41102009c29e8cc719',0,'2022-04-08 19:25:10'),(44,'fffff','fffff1','pbkdf2:sha256:260000$eeeOSm3P92ilEJuu$e54b66a5589151e4e5f851940e4a023af32669ae82cba9ebdeff9a5f3c2185d8',0,'2022-04-08 19:26:26'),(45,'123','123','pbkdf2:sha256:260000$3kbsnax4BpPWVFaj$0503e3466fef82bb566d5acc5577ca600e91fc303ef8da29606e8f3d79c99932',0,'2022-04-09 11:07:03'),(46,'345','345','pbkdf2:sha256:260000$SNHm1SUQU30KWDzr$2ceffe80e855e45a0a3b6dcc813f95aa8ae8907ef4bcbbc031dbe8d7dd2744be',0,'2022-04-09 11:15:24'),(47,'qaz','qaz','pbkdf2:sha256:260000$5L3i53dh5pKMp6AN$e0ccd0fb3710ce312ca9f20faa44b7ee9815fadf7a68d92fbe14d48cf419585a',0,'2022-04-09 11:16:55'),(48,'1qaz','1qaz','pbkdf2:sha256:260000$BUZipoDalnCahMcO$8903656a0ea4e83a40b1d621b4c1716942222e57305be8aa0d3fcbf9b8b352de',0,'2022-04-09 11:17:14'),(49,'ddd','ddd','pbkdf2:sha256:260000$7R0rfpziupF51frg$66985df8bae3ac526aa9f64a2462c52ddaf4693249c1db7acc84cec9b7d785df',0,'2022-04-09 11:19:31'),(50,'ccc','ccc','pbkdf2:sha256:260000$49HRSJ3nZibUIj3a$1314d770dd404bf394f94823b1d7e074bc3d2108c3b343d7ff405eac38fa6277',0,'2022-04-10 12:30:59');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-10 18:26:53
