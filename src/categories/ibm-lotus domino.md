layout: default
pagination:
  data: collections.post
  size: 20
  alias: posts
  before: function(paginationData, fullData){ return paginationData.filter((item)
    => item.categories.includes("IBM Lotus Domino"));}
permalink: /category/{{ category | slugify }}/index.html
eleventyComputed:
  title: "Category: {{ category }}"
category: IBM Lotus Domino
