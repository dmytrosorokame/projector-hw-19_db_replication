# Projector HSA Home work #19: DB Replication

## Tasks:

1. Create 3 docker containers: mysql-m, mysql-s1, mysql-s2
   Setup master slave replication (Master: mysql-m, Slave: mysql-s1, mysql-s2)

2. Write script that will frequently write data to database.
   Ensure, that replication is working.

3. Try to turn off mysql-s1 (stop slave).
   Try to remove a column in database on slave node (try to delete last column and column from the middle).
   Write conclusion in readme.md

## Task #1:

To run this examples you will need to start containers with "docker-compose"
and after starting setup replication. See commands inside ./build.sh.

```bash
./build.sh
```

## Task #2:

To test replication run:

```bash
chmod +x ./scripts/siege.sh
./scripts/siege.sh
```

Check the results in any DB viewer.

## Task #3:

**First case:**

1. Run STOP SLAVE
2. DROP LAST column in the table.
3. Run START SLAVE

**Result:** New records will be added to this table, but without deleted column.

**Second case:**

1. Run STOP SLAVE
2. DROP MIDDLE column in the table.
3. Run START SLAVE

**Result:** Slave instance is stopped to replicate data from master.
