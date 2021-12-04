package com.ufrpe.vcfanalyzer.repository;

import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.ufrpe.vcfanalyzer.domain.Variant;
import com.ufrpe.vcfanalyzer.domain.VariantFilters;

public class VariantRepositoryCustomImpl implements VariantRepositoryCustom {

	@PersistenceContext
	private EntityManager entityManager;

	@SuppressWarnings("unchecked")
	@Override
	public Page<Variant> findPageVariantsByFilds(Map<String, String> filtersMap, Integer idvcf, Pageable pageable) {

		StringBuilder consulta = new StringBuilder("select * from variant v where v.filevcf_id = " + idvcf);

		for (Map.Entry<String, String> entry : filtersMap.entrySet()) {

			if (entry.getKey().toLowerCase().equalsIgnoreCase("chrom")) {
				String chrom = colocaAspasSimples(entry.getValue());
				consulta.append(" and v.chrom =").append(chrom);
			} else if (entry.getKey().toLowerCase().equalsIgnoreCase("reference")) {
				String reference = colocaAspasSimples(entry.getValue());
				consulta.append(" and v.reference =").append(reference);
			} else if (entry.getKey().toLowerCase().equalsIgnoreCase("alteration")) {
				String alteration = colocaAspasSimples(entry.getValue());
				consulta.append(" and v.alteration =").append(alteration);
			} else if (entry.getKey().toLowerCase().equalsIgnoreCase("filter")) {
				String filter = colocaAspasSimples(entry.getValue());
				consulta.append(" and v.filter =").append(filter);
			} else if (entry.getKey().toLowerCase().equalsIgnoreCase("info")) {
				String infoKeyAndValue[] = entry.getValue().split("-");

				String info = "";
				try {
					info = infoKeyAndValue[0] + "=" + infoKeyAndValue[1];
				} catch (ArrayIndexOutOfBoundsException e) {
					info = "";
				}
				if (!info.equalsIgnoreCase("")) {
					consulta.append(" and v.info_col ilike '%").append(info + ";").append("%'");
				}

			}

		}

		Query query = entityManager.createNativeQuery(consulta.toString(), Variant.class);

		Integer numberOfElements = query.getResultList().size();
		query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
		query.setMaxResults(pageable.getPageSize());

		Page<Variant> results = new PageImpl<Variant>(query.getResultList(), pageable, numberOfElements);

		System.out.println("Consultou o objeto PAGE");
//		System.out.println("Numero da Page: " + pageable.getPageNumber());
//		System.out.println("Numero de itens per page: " + pageable.getPageSize());
//		System.out.println("Numero Total de Elemntos: " + numberOfElements);
		return results;
	}

	@Override
	public List<Variant> findAllVariantsByFields(Map<String, String> filtersMap, Integer idvcf) {

		StringBuilder consulta = new StringBuilder("select * from variant v where v.filevcf_id = " + idvcf);

		for (Map.Entry<String, String> entry : filtersMap.entrySet()) {
			System.out.println(entry.getKey() + "/" + entry.getValue());

			if (entry.getKey().toLowerCase().equalsIgnoreCase("chrom")) {
				String chrom = colocaAspasSimples(entry.getValue());
				consulta.append(" and v.chrom =").append(chrom);
			} else if (entry.getKey().toLowerCase().equalsIgnoreCase("reference")) {
				String reference = colocaAspasSimples(entry.getValue());
				consulta.append(" and v.reference =").append(reference);
			} else if (entry.getKey().toLowerCase().equalsIgnoreCase("alteration")) {
				String alteration = colocaAspasSimples(entry.getValue());
				consulta.append(" and v.alteration =").append(alteration);
			} else if (entry.getKey().toLowerCase().equalsIgnoreCase("filter")) {
				String filter = colocaAspasSimples(entry.getValue());
				consulta.append(" and v.filter =").append(filter);
			} else if (entry.getKey().toLowerCase().equalsIgnoreCase("info")) {
				String infoKeyAndValue[] = entry.getValue().split("-");

				String info = "";
				try {
					info = infoKeyAndValue[0] + "=" + infoKeyAndValue[1];
				} catch (ArrayIndexOutOfBoundsException e) {
					info = "";
				}
				if (!info.equalsIgnoreCase("")) {
					consulta.append(" and v.info_col ilike '%").append(info + ";").append("%'");
				}

			}

		}

		Query query = entityManager.createNativeQuery(consulta.toString(), Variant.class);

		@SuppressWarnings("unchecked")
		List<Variant> variants = query.getResultList();
		return variants;
	}

	private String colocaAspasSimples(String field) {
		String campoComAspas = "'" + field + "'";
		return campoComAspas;
	}

	@SuppressWarnings("unchecked")
	@Override
	public VariantFilters findAttributesUniqueOfVariants(Map<String, String> filtersMap, Integer idvcf) {

		StringBuilder consulta = new StringBuilder("select * from variant v where v.filevcf_id = " + idvcf);

		for (Map.Entry<String, String> entry : filtersMap.entrySet()) {

			if (entry.getKey().toLowerCase().equalsIgnoreCase("chrom")) {
				String chrom = colocaAspasSimples(entry.getValue());
				consulta.append(" and v.chrom =").append(chrom);
			} else if (entry.getKey().toLowerCase().equalsIgnoreCase("reference")) {
				String reference = colocaAspasSimples(entry.getValue());
				consulta.append(" and v.reference =").append(reference);
			} else if (entry.getKey().toLowerCase().equalsIgnoreCase("alteration")) {
				String alteration = colocaAspasSimples(entry.getValue());
				consulta.append(" and v.alteration =").append(alteration);
			} else if (entry.getKey().toLowerCase().equalsIgnoreCase("filter")) {
				String filter = colocaAspasSimples(entry.getValue());
				consulta.append(" and v.filter =").append(filter);
			} else if (entry.getKey().toLowerCase().equalsIgnoreCase("info")) {
				String infoKeyAndValue[] = entry.getValue().split("-");

				String info = "";
				try {
					info = infoKeyAndValue[0] + "=" + infoKeyAndValue[1];
				} catch (ArrayIndexOutOfBoundsException e) {
					info = "";
				}
				if (!info.equalsIgnoreCase("")) {
					consulta.append(" and v.info_col ilike '%").append(info + ";").append("%'");
				}

			}

		}

		Query query = entityManager.createNativeQuery(consulta.toString(), Variant.class);

		List<Variant> variants = query.getResultList();
		
		VariantFilters variantsFilters = getFilters(variants);

		return variantsFilters;
	}

	public VariantFilters getFilters(List<Variant> variants) {

		VariantFilters variantsAndFilters = new VariantFilters();

		for (Variant variant : variants) {
			variantsAndFilters.addChroms(variant.getChrom());
			variantsAndFilters.addAlterations(variant.getAlteration());
			variantsAndFilters.addReferences(variant.getReference());
			variantsAndFilters.addQualities(variant.getQuality());
			variantsAndFilters.addFilters(variant.getFilter());
			variantsAndFilters.addInfoCol(variant.getInfoCol());
		}

		return variantsAndFilters;
	}

}
