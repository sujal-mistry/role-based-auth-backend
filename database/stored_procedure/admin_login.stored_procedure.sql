CREATE DEFINER=`sql12766069`@`%` PROCEDURE `admin_login`(
    IN email VARCHAR(50),
    IN password VARCHAR(50))
BEGIN
    DECLARE admin_id VARCHAR(50);
    DECLARE is_verified VARCHAR(50);
    set admin_id = null, is_verified = 0;

    
    main_block: BEGIN 
    
		-- get is_verified
		select um.is_verified
        into is_verified
        from user_master as um 
        where um.email = email and 
        um.password = password and um.is_verified = 1
        LIMIT 1;
        
		-- get admin id
		select um.id
        into admin_id
        from user_master as um 
        where um.email = email and 
        um.password = password and um.is_admin = 1
        LIMIT 1;
        
        -- if not verified
        IF is_verified = 0 then
			select 400 as status, 'User is not verified' as message;
            leave main_block;
		end if;
        
		IF admin_id IS NOT NULL THEN
			SELECT 200 AS status, 'Login Successful' AS message;
			LEAVE main_block;
		ELSE
			select 400 as status, 'You are not allowed to login from here' AS message;
            LEAVE main_block;
		end if;
        
	END main_block;     
    
END