SELECT b.id, b.broadcast_link, b.moderator_id, b.meeting_id, 
    m.name AS meeting, m.start_date_time, 
    CONCAT(p.lname,', ',p.fname) AS moderator
    FROM church.broadcasts b
    JOIN church.persons p ON b.moderator_id = p.id
    JOIN church.meetings m ON b.meeting_id = m.id 
    ORDER BY m.start_date_time;

    SELECT b.id, b.broadcast_link, b.moderator_id, b.meeting_id, 
    m.name AS meeting, m.start_date_time
    FROM church.broadcasts b
    JOIN church.meetings m ON b.meeting_id = m.id;

    SELECT b.id, m.name AS meeting, b.meeting_id, m.start_date_time,
    b.broadcast_link, CONCAT(p.lname,', ',p.fname) AS moderator, b.moderator_id
    FROM church.broadcasts b
    JOIN church.persons p ON b.moderator_id = p.id
    JOIN church.meetings m ON b.meeting_id = m.id 
    ORDER BY m.start_date_time;

    INSERT INTO church.meetings(name, start_date_time, duration, public) VALUES('Sunday School', '2021-04-28 10:30:00+07', 45, 'true') RETURNING id;