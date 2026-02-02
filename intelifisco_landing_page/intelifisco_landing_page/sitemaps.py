from django.contrib.sitemaps import Sitemap
from django.urls import reverse

class StaticViewSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.8

    def items(self):
        # nomes das rotas definidas em landing/urls.py
        return ['index']

    def location(self, item):
        return reverse(item)