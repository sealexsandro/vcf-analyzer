create table filevcf (id  serial not null, primary key (id));
create table tag_header (id  serial not null, description text, id_tag varchar(255), name_tag varchar(255), number varchar(255), type varchar(255), filevcf_id int4, primary key (id));
create table variant (id  serial not null, alteration varchar(255), chrom varchar(255), filter varchar(255), format varchar(255), id_variant varchar(255), info_col text, position int4, quality float8, reference varchar(255), samples text, filevcf_id int4, primary key (id));
alter table tag_header add constraint FKdb81jdi5f65ecbdhsh57fegks foreign key (filevcf_id) references filevcf;
alter table variant add constraint FKcb0yilt2lweupuwu7h3adkqg1 foreign key (filevcf_id) references filevcf;
