layout: default
pagination:
  data: collections.post
  size: 20
  alias: posts
  before: function(paginationData, fullData){ return paginationData.filter((item)
    => item.categories.includes("Internet of Things (IoT)"));}
permalink: /category/{{ category | slugify }}/index.html
eleventyComputed:
  title: "Category: {{ category }}"
category: Internet of Things (IoT)
