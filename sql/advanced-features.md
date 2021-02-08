# Chapter 3: Advanced Features 
[documentation](https://www.postgresql.org/docs/12/tutorial-views.html)
## Views
Essentially creates a name to a query of particular interest. Suppose we a combined listing of weather records and city location is particularly interesting in our app, we can create a view so that we don't have to type the query each time we use it. The view is referred to like an ordinary table.

Making liberal use of views is a key aspect of good SQL db design. Views allows you to encapsulate details of the structure of tables. 
```SQL
CREATE VIEW myview AS
    SELECT city, temp_lo, temp_hi, prcp, date, location 
        -- joins weather and cities table where city = name 
        FROM weather, cities
        WHERE city = name; 

SELECT * FROM myview; 
```

## Transactions 
*Transactions* fundamental concept of all db systems. Essential point is that it bundles multiple steps into a single, all-or-nothing operation. Intermediate states btwn steps are not visible to other concurrent transactions, and if some failure occurs that prevents transaction from completing, then none of the steps affect db at all. 

Consider the example below that simplifies a bank transaction.
```SQL
UPDATE accounts SET balance = balance - 100.00
    WHERE name = 'Alice';
UPDATE branches SET balance = balance - 100.00
    WHERE name = (SELECT branch_name FROM accounts WHERE name = 'Alice');
UPDATE accounts SET balance = balance + 100.00
    WHERE name = 'Bob';
UPDATE branches SET balance = balance + 100.00
    WHERE name = (SELECT branch_name FROM accounts WHERE name = 'Bob');
```

Details of commands are not important. Also if system fails we surely don't want just Alice or Bob to receive/lose 100. 

We also want to gurantee that once a transaction is completed and acknowledged by db system, it has indeed been permanently recorded and any crash after won't affect it. A transactional db gurantees that all updates made by a tranaction are logged in permanent storage before transaction is reported complete. 

Another important property of transactional db is related to notion of atomic updates: when multiple transactions are running concurrently, each one should not be able to see the incomplete changes made by others. So transactions must be all-or-nothing not only in terms of their permanent effect on the db, but also in terms of their visibility as they happen. 

In psql, transaction is set up with `BEGIN` and `COMMIT`.
```SQL
BEGIN;
UPDATE accounts SET balance = balance - 100.00
    WHERE name = 'Alice';
-- etc etc
COMMIT;
```

If we decided we do not want to commit (perhaps bank account went negative) we can issue command `ROLLBACK`, and all updates so far will be canceled. 

By default, psql treats every SQL statement as being executed within a transaction. A group of statements surrounded by `BEGIN` and `COMMIT` is sometimes called a *transaction block*. 

`SAVEPOINT` alllows you to selectively discard parts of the transaction while commting the rest. After defining a savepoint, you can roll back to the savepoint with `ROLLBACK TO`. All transaction's db changes between `SAVEPOINT`and `ROLLBACK TO` are discarded, but changes earlier than savepoint are kept. 

After rolling back, continues to be defined, so you can roll back several times. Conversely, if you are sure that you won't need to rollback to a particular point again, it can be released, so system can free some resources. Keep in mind that releasing or rolling back to savepoint will automatically release all savepoints that were defined after it. 
```SQL
BEGIN;
UPDATE accounts SET balance = balance - 100.00
    WHERE name = 'Alice';
SAVEPOINT my_savepoint;
UPDATE accounts SET balance = balance + 100.00
    WHERE name = 'Bob';
-- oops ... forget that and use Wally's account
ROLLBACK TO my_savepoint;
UPDATE accounts SET balance = balance + 100.00
    WHERE name = 'Wally';
COMMIT;
```