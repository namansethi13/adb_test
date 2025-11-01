from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from .db_utils import todo_service
logger = logging.getLogger(__name__)

class TodoListView(APIView):

    def get(self, request):
        """
        Returns a list of todo items from a mongo collection.
        with the following format:
        [
            {"id": 1, "text": "First todo"},
            {"id": 2, "text": "Second todo"},
            ...
        ]
        """
        try:
            res = []
            todos = todo_service.get_all()
            for todo in todos:
                res.append({
                    "id": str(todo["_id"]),
                    "text": todo["text"]
                })
        except Exception as e:
            logger.error(f"Error fetching todos: {e}")
            return Response({"error": "Error fetching todos"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(res, status=status.HTTP_200_OK)

    def post(self, request):
        """
        Creates a new todo item in the mongo collection.
        Expects a JSON body with the following format:
        {"text": "New todo item"}
        """
        try:
            if request.data is None or "text" not in request.data:
                return Response({"error": "Invalid request body"}, status=status.HTTP_400_BAD_REQUEST)
            todo = {
                "text": request.data["text"]
            }
            result = todo_service.insert_one(todo)
            return Response({"id": str(result.inserted_id)}, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Error creating todo: {e}")
            return Response({"error": "Error creating todo"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

