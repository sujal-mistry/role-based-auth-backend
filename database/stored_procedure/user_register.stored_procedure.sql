CREATE DEFINER=`sql12766069`@`%` PROCEDURE `user_register`(
    IN first_name VARCHAR(50),
    IN last_name VARCHAR(50),
    IN email VARCHAR(50),
    IN password VARCHAR(50),
    IN is_admin VARCHAR(50))
BEGIN
    DECLARE return_id VARCHAR(50);
    SET return_id = UUID();

    INSERT INTO user_master(id, first_name, last_name, email, password, is_admin, is_verified, date_time, status)
    VALUES(return_id, first_name, last_name, email, password, is_admin, 0, NOW(), 1);

    SELECT return_id AS id;
END