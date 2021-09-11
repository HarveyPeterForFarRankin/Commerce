from rest_framework.pagination import PageNumberPagination

class SetPagination(PageNumberPagination):
    """
    override pagination class to add custom query params
    """
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000
    page = 'page'