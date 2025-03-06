CREATE DEFINER=`sql12766069`@`%` PROCEDURE `send_otp`(IN email_id VARCHAR(100))
BEGIN
    DECLARE user_id VARCHAR(50);
    DECLARE otp VARCHAR(10);
    
     main_block: BEGIN 

		-- Check if the email exists 
		SELECT id INTO user_id 
		FROM user_master as um
		WHERE um.email = email_id and um.is_verified = 1
		LIMIT 1;
		
		IF user_id IS NOT NULL THEN
			SELECT 400 AS status, 'Email ID is already registered' AS message;
			leave main_block;
		END IF;
		
		-- Generate a 4-digit OTP
		SET otp = LPAD(FLOOR(RAND() * 9000 + 1000), 4, '0');

		-- Insert OTP into email_otp_log
		INSERT INTO email_otp_log (id, email_id, otp, generate_datetime, is_validate, validate_datetime)
		VALUES (UUID(), email_id, otp, NOW(), 0, NULL);

		-- Return response
		SELECT 
		200 AS status,
		'Please check your mail for OTP.' AS message,
		otp AS otp;
	END main_block; 
END