package com.muncipal.entity;

import com.muncipal.entity.enums.Complaint;
import com.muncipal.entity.enums.GrievanceStatus;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "grievance")
@AttributeOverride(name = "id", column = @Column(name = "grievance_id"))
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = "user")
public class Grievance extends BaseEntity {

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Complaint complaint;

	@Column(nullable = false)
	private String zone;

	@Column(nullable = false)
	private String description;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private GrievanceStatus status;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
}
