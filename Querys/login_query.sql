use Proy_AyDS;

DROP TABLE IF EXISTS accounts;

create table accounts(
	id char(36) not null,
    firstName varchar(50) not null,
    lastName varchar(50) not null,
    email VARCHAR(50) not null,
    username varchar(100) null,
    password_hash varchar(255) not null,
    must_change_password varchar(255),
    status char(1),

    constraint pkAccountsID primary key (id)
);