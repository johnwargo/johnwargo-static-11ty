---
title: Site Files
layout: generic
---

This page displays a table listing metadata for all files in the `files` folder.

{% if collections.fileList.length > 0 %}
  <p>Number of files: {{ collections.fileList.length }}</p>
  <table>
  <tr>
    <th>Name</th>
    <th>Extension</th>
    <th>Path</th>
    <th>Size</th>
    <th>Created</th>
    <th>Modified</th>
  </tr>
  {%- for file in collections.fileList -%}  
    <tr>
      <td><a href="{{ file.path }}" target="_blank">{{ file.name }}</a></td>
      <td>{{ file.extension }}</td>
      <td>{{ file.path }}</td>
      <td>{{ file.fileSize | commaize }} bytes</td>
      <td>{{ file.created | dateOnly }}</td>
      <td>{{ file.modified | dateOnly }}</td>
    </tr>
  {% endfor %}
</table>  
{% else %}
  <p>No file data to display</p>
{% endif %}
