from django.urls import path
from .views import get_books, book_detail, create_book

urlpatterns = [
    path('books/', get_books, name='get_books'),
    path('books/<int:pk>/', book_detail, name='book-detail'),
    path('books/create/', create_book, name='create_book')
]
