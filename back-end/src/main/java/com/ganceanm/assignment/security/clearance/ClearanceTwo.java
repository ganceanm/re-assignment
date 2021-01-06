package com.ganceanm.assignment.security.clearance;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.springframework.security.access.prepost.PreAuthorize;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@PreAuthorize("hasAuthority(T(com.ganceanm.allamvizsga.user.model.UserRole).SYS_ADMIN.toString())")
public @interface ClearanceTwo {
	/*
	 * Security Clearance annotation for admin only methods 
	 */
}
