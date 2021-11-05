package com.ufrpe.vcfanalyzer.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.ufrpe.vcfanalyzer.domain.Variant;

public class VariantRepositoryCustomImpl implements VariantRepositoryCustom {

	@PersistenceContext
	private EntityManager entityManager;

	@Override
	public Page<Variant> getVariantsByFilds(String chrom, Integer posicao, String reference, String alteration,
			String valueInfoField, Integer idvcf, Pageable pageable) {

		StringBuilder consulta = new StringBuilder("select * from variant v where v.filevcf_id = " + idvcf);

		if (!chrom.equalsIgnoreCase("")) {
			chrom = colocaAspasSimples(chrom);
			consulta.append(" and v.chrom =").append(chrom);
		}
		if (posicao > -1) {
			consulta.append(" and v.position = ").append(posicao);
		}
		if (!reference.equalsIgnoreCase("")) {
			reference = colocaAspasSimples(reference);
			consulta.append(" and v.reference =").append(reference);
		}
		if (!alteration.equalsIgnoreCase("")) {
			alteration = colocaAspasSimples(alteration);
			consulta.append(" and v.alteration =").append(alteration);
		}
		if (!valueInfoField.equalsIgnoreCase("")) {
			consulta.append(" and v.info_col ilike '%").append(valueInfoField).append("%'");
		}

//		List<Variant> variants = entityManager.createNativeQuery(consulta.toString(), Variant.class).getResultList();
//		Integer numberOfElements = (Integer) entityManager
//				.createNativeQuery("select cast(count(*) as int) from variant v where v.filevcf_id = " + idvcf)
//				.getSingleResult();
		
		Query query = entityManager.createNativeQuery(consulta.toString(), Variant.class);
		
		Integer numberOfElements  = query.getResultList().size();
		query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
		query.setMaxResults(pageable.getPageSize());

		Page<Variant> results = new PageImpl<Variant>(query.getResultList(), pageable, numberOfElements);
//		Page<Variant> results = new PageImpl<Variant>(variants, pageable, 76);

		System.out.println("Numero da Page: " + pageable.getPageNumber());
		System.out.println("Numero de itens per page: " + pageable.getPageSize());
		System.out.println("Numero Total de Elemntos: " + numberOfElements);
		return results;
	}

	private String colocaAspasSimples(String field) {
		String campoComAspas = "'" + field + "'";
		return campoComAspas;
	}

}
