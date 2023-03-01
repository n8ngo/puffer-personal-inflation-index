create table category (
  _id BIGSERIAL NOT NULL PRIMARY KEY,
  category VARCHAR(50) NOT NULL
);
create table expense (
  _id BIGSERIAL NOT NULL PRIMARY KEY,
  exp_name VARCHAR(50) NOT NULL,
  exp_amt MONEY NOT NULL,
  exp_created VARCHAR(50) NOT NULL,
  exp_category BIGINT REFERENCES category (_id),
  exp_note VARCHAR(100)
);


insert into category (category) values ('gas');
insert into category (category) values ('groceries');
insert into category (category) values ('electricity');
insert into category (category) values ('restaurants');
insert into category (category) values ('entertainment');


-- insert into expense (exp_name, exp_amt, exp_created, exp_category) values ('costco gasss', 100.00, '2023-02-01', 1);

  