This project majorly demonstrates 3 functionalities:

1. User basic info, which is cached in local mongodb.
2. Global rankings info. If the info cached locally is older than the threshold when user access, update.
3. User match history. If user choose to update the recent match history. Recent matches will populate the db if they are not in the db.