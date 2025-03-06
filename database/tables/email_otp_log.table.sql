CREATE TABLE `email_otp_log` (
  `id` varchar(50) NOT NULL,
  `email_id` varchar(50) DEFAULT NULL,
  `otp` varchar(10) DEFAULT NULL,
  `generate_datetime` datetime DEFAULT NULL,
  `is_validate` int(11) DEFAULT NULL,
  `validate_datetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1