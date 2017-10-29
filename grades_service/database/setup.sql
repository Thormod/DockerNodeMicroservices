create table grades (grade_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, qualifier_id  INT NOT NULL, qualified_id INT NOT NULL, assistance_id INT NOT NULL, score DOUBLE, comment TEXT);  
insert into grades (qualifier_id, qualified_id, assistance_id, score, comment) values ('1', '2', '1', '4.5', 'Estaba dormido');
insert into grades (qualifier_id, qualified_id, assistance_id, score, comment) values ('2', '1', '1', '5', 'Estaba dormido');
insert into grades (qualifier_id, qualified_id, assistance_id, score, comment) values ('1', '2', '2', '4.5', 'Estaba dormido');
insert into grades (qualifier_id, qualified_id, assistance_id, score, comment) values ('2', '1', '2', '4.5', 'Estaba dormido');
insert into grades (qualifier_id, qualified_id, assistance_id, score, comment) values ('1', '3', '3', '4.5', 'Estaba dormido');