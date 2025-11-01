from pymongo import MongoClient
import os
import logging

logger = logging.getLogger(__name__)

class DbConnection:
    def __init__(self, MONGO_HOST, MONGO_PORT, DB_NAME):
        self.mongo_uri = 'mongodb://' + MONGO_HOST + ':' + MONGO_PORT
        self.db = MongoClient(self.mongo_uri)[DB_NAME]

        logger.info(f"PYMONGO connection successfull with {DB_NAME}")



class TodoService:
    """
    This class has the access to todo collection
    Later we can add delete and update function if we want  
    """

    def __init__(self, db_conn: DbConnection ):
        self.connection = db_conn.db['todos']

    def get_all(self):
        try:
            res = self.connection.find()
            return res
        except Exception as e:
            raise e
        
    def insert_one(self,text):
        try:
            res = self.connection.insert_one(text)
            return res
        except Exception as e:
            raise e
        
    def get_by_id(self, todo_id):
        try:
            res = self.connection.find_one({"_id": todo_id})
            return res
        except Exception as e:
            raise e
        

        

db = DbConnection(os.environ["MONGO_HOST"], os.environ["MONGO_PORT"], "test_db")
todo_service = TodoService(db)

