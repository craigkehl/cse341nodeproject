CREATE TYPE gender AS ENUM ('male', 'female', 'other');

CREATE TYPE organization AS ENUM ('Aaronic Priesthood Quorums',	'Bishopric',	'Deacons Quorum  Presidency',	'Deacons Quorum',	'Elders Instructors',	'Elders Quorum Presidency',	'Elders Quorum',	'Elders Service',	'Gospel Doctrine',	'Music',	'Other Callings',	'Priests Quorum Presidency',	'Priests Quorum',	'Primary Activities - Boys',	'Primary CTR 4',	'Primary CTR 5A',	'Primary CTR 5B',	'Primary Music',	'Primary Nursery',	'Primary Presidency',	'Primary Valiant 10',	'Primary Valiant 10B',	'Primary Valiant 9 A',	'Primary Valiant 9 B',	'Primary',	'Relief Society Presidency',	'Relief Society',	'RS Activities',	'RS Ministering',	'RS Service',	'RS Teachers',	'SS Course 11',	'SS Course 12',	'SS Course 14',	'SS Course 15',	'SS Course 16',	'SS Course 17',	'Sunday School Presidency',	'Sunday School',	'Teachers Quorum  Presidency',	'Teachers Quorum',	'Temple and Family History',	'Ward Missionaries',	'Young Women 12-13 Presidency',	'Young Women 12-13',	'Young Women 14-15 Presidency',	'Young Women 14-15',	'Young Women 16-18 Presidency',	'Young Women 16-18',	'Young Women Presidency',	'Young Women');

CREATE TABLE persons (
    id SERIAL PRIMARY KEY NOT NULL,
    fname VARCHAR (100),
    lname VARCHAR (100),
    birthday DATE NOT NULL,
    gender gender,
    mobile VARCHAR (20),
    email VARCHAR (100),
    password VARCHAR (255)
);

CREATE TABLE callings (
    id SERIAL PRIMARY KEY NOT NULL,
    calling VARCHAR (50),
    start_date DATE,
    release_date DATE,
    org_id INT8,
    person_id INT8
);

CREATE TABLE organizations (
    id SERIAL PRIMARY KEY NOT NULL,
    organization organization
);

CREATE TABLE meetings_organizations (
    id SERIAL PRIMARY KEY NOT NULL,
    meeting_id INT8,
    organization_id INT8
);

CREATE TABLE meetings (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR (100),
    start_date_time DATE NOT NULL,
    duration INT2,
    public BOOL DEFAULT true,
    broadcast_id INT8
);

CREATE TABLE broadcasts (
    id SERIAL PRIMARY KEY NOT NULL,
    owner_id INT8,
    service_id INT8,
    broadcast_link VARCHAR (100),
    password VARCHAR (100)
);

CREATE TABLE providers (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR (100),
    website VARCHAR(100)
);

CREATE TABLE parent_child (
    id SERIAL PRIMARY KEY NOT NULL,
    person_parent_id INT8 NOT NULL,
    person_child_id INT8 NOT NULL,
    custodial BOOL DEFAULT true NOT NULL,
    blocked BOOL DEFAULT false NOT NULL
);

CREATE TABLE assignments (
    id SERIAL PRIMARY KEY NOT NULL,
    person_id INT8,
    meeting_id INT8,
    assignment TEXT NOT NULL,
    notes TEXT,
    status status
);

CREATE TYPE status AS ENUM ('not assigned', 'assigned', 'accepted', 'rejected', 'in_progress', 'blocked', 'completed', 'dumped');

CREATE TYPE access AS ENUM ('member', 'creator', 'manager',  'admin', 'super' );