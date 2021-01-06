package com.ganceanm.assignment.user.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.ganceanm.assignment.search.SearchCriteria;

public class UserSpecification implements Specification<User> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3305982466343454531L;
	private SearchCriteria criteria;

	public UserSpecification(SearchCriteria criteria) {
		super();
		this.criteria = criteria;
	}

	@Override
	public Predicate toPredicate(Root<User> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
		Predicate statusPredicate = builder.isFalse(root.get("deleted"));
		Predicate rolePredicate = builder.notEqual(root.<UserRole>get("userRole"), UserRole.SYS_ADMIN);

		if (criteria.getOperation().equalsIgnoreCase("l:")) {
			final List<Predicate> predicates = new ArrayList<Predicate>();
			for (String key : criteria.getKey()) {
				for (String value : criteria.getValue()) {
					predicates.add(builder.like(root.<String>get(key), value + "%"));
				}
			}

			Predicate namePredicate = builder.or(predicates.toArray(new Predicate[predicates.size()]));

			return builder.and(namePredicate, statusPredicate, rolePredicate);
		}
		if (criteria.getOperation().equalsIgnoreCase("ua:")) {
			final List<Predicate> predicates = new ArrayList<Predicate>();
			for (String key : criteria.getKey()) {
				for (String value : criteria.getValue()) {
					predicates.add(builder.like(root.<String>get(key), value + "%"));
				}
			}
			Predicate namePredicate = builder.or(predicates.toArray(new Predicate[predicates.size()]));
			Predicate roomPredicate = builder.isNull(root.get("room"));

			return builder.and(namePredicate, roomPredicate, statusPredicate, rolePredicate);
		}
		return null;
	}

}
