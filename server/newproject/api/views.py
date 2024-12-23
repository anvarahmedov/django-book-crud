from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Book
from .serializer import BookSerializer

@api_view(['GET'])
def get_books(request):
    books = Book.objects.all()
    serializedData = BookSerializer(books, many=True).data


    title = request.GET.get('title')
    release_year = request.GET.get('release_year')



    if title:
        books = books.filter(title__icontains=title)
    if release_year:
        books = books.filter(release_year=release_year)


    if not books.exists():
        return Response({'error': 'No books found for the given query.'}, status=404)

    # Convert the QuerySet to a list of dictionaries
    data = list(books.values())
    return Response(data)  # You can also specify fields, e.g., .values('title', 'release_year')

@api_view(['POST'])
def create_book(request):
    data = request.data
    serializer = BookSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['PUT', 'DELETE', 'GET'])
def book_detail(request, pk):
    try:
        book = Book.objects.get(pk=pk)
    except Book.DoesNotExist:
        return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        data = request.data
        serializer = BookSerializer(book, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        book = Book.objects.get(pk=pk)
        serializer = BookSerializer(book)
        return Response(serializer.data, status=status.HTTP_200_OK)



