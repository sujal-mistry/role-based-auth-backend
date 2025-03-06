CREATE DEFINER=`sql12766069`@`%` PROCEDURE `validate_otp`(IN email_id VARCHAR(100), IN otp VARCHAR(10))
BEGIN
    DECLARE id varchar(50);
    DECLARE time_diff INT;
    DECLARE is_validate INT;

	main_block: BEGIN 
		-- get otp details
		SELECT eo.id, TIMESTAMPDIFF(MINUTE, eo.generate_datetime, NOW()), eo.is_validate
		INTO id, time_diff, is_validate
		FROM email_otp_log as eo
		WHERE eo.email_id = email_id AND eo.otp = otp
		LIMIT 1;

		-- If otp nnot
		IF id IS NULL THEN
			SELECT 400 AS status, 'Invalid OTP' AS message;
			LEAVE main_block;
		END IF;

		-- If otp expired (5 min)
		IF time_diff > 5 THEN
			SELECT 400 AS status, 'OTP is expired' AS message;
			LEAVE main_block;
		END IF;

		-- If otp verified
		IF is_validate = 1 THEN
			SELECT 400 AS status, 'OTP is already verified' AS message;
			LEAVE main_block;
		END IF;

		-- Update otp status
		UPDATE email_otp_log 
		SET is_validate = 1, validate_datetime = NOW() 
		WHERE id = id;
        
        -- Update User status
        update user_master 
        set is_verified = 1
        where email = email_id;

		-- Return success response
		SELECT 200 AS status, 'OTP Verified Successfully' AS message;
	END main_block; 
    
END