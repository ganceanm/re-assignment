package com.ganceanm.assignment.internship.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.ganceanm.assignment.search.SearchCriteria;

public class InternshipSpecification implements Specification<Internship> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3305982466343454531L;
	private SearchCriteria criteria;

	public InternshipSpecification(SearchCriteria criteria) {
		super();
		this.criteria = criteria;
	}

	@Override
	public Predicate toPredicate(Root<Internship> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
		if (criteria.getOperation().equalsIgnoreCase(":")) {
			final List<Predicate> predicates = new ArrayList<Predicate>();
			final List<Predicate> filters = new ArrayList<Predicate>();
			for(String key : criteria.getKey()) {
				for(String value : criteria.getValue()) {
					predicates.add(builder.like(root.<String> get(key), value + "%"));
				}
			}
			Predicate namePredicate = builder.or(predicates.toArray(new Predicate[predicates.size()]));
			
			
			
			if(criteria.getOptionals().isPresent()) {
				HashMap<String, ?> optionals = criteria.getOptionals().get();
				
				
				if(optionals.containsValue("category")) {
					try {
						Predicate typePredicate = builder.equal(root.get("type"), InternshipCategory.valueOf((String)optionals.get("filter")));
						filters.add(typePredicate);
					} catch (Exception e) {
						
					}
				}
				if(optionals.containsValue("location")) {
					try {
						Predicate locationPredicate = builder.equal(root.get("location"), (String)optionals.get("location"));
						filters.add(locationPredicate);
					} catch (Exception e) {
						
					}
				}
				if(optionals.containsValue("paid")) {
					try {
						Predicate paidPredicate = builder.equal(root.<Boolean>get("paid"), Boolean.valueOf((String)optionals.get("paid")));
						filters.add(paidPredicate);
					} catch (Exception e) {
						
					}
				}
				
				filters.add(builder.isFalse(root.<Boolean>get("deleted")));
				
			}
			
			
			
			Predicate filterPredicate = builder.and(filters.toArray(new Predicate[filters.size()]));
			
			return builder.and(namePredicate, filterPredicate);
		}
		return null;
	}

}
