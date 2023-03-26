layout: default
pagination:
  data: collections.post
  size: 20
  alias: posts
  before: function(paginationData, fullData){ return paginationData.filter((item)
    => item.categories.length == 0);}
permalink: /category/{{ category | slugify }}/index.html
eleventyComputed:
  title: "Category: {{ category }}"
category: Uncategorized
