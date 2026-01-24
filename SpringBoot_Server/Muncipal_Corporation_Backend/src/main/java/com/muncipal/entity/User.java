package com.muncipal.entity;

import com.muncipal.entity.enums.ActInactStatus;
import com.muncipal.entity.enums.UserRole;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="users")

@AttributeOverride(name="id",column = @Column(name="user_id"))
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = {"password"})
public class User extends BaseEntity{
	
	private String name;
	@Column(length = 50,unique = true)
	private String email;
	@Column(length=10, unique = true)
	private String mobnum;
	@Column(length = 400,nullable = false)
	private String password;
	@Column(length=12, unique = true)
	private String aadharNumber;
	@Column(length = 400,nullable = false)
	private String address;
	@Enumerated(EnumType.STRING)
	private UserRole role;
	@Enumerated(EnumType.STRING)
	@Column(name="act_status")
	private ActInactStatus actStatus;
}
